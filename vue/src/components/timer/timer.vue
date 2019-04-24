<template>
  <div id="timer">
    <div class="container">
      <img src="../../../static/img/chessnum.png" class="clockname"/>
      <div class="clock">20</div>
    </div>
    <div  class="container">
      <img src="../../../static/img/clocktime.png" class="clockname"/>
      <div class="clock">10:00</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'timer',
  };
</script>

<style scoped lang="scss">
  #timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    .container {
      display: flex;
      flex-direction: row;
      width: 130px;
      height: 36px;
      margin-bottom: 8px;
      line-height: 30px;
      text-align: center;
      align-items: center;
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
        border: 1px solid #dcdfe6;
      }
    }
  }

</style>
