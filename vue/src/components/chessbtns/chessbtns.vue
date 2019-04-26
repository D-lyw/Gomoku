<template>
  <div id="chessBtn">
    <div class="chessbtn" @click="hanleRegret">悔棋</div>
    <div class="chessbtn" @click="handleGiveUp">认输</div>
  </div>
</template>

<script>
  export default {
    name: 'chess-btns',
    data () {
      return {
        hasRegret: false
      }
    },
    methods: {
      handleGiveUp () {
        var res = confirm('这就要放弃了吗？')
        if(res) {
          this.$socket.emit('accident', {status: 1})
          this.$emit('btnClick')
        }
      },
      hanleRegret () {
        if(!this.hasRegret) {
          this.$socket.emit('accident', {status: 2})
          this.hasRegret = true
        } else {
          alert('只能悔一次棋哦')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #chessBtn {
    display: flex;
    flex-direction: column;
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
