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
        coor: ''
      }
    },
    mounted() {
      this.$socket.emit('connect', userId)
      this.$socket.on('serverClick', (ver) => {
        console.log(ver)
      })
    },
    sockets: {
      connect () {
        console.log('connected')
        this.userId = this.$socket.id
      }
    },
    methods: {
      clientClick(ver) { // ver下棋的坐标
        this.$socket.emit('某方下棋', ver)
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
