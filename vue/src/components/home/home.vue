<template>
  <div id="home">
    <div class="container">
      <div class="game-left">
        <div class="avatar">
          <avatar></avatar>
        </div>
        <div class="timer">
          <timer></timer>
        </div>
        <div class="chessbtns">
          <chessbtns></chessbtns>
        </div>
      </div>
      <div class="game-mid">
        <!--<barrage></barrage>-->
        <chessboard :myTurn="myTurn" :againstId="againstId" :myColor="myColor" :coordinate="coordinate"
                    :map="map"></chessboard>
        <div v-if="showStart" @click="startGame" class="startgame">开始游戏</div>
      </div>
      <div class="game-right">
        <div class="avatar">
          <avatar></avatar>
        </div>
        <div class="timer">
          <timer></timer>
        </div>
        <div class="msgslist">
          <msgslist ></msgslist>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import avatar from '../../components/avatar/avatar';
  import chessboard from '../../components/chessboard/chessboard';
  import chessbtns from '../../components/chessbtns/chessbtns';
  import timer from '../../components/timer/timer';
  import msgslist from '../msgslist/msgslist';
  import barrage from '../barrage/barrage';

  export default {
    name: 'home',
    components: {
      avatar,
      timer,
      chessboard,
      chessbtns,
      msgslist,
      barrage,
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
        myColor: -1,
        showStart: true,
        map: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
      };
    },
    mounted () {
      this.username = this.$route.params.username;
      this.$socket.emit('connect');
      window.onbeforeunload = (e) => {
        console.log(this.username);
        localStorage.removeItem(this.username);
        console.log(111);
        return true;
      };
      var token = localStorage.getItem(this.username);
      if (!token) {
        this.$router.push('login');
      }
    },
    sockets: {
      connect () {
        this.userId = this.$socket.id;
        console.log(this.username + '----connected');
        this.$socket.emit('newUserName', {userName: this.username});
      },
      chessResponse (data) {
        this.coordinate = data.coordinate;
        this.myTurn = data.myTurn;
        if (!data.isLose) {
          // 重新计时，画对手棋子
          console.log(this.coordinate);
        } else {
          this.showStart=!this.showStart;
          var res = confirm('你输了');
          this.map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ];
        }
      },
      reciveMsg (data) {
        this.reciveMsg = data.msg;
      },
      changeTurn (data) {
        this.myTurn = data.myTurn;
      },
      startGameResponse (data) {
        if (data.status == 0) {
          // 匹配成功
          console.log('匹配成功');
          this.againstId = data.againstId;
          this.againstName = data.againstName;
          this.myTurn = data.myTurn;
          this.myColor = this.myTurn ? -1 : 1;
          if (this.myTurn) {
            console.log('你是先手');
          } else {
            console.log('你是后手');
          }
        } else {
          // 匹配失败
          // 显示信息
          console.log('匹配失败');
        }
      },
    },
    methods: {
      startGame () {
        this.showStart=!this.showStart;
        this.$socket.emit('startGame', {userName: this.username, id: this.userId});
      },
      newMessage () {
        if (!this.againstId) {
          this.$socket.emit('sendMsg', {againstId: this.againstId, msg: this.sendMsg});
        }
      },
    },
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
        .avatar {
          margin-top: 10px;
        }
        .timer {
          margin-top: 50px;
        }
        .chessbtns {
          margin-top: 50px;
        }
      }
      .game-mid {
        position: relative;
        width: 600px;
        height: 580px;
        margin-top: 10px;
        border: 1px solid black;
        .startgame {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 22px;
          box-sizing: border-box;
          background-color: #d06e34;
          width: 120px;
          height: 40px;
          border-radius: 3px;
          color: white;
          text-align: center;
          font-weight: bold;
          border: 3px solid #d06e34;
          border-bottom-color: #bb5b22;
          text-shadow: .1em .1em 0 #a5501e;
          cursor: pointer;
        }
      }
      .game-right {
        width: 280px;
        .avatar {
          margin-top: 10px;
        }
        .timer {
          margin-top: 50px;
        }
        .msgslist {
          margin-left: 20px;
        }
      }
    }
  }
</style>
