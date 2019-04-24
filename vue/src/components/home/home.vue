<template>
  <div id="home">
    <div class="container">
      <div class="game-left">
        <avatar></avatar>
        <timer></timer>
        <chessbtns></chessbtns>
      </div>
      <div class="game-mid">
        <chessboard></chessboard>
      </div>
      <div class="game-right">
        <avatar></avatar>
        <timer></timer>
        <cheatpanel></cheatpanel>
      </div>
    </div>
  </div>
</template>

<script>
  import avatar from '../../components/avatar/avatar';
  import chessboard from '../../components/chessboard/chessboard';
  import chessbtns from '../../components/chessbtns/chessbtns';
  import timer from '../../components/timer/timer';
  import cheatpanel from '../../components/cheatpanel/cheatpanel';
  import Bus from '../../bus/bus'
  export default {
    name: 'home',
    components: {
      avatar,
      timer,
      chessboard,
      chessbtns,
      cheatpanel,
    },
    data () {
      return {
        userId: '',
        coordinate: [],
        username: '',
        sendMsg: '',
        againstId: '',
        againstName: '',
        myTurn: false,
        reciveMsg: ''
      }
    },
    mounted() {
      Bus.$on('routeChange', username => {
        this.username = username
        console.log(this.username)
      })
      this.$socket.on('chessResponse', (res) => {
        if(!res.isLose) {
          this.coordinate = res.coordinate
          this.myTurn = res.myTurn
          // 画一颗棋子
        }
      })
      this.$socket.on('recvMsg', (msg) => {
        this.reciveMsg = msg.msg
      })
      this.$socket.on('changeTurn', (res) => {
        this.myTurn = res.myTurn
      })
      this.$socket.emit('connect')
      this.$socket.emit('newUserName', {username: this.username})
    },
    sockets: {
      connect () {
        this.userId = this.$socket.id
        // this.$socket.emit('newUserName', {username: this.username})
      }
    },
    methods: {
      clientClick() { // againstId 下棋的坐标
        if(this.myTurn) {
          // 先判断是否胜利
          // var isWin = /*判断胜利*/
            var sendObj = {
                againstId: this.againstId,
                coordinate: [],
                isWin: isWin,
                myTurn: true
            }
          this.$socket.emit('chess', sendObj)

        }
      },
      startGame() {
        this.$socket.emit('startGame', {username: this.username, id: this.userId})
        this.$socket.on('startGameResponse', (msg) => {
          if(msg.status == 0){
            // 匹配成功
            this.againstId = msg.againstId
            this.againstName = msg.againstName
            this.myTurn = msg.myTurn
          } else {
            // 匹配失败
            // 显示信息
          }
        })
      },
      newMessage() {
        if(!this.againstId) {
          this.$socket.emit('sendMsg', { againstId: this.againstId, msg: this.sendMsg})
        }
      }
    },
    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //       vm.username = vm.$route.params.username
    //       console.log(vm.$route.params.username)
    //       console.log(vm.username)
    //     })
    // }
  };
</script>

<style scoped lang="scss">
  #home {
    .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      .game-left {
        width: 280px;
      }
      .game-mid {
        width: 600px;
        height: 560px;
        border: 1px solid black;
      }
      .game-right {
        width: 280px;
      }
    }
  }
</style>
