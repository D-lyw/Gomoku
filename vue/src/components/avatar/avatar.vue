<template>
    <div id="avatar">
      <div class="header"><img src="../../../static/img/avatar.jpg" alt="avatar"></div>
      <div class="name">{{username}}</div>
    </div>
</template>

<script>
  export default {
    name: 'avatar',
    props:{
      username:{
        type:String
      }
    }
  };
</script>

<style scoped lang="scss">
  #avatar{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90px;
    height: 160px;
    text-align: center;
    .header{
      img{
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    .name{
      width: 100%;
      font-weight: bold;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
