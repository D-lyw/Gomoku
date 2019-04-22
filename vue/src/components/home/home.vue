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
    }
  };
</script>

<style scoped>

</style>
