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
        <div  class="chessbtns">
          <chessbtns></chessbtns>
        </div>
      </div>
      <div class="game-mid">
        <!--<chessboard></chessboard>-->
        <barrage></barrage>
        <div v-if="showStart" class="startgame">开始游戏</div>
      </div>
      <div class="game-right">
        <div class="avatar">
          <avatar></avatar>
        </div>
        <div class="timer">
          <timer></timer>
        </div>
        <div class="msgslist">
          <msgslist :msgs="msgs"></msgslist>
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
    data () {
      return {
        showStart:true,
        msgs: [
          {
            username: '张三',
            cont: '你好！李四李四李四李李四李四李四李四李' +
            '四李四李四李四李四李四李四李四李四李四李四李' +
            '四李四李四李四李四李四四李四李四李四李四李四',
            type: 'send',
          },
          {
            username: '李四',
            cont: '你呢李四李四李四李四李四李四李四李四李四李四李四李四' +
            '李四李四李四李四李四李四李四李四李四李四李四李四' +
            '李四李四李四李四李四李四李四',
            type: 'receive',
          },
          {
            username: '李四',
            cont: '你呢李四李四李',
            type: 'receive',
          },
        ],
      };
    },
    components: {
      avatar,
      timer,
      chessboard,
      chessbtns,
      msgslist,
      barrage
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
        .avatar{
          margin-top: 10px;
        }
        .timer{
          margin-top: 50px;
        }
        .chessbtns{
          margin-top: 50px;
        }
      }
      .game-mid {
        position: relative;
        width: 600px;
        height: 580px;
        margin-top: 16px;
        border: 1px solid black;
        .startgame{
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
          color:white;
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
        .avatar{
          margin-top: 10px;
        }
        .timer{
          margin-top: 50px;
        }
        .msgslist{
          margin-left: 20px;
        }
      }
    }
  }
</style>
