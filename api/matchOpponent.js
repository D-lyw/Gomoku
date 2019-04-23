var match = {
    doMatch: async function(matchingList, socket, socketList){
        var curSocketId = socket.id;
        var res = await this._asyncFn(matchingList, curSocketId);
        return res;
        
    },
    _asyncFn: function(matchingList, curSocketId){
        return new Promise((solved, rejected) => {
            var tryMatch = setInterval(function(){
                var against = matchingList[Math.floor(Math.random() * matchingList.length)];
                if(against != curSocketId ){
                    clearInterval(tryMatch);
                    clearTimeout(clear);
                    solved(against);
                }
            }, 100);

            var clear = setTimeout(function(){
                clearInterval(tryMatch);
                rejected(null);
            }, 1000*10);
        })
    }
}

module.exports = match;

