<template>
    <div id="avatar">
      <div class="header"><img src="../../../static/img/avatar.jpg" alt="avatar"></div>
      <div class="name">玩家A</div>
      <div class="score">积分：50</div>
      <div class="isready">已经准备</div>
    </div>
</template>

<script>
  export default {
    name: 'avatar',
  };
</script>

<style scoped lang="scss">
  #avatar{
    display: flex;
    flex-direction: column;
    height: 180px;
    text-align: center;
    .header{
      img{
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    .name{
      font-weight: bold;
    }
    .score{
    }
    .isready{

    }
  }
</style>
