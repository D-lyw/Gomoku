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
  }
</style>
