<template>
    <div id="home">
      <div class="container">
        <div>
          <avatar></avatar>
          <div>
            <div>棋子数</div>
            <div>计时器</div>
          </div>
          <div>悔棋等按钮区</div>
        </div>
        <div>
          <canvas></canvas>
          <div>游戏区</div>
        </div>
        <div>
          <div>头像区</div>
          <div>
            <div>棋子数</div>
            <div>计时器</div>
          </div>
          <div>聊天区</div>
        </div>
      </div>
    </div>
</template>

<script>
  import avatar from '../../components/avatar/avatar'
  export default {
    name: 'home',
    components:{
      avatar,
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

<style scoped>

</style>
