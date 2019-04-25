<template>
  <div id="counter">
    <img src="../../../static/img/chessnum.png" class="clockname" />
    <div class="clock">{{chessNum}}</div>
  </div>
</template>

<script>
  export default {
    name: 'counter',
    data () {
      return {};
    },
    props: {
      chessNum: {
        type: Number,
      },
    },
    mounted () {
    },
    watch: {},
  };
</script>

<style scoped lang="scss">
  #counter {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 130px;
    height: 36px;
    line-height: 30px;
    text-align: center;
    .clockname {
      width: 40px;
      height: 40px;
      margin-right: 8px;
    }
    .clock {
      width: 90px;
      height: 30px;
      border-radius: 8px;
      background-color: white;
    }
  }
</style>
