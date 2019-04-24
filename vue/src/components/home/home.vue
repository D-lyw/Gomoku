<template>
  <div id="home">
    <div class="container">
      <div class="game-left">
        <avatar></avatar>
        <timer></timer>
        <chessbtns></chessbtns>
      </div>
      <div class="game-mid">
        <chessboard :myTurn="myTurn" :againstId="againstId" :myColor="myColor" :coordinate="coordinate"></chessboard>
      </div>
      <div class="game-right">
        <avatar></avatar>
        <timer></timer>
        <cheatpanel></cheatpanel>
      </div>
    </div>
    <button @click="startGame">开始游戏</button>
  </div>
</template>

<script>
  import avatar from '../../components/avatar/avatar';
  import chessboard from '../../components/chessboard/chessboard';
  import chessbtns from '../../components/chessbtns/chessbtns';
  import timer from '../../components/timer/timer';
  import cheatpanel from '../../components/cheatpanel/cheatpanel';
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
        myTurn: true,
        reciveMsg: '',
        myColor: -1
      }
    },
    mounted() {
      this.username = this.$route.params.username
      this.$socket.emit('connect')
      window.onbeforeunload  = (e) => {
        console.log(this.username)
        localStorage.removeItem(this.username)
        console.log(111)
        return true
      }
      var token = localStorage.getItem(this.username)
      if(!token) {
        this.$router.push('login')
      }
    },
    sockets: {
      connect () {
        this.userId = this.$socket.id
        console.log(this.username + '----connected')
        this.$socket.emit('newUserName', {userName: this.username})
      },
      chessResponse (data) {
        this.coordinate = data.coordinate
        this.myTurn = data.myTurn
        if (!data.isLose) {
          // 重新计时，画对手棋子
          console.log(this.coordinate)
        } else {
          console.log('你输了')
        }
      },
      reciveMsg (data) {
        this.reciveMsg = data.msg
      },
      changeTurn (data) {
        this.myTurn = data.myTurn
      },
      startGameResponse (data) {
        if(data.status == 0){
          // 匹配成功
          console.log('匹配成功')
          this.againstId = data.againstId
          this.againstName = data.againstName
          this.myTurn = data.myTurn
          this.myColor = this.myTurn ? -1 : 1
          if(this.myTurn) {
            console.log('你是先手')
          } else {
            console.log('你是后手')
          }
        } else {
          // 匹配失败
          // 显示信息
          console.log('匹配失败')
        }
      }
    },
    methods: {
      startGame() {
        this.$socket.emit('startGame', {userName: this.username, id: this.userId})
      },
      newMessage() {
        if(!this.againstId) {
          this.$socket.emit('sendMsg', { againstId: this.againstId, msg: this.sendMsg})
        }
      }
    }

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
