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
          <chessbtns @btnClick="resetStatus"></chessbtns>
        </div>
      </div>
      <div class="game-mid">
        <!--<barrage></barrage>-->
        <chessboard :myTurn="myTurn" :againstId="againstId" :myColor="myColor" :coordinate="coordinate"
                    :isLose="isLose" :username="username" :userId="userId" ref="chessboard"></chessboard>
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
            alert('你是先手');
          } else {
            alert('你是后手');
          }
        } else {
          // 匹配失败
          // 显示信息
          alert('匹配失败, 请重新开始匹配');
          this.$refs.chessboard.showStart = true
        }
      },
      accident (data) {
        switch (data.status) { // 0对方掉线 1对方认输 2对方申请悔棋
          case 0:
            alert('对方掉线，你赢了')
            this.resetStatus()
            break;
          case 1:
            alert('对方认输，你赢了')
            this.resetStatus()
            break;
          case 2:
            var res = confirm('对方申请悔棋，是否让他一步？')
            this.$socket.emit('repentRespose', {isAgree: res})
            break;
          default:
            break;
        }
      },
      reciveRepentResult (data) {
        if(data.isAgree) {
          alert('对方同意了你的悔棋请求')
        } else {
          alert('对方无情地拒绝了你的悔棋请求')
        }
      }
    },
    methods: {
      resetStatus () {
        this.$refs.chessboard.showStart = true
        this.againstId = ''
        this.againstName = ''
        this.myTurn = false
      },
      countTime: function () {
        //获取当前时间
        var date = new Date();
        var now = date.getTime();
        //设置截止时间
        var endDate = new Date("2018-10-22 23:23:23");
        var end = endDate.getTime();
        //时间差
        var leftTime = end - now;
        //定义变量 d,h,m,s保存倒计时的时间
        if (leftTime >= 0) {
          d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
          this.h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
          this.m = Math.floor(leftTime / 1000 / 60 % 60);
          this.s = Math.floor(leftTime / 1000 % 60);
        }
        console.log(this.s);
        //递归每秒调用countTime方法，显示动态时间效果
        setTimeout(this.countTime, 1000);
      }
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
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
        .timer {
          display: flex;
          margin-top: 50px;
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
          margin-top: 50px;
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
