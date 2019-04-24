// 每回合结束后, 将双方的状态/对手清空
exports.resetStatus = function(socketList, sa, sb){
    socketList[sa].status = 0;
    socketList[sb].status = 0;
    socketList[sa].opponent = null;
    socketList[sb].opponent = null;
}
