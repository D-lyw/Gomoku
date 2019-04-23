var express = require('express');
var http = require('http').createServer(express);
var io = require('socket.io')(http);

// 匹配对手
var match = require('./matchOpponent');

// 每个用户socketId
var socketList = {};
var matching = [];

io.on('connection', (socket) => {
    
    // 保存每一个登录用户的socket及相关状态信息
    socketList[socket.id] = {
        opponent: null,         // 对手socketid
        status: 0               // 状态: 0, 刚进入; 1: 请求匹配中; 2: 游戏中;
    }
    console.log("newUser coming --- " + socket.id + "\n");
    // 第一步首先获取 新用户的昵称;
    socket.on('newUserName', (msg) => {
        console.log(msg);
        // 将用户名称存入在线玩家列表
        socketList[socket.id].name = msg.userName;

        //onlinePlayers.push(msg.name);
        //socket.emit('hello', {s: socket})
        //socket.to(socketList[0]).emit("test", {msg: "something"})
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
            socketList[socket.id].status = 2;           // 将两socket状态改为gaming状态 (2)
            socketList[result].status = 2;
            matching = matching.filter((item) => {      // 将两个socket从请求匹配的数组中移除
                return item != socket.id && item != result;
            })
            socket.to(result).emit('startGameResponse', {status: 0, againstId: socket.id, againstName: socketList[socket.id].name, myTurn: false});
            socket.emit('startGameResponse', {status: 0, againstId: result, againstName: socketList[result].name, myTurn: true});
            console.log("匹配ok");
        }).catch(() => {
            if(socketList[socket.id].status == 1){
                socket.emit('startGameResponse', {status: 1});              // 匹配失败, 告诉发起方, 匹配失败信息;
                matching = matching.filter((item) => {
                    return item != socket.id;
                })
            }
            console.log("匹配失败")
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
            socket.to(msg.againstId).emit('chessResponse', {againstId: msg.againstId, myTurn: false, isWin: false, isLose: true, coordinate: msg.coordinate})
            // 修改双方的游戏状态
            socketList[socket.id].status = 0;
            socketList[msg.againstId].status = 0;
        }
    })

    // 发送消息     收到发消息的格式 {againstId: againstId, msg: str}
    socket.on('sendMsg', (msg) => {
        socket.to(msg.againstId).emit('recvMsg', {msg: msg.msg});
    })

    // 客户端断开连接
    socket.on('disconnect', (msg) => {
        console.log(`用户 ${socketList[socket.id].name} 断开连接....\n`);
        delete socketList[socket.id];
        console.log(`当前在线用户 ${Object.keys(socketList).length} \n`)
    })
})




http.listen('8080', function(){
    console.log("Listening 8080....")
})



/**
前端



 */