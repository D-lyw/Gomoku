<template>
  <div id="chessBtn">
    <div class="chessbtn">悔棋</div>
    <div class="chessbtn">和棋</div>
    <div class="chessbtn">认输</div>
  </div>
</template>

<script>
  export default {
    name: 'chess-btns',
  };
</script>

<style scoped lang="scss">
  #chessBtn {
    display: flex;
    flex-direction: column;
    width: 130px;
    height: 140px;
    border-radius: 5px;
    align-items: center;
    font-size: 22px;
    .chessbtn {
      box-sizing: border-box;
      background-color: #d06e34;
      width: 110px;
      height: 36px;
      border-radius: 3px;
      margin-top: 8px;
      color:white;
      text-align: center;
      font-weight: bold;
      border: 3px solid #d06e34;
      border-bottom-color: #bb5b22;
      text-shadow: .1em .1em 0 #a5501e;
      cursor: pointer;
    }
    .chessbtn:hover {
      background-color: #db763b;
      border-bottom-color: #c56025
    }
  }
</style>
