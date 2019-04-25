<template>
  <div id="avatar">
    <div :class="{ 'showBorder': myTurn,'header': true}"><img src="../../../static/img/avatar.jpg" alt="avatar"></div>
    <div class="name">{{username}}</div>
  </div>
</template>

<script>
  export default {
    name: 'avatar',
    props: {
      username: {
        type: String,
      },
      myTurn: {
        type: Boolean,
      },
    },
  };
</script>

<style scoped lang="scss">
  #avatar {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 110px;
    height: 170px;
    text-align: center;
    .showBorder{
      img {
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 4px solid #ff2d51;
      }
    }
    .header {
      img {
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    .name {
      width: 100%;
      font-weight: bold;
      background-color: aliceblue;
      border-radius: 8px;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
