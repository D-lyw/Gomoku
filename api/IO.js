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

    

    // 第一步首先获取 新用户的昵称;
    socket.on('newUserName', (msg) => {
        console.log(msg);
        console.log("newUser coming! ---- " + msg.userName + "\n");
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
            socket.to(result).emit('startGameResponse', {status: 0, againstId: socket.id, againstName: socketList[socket.id].name});
            socket.emit('startGameResponse', {status: 0, againstId: result, againstName: socketList[result].name});
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