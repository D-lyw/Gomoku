<template>
  <div id="home">
    <div class="container">
    <rank v-if="showRank" v-on:closerank='close'></rank>
    <div :class="showRank? 'rankList hidden' : 'rankList'" @click="showRank = !showRank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-rank"></use>
        </svg>
        <br>
        <span class="rank">rank</span>
      </div>
      <div class="game-left">
        <div class="avatar">
          <avatar :myTurn="myTurn" :username="username" />
        </div>
        <div class="timer">
          <counter :chessNum="chessNum" />
          <timer :timerStart="timerStart" />
        </div>
        <div class="chessbtns">
          <chessbtns @btnClick="resetStatus" ref="chessBtn"/>
        </div>
      </div>
      <div class="game-mid">
        <div class="barrageContainer">
          <barrage :myTurn="myTurn" :linecount="10" />
        </div>
        <chessboard :myTurn="myTurn" :againstId="againstId" :myColor="myColor" :coordinate="coordinate"
                    :isLose="isLose" :username="username" :userId="userId" ref="chessboard"
                    @chessClick="handleChessClick" />
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
          <msgslist  :againstId="againstId" :againstName="againstName" :username="username" />
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
  import rank from '../../components/rank/rank';
  import axios from 'axios'
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
      rank,
    },
    data () {
      return {
        userId: '',
        myCoordinate: [],
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
        showRank: false,
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
        if (arg !== undefined && typeof arg !== 'number') return;
        if (arguments.length > 0) {
          that.chessNum = arg;
        } else {
          that.chessNum += 1;
        }
      });

      this.$root.Bus.$on('againstChessNum', function (arg) {
        if (arg !== undefined && typeof arg !== 'number') return;
        if (arguments.length > 0) {
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

      this.$root.Bus.$on('resetHasRegret', function () {
        console.log(that.$refs.chessBtn)
        that.$refs.chessBtn.hasRegret = false;
      })
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
            this.$refs.chessboard.showLoading = false;
            alert('你是先手');
          } else {
            that.$root.Bus.$emit('againstTimerStart');
            this.$refs.chessboard.showLoading = false;
            alert('你是后手');
          }
        } else {
          // 匹配失败
          // 显示信息
          alert('匹配失败, 请重新开始匹配');
          this.$refs.chessboard.showLoading = false;
          this.$refs.chessboard.showStart = true;
        }
      },
      accident (data) {
        switch (data.status) { // 0对方掉线 1对方认输 2对方申请悔棋
          case 0:
            alert('对方掉线，你赢了');
            
            axios.post("http://120.78.156.5:8080/winUpdate", {username: this.username})
            .then((msg) => {
              if(msg.status){
                console.log("胜局记录添加成功");
              }
            })
            .catch((err) => {
              console.log(err);
            })

            this.initChessNum();
            this.resetStatus();
            break;
          case 1:
            alert('对方认输，你赢了');
            axios.post("http://120.78.156.5:8080/winUpdate", {username: this.username})
                      .then((msg) => {
                        if(msg.status){
                          console.log("胜局记录添加成功")
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      })
            this.initChessNum();
            this.resetStatus();
            break;
          default:
            break;
        }
      },
      accidentClient (data) {
        var res = confirm('对方申请悔棋，是否让他一步？')
        this.$socket.emit('repentRespose', {isAgree: res})
        if(res) {
          console.log(this.coordinate)
          if(this.myTurn == true){
         // this.$set(this.$refs.chessboard.map[this.myCoordinate[0]], this.myCoordinate[1], 0);
          this.$set(this.$refs.chessboard.map[this.coordinate[0]], this.coordinate[1], 0);
         // this.$root.Bus.$emit('chessNum', this.chessNum - 1)
          this.$root.Bus.$emit('againstChessNum', this.againstChessNum - 1)
          this.myTurn=false}
          else{
            this.$set(this.$refs.chessboard.map[this.myCoordinate[0]], this.myCoordinate[1], 0);
          this.$set(this.$refs.chessboard.map[this.coordinate[0]], this.coordinate[1], 0);
          this.$root.Bus.$emit('chessNum', this.chessNum - 1)
          this.$root.Bus.$emit('againstChessNum', this.againstChessNum - 1)
          }
        }
      },
      reciveRepentResult (data) {
        if (data.isAgree) {
          alert('对方同意了你的悔棋请求');
          console.log(this.myCoordinate);
          if(this.myTurn == true){
          this.$set(this.$refs.chessboard.map[this.myCoordinate[0]], this.myCoordinate[1], 0);
          this.$set(this.$refs.chessboard.map[this.coordinate[0]], this.coordinate[1], 0);
          this.$root.Bus.$emit('chessNum', this.chessNum - 1)
          this.$root.Bus.$emit('againstChessNum', this.againstChessNum - 1)
          }
          else{
          this.$set(this.$refs.chessboard.map[this.myCoordinate[0]], this.myCoordinate[1], 0);
          this.$root.Bus.$emit('chessNum', this.chessNum - 1)
          this.myTurn=true
          }
        } else {
          alert('对方无情地拒绝了你的悔棋请求');
        }
      },
    },
    methods: {
      close() {
        this.showRank = !this.showRank
      },
      resetStatus () {
        this.$refs.chessboard.showStart = true;
        this.$refs.chessBtn.hasRegret = false;
        this.againstId = '';
        this.againstName = '';
        this.myTurn = false;
      },
      initChessNum () {
        this.$root.Bus.$emit('chessNum', 0);
        this.$root.Bus.$emit('againstChessNum', 0);
      },
      handleChessClick (arr) {
        this.myCoordinate = arr;
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
      position: relative;
      .hidden {
        opacity: .4;
      }
      .rankList {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        // writing-mode: vertical-lr;
        .rank {
          margin-left: 6px;
        }
      }
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
        position: relative;
        width: 600px;
        height: 580px;
        margin-top: 10px;
        .barrageContainer {
          pointer-events: none;
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
        }
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
