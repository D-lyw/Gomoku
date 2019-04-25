<template>
  <div id="home">
    <div class="container">
      <div class="game-left">
        <div class="avatar">
          <avatar :username="username"></avatar>
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
                    :isLose="isLose" :username="username" :userId="userId"></chessboard>
      </div>
      <div class="game-right">
        <div class="avatar">
          <avatar :username="againstName"></avatar>
        </div>
        <div class="timer">
          <timer></timer>
        </div>
        <div class="msgslist">
          <msgslist :againstId="againstId" :againstName="againstName" :username="username"></msgslist>
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
        againstId: '',
        againstName: '',
        myTurn: false,
        myColor: -1,
        isLose: false,
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
        this.isLose = data.isLose;
        if (!data.isLose) {
          // 重新计时，画对手棋子
          console.log(this.coordinate);
        }
      },
      changeTurn (data) {
        this.myTurn = data.myTurn;
      },
      startGameResponse (data) {
        if (data.status === 0) {
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
      // startGame () {
      //   this.showStart = !this.showStart;
      //   this.$socket.emit('startGame', {userName: this.username, id: this.userId});
      // },
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
        width: 600px;
        height: 580px;
        margin-top: 10px;
      }
      .game-right {
        width: 280px;
        position: relative;
        .avatar {
          margin-top: 10px;
        }
        .timer {
          margin-top: 50px;
        }
        .msgslist {
          position: absolute;
          bottom: 0;
          margin-left: 20px;
        }
      }
    }
  }
</style>
