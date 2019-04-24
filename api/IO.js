var express = require('express');
var http = require('http').createServer(express);
var io = require('socket.io')(http);

var match = require('./matchOpponent');
var util = require('./util');

// 每个用户socketId
var socketList = {};
// 正在请求匹配的集合
var matching = [];

io.on('connection', (socket) => {
    
    // 保存每一个登录用户的socket及相关状态信息
    socketList[socket.id] = {
        opponent: null,         // 对手socketid
        status: 0,              // 状态: 0, 刚进入; 1: 请求匹配中; 2: 游戏中;
        name: ''                // 该用户的名称
    }

    // 第一步首先获取 新用户的昵称; 格式 {userName: "Tom"}
    socket.on('newUserName', (msg) => {

        console.log("newUser coming --- " + msg.userName + "\n");
        console.log(`当前在线用户共 ${Object.keys(socketList).length} 人\n\n`);

        // 将用户名称存入在线玩家列表
        socketList[socket.id].name = msg.userName;
    })
    
    // 用户点击 开始游戏, 触发对手匹配
    socket.on('startGame', startGameCallBack);

    function startGameCallBack(msg) {

        console.log(`用户${msg.userName}开始匹配游戏....`);
        console.log(msg);

        // 将其加入请求匹配的数组中
        matching.push(socket.id);
        // 修改该socket状态
        socketList[socket.id].status = 1;

        var deal = match.doMatch(matching, socket, socketList);

        deal.then((result) => {
            // 将两socket状态改为gaming状态 (2)
            socketList[socket.id].status = 2;           
            socketList[result].status = 2;

            // 标记对手
            socketList[socket.id].opponent = result;
            socketList[result].opponent = socket.id;
            
            // 将两个socket从请求匹配的数组中移除
            matching = matching.filter((item) => {      
                return item != socket.id && item != result;
            })

            var myTurn = socket.id > result;
            // 告诉双方匹配成功
            socket.to(result).emit('startGameResponse', {status: 0, againstId: socket.id, againstName: socketList[socket.id].name, myTurn: myTurn});
            //socket.emit('startGameResponse', {status: 0, againstId: result, againstName: socketList[result].name, myTurn: true});
            
            console.log(`用户 ${socketList[socket.id].name} 和 用户 ${socketList[result].name} 游戏匹配成功....\n`);
        }).catch(() => {
            if(socketList[socket.id].status == 1){
                socket.emit('startGameResponse', {status: 1});              // 匹配失败, 告诉发起方, 匹配失败信息;
                matching = matching.filter((item) => {
                    return item != socket.id;
                })
            }
            console.log(`用户 ${socketList[socket.id].name} 尝试匹配 失败 !!!! \n`);
        })
    }

    // 下棋     收到信息格式 {isWin: false, coordinate: [3, 4], againstId: socketid, myTurn: true}
    socket.on('chess', (msg) => {
        console.log(msg.coordinate);

        if(!msg.isWin){
            if(msg.myTurn){
                socket.to(msg.againstId).emit('chessResponse', {againstId: msg.againstId, myTurn: true, isWin: false, isLose: false, coordinate: msg.coordinate});
                socket.emit('changeTurn', { myTurn: false });
            } 
        }else{
            // 通知输掉的一方
            socket.to(msg.againstId).emit('chessResponse', {againstId: msg.againstId, myTurn: false, isWin: false, isLose: true, coordinate: msg.coordinate});
            socket.emit('changeTurn', { myTurn: false})
            
            // 重置双方的游戏状态
            util.resetStatus(socketList, socket.id, msg.againstId);
        }
    })

    // 发送聊天消息     收到发消息的格式 {againstId: againstId, msg: str}
    socket.on('sendMsg', (msg) => {
        socket.to(msg.againstId).emit('recvMsg', {msg: msg.msg});
    })

    // 监听客户端发来的意外消息     accident事件, status: 0, 对方掉线; 1, 对方认输, 2, 对方申请悔棋;
    socket.on('accident', (msg) => {
        if(msg.status == 1){        // 表示发送该消息方 认输
            socket.to(socketList[socket.id].opponent).emit('accident', {status: 1});

            // 重置双方的游戏状态
            util.resetStatus(socketList, socket.id, socketList[socket.id].opponent);
        }
        if(msg.status == 0){
            socket.to(socketList[socket.id].opponent).emit('accident', {status: 0});
            // 重置双方的游戏状态
            util.resetStatus(socketList, socket.id, socketList[socket.id].opponent);
        }
        if(msg.status == 2){
            socket.to(socketList[socket.id].opponent).emit('accident', {status: 2});
            socket.on('repentRespose', (msg) =>　{      // msg格式　｛ isAgree: false }
                socket.to(socketList[socket.id].opponent).emit('reciveRepentResult', { isAgree: msg.isAgree });
            })
        }
    })

    // 客户端断开连接
    socket.on('disconnect', () => {
        console.log(`用户 ${socketList[socket.id].name} 断开连接....\n`);

        // 如果该断开用户处于匹配状态中
        if(socketList[socket.id].status == 1){
            matching = matching.filter((item) => {
                return item != socket.id;
            })
        }

        // 如果断开用户处于游戏状态中
        if(socketList[socket.id].status == 2){             // status: 0 表示对方掉线
            socket.to(socketList[socket.id].opponent).emit('accident', {status: 0});

            // 重置双方的游戏状态
            util.resetStatus(socketList, socket.id, socketList[socket.id].opponent);
        }

        delete socketList[socket.id];
        console.log(`当前在线用户共 ${Object.keys(socketList).length} 人\n\n`);
    })
})




http.listen('8080', function(){
    console.log("Listening 8080....")
})



/**
前端



 */