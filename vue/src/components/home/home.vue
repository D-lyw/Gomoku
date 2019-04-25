<template>
  <div id="home">
    <div class="container">
      <div class="game-left">
        <div class="avatar">
          <avatar :myTurn="myTurn" :username="username" />
        </div>
        <div class="timer">
          <counter :chessNum="chessNum" />
          <timer :timerStart="timerStart" />
        </div>
        <div class="chessbtns">
          <chessbtns />
        </div>
      </div>
      <div class="game-mid">
        <!--<barrage></barrage>-->
        <chessboard :myTurn="myTurn" :againstId="againstId" :myColor="myColor" :coordinate="coordinate"
                    :isLose="isLose" :username="username" :userId="userId" />
      </div>
      <div class="game-right">
        <div class="avatar">
          <avatar :myTurn="!myTurn" :username="againstName" />
        </div>
        <div class="timer">
          <counter :chessNum="againstChessNum" />
          <timer :timerStart="againstTimerStart" />
        </div>
        <div class="msgslist">
          <msgslist :againstId="againstId" :againstName="againstName" :username="username" />
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
  import counter from '../../components/counter/counter';
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
      counter,
    },
    data () {
      return {
        userId: '',
        coordinate: [],
        username: '',
        chessNum: 0,
        againstId: '',
        againstName: '',
        againstChessNum: 0,
        timerStart: false,
        againstTimerStart: false,
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
    created () {
      let that = this;
      this.$root.Bus.$on('chessNum', function (arg) {
        if(arg!==undefined && typeof arg !=='number') return;
        if (arguments.length>0) {
          that.chessNum = arg;
        } else {
          that.chessNum += 1;
        }
      });

      this.$root.Bus.$on('againstChessNum', function (arg) {
        if(arg!==undefined && typeof arg !=='number') return;
        if (arguments.length>0) {
          that.againstChessNum = arg;
        } else {
          that.againstChessNum += 1;
        }
      });

      this.$root.Bus.$on('timerStart', function (arg) {
        that.timerStart = !that.timerStart;
      });

      this.$root.Bus.$on('againstTimerStart', function (arg) {
        that.againstTimerStart = !that.againstTimerStart;
      });
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
          var that = this;
          if (this.myTurn) {
            that.$root.Bus.$emit('timerStart');
            console.log('你是先手');
          } else {
            that.$root.Bus.$emit('againstTimerStart');
            console.log('你是后手');
          }
        } else {
          // 匹配失败
          // 显示信息
          console.log('匹配失败');
        }
      },
    },
    methods: {},
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
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
        .timer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
          display: flex;
          margin-top: 10px;
          justify-content: center;
        }
        .timer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
