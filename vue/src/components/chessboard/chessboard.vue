<template>
  <div id="app">
    <div class="row" v-for="(rowData, rowIndex) in map" :key="rowIndex">
      <div class="col" v-for="(colData, colIndex) in rowData" :key="colIndex" @click="doChess(rowIndex, colIndex)">
        <span v-if="colData === 1" class="white"></span>
        <span v-else-if="colData === -1" class="black"></span>
        <span v-else ></span>
      </div>
    </div>
  </div>
</template>

<script>
import isWin from '../../utils/isWin'
export default {
  name: "chess-board",
  props: ['myTurn', 'againstId', 'myColor', 'coordinate', 'map'],
  methods: {
    doChess(row, col) {
      console.log(this.myTurn)
      if(this.myTurn) {
        if(this.map[row][col] === 0) {
          this.$set(this.map[row], col, this.myColor)
        }
        // 先判断是否胜利
        var ifWin = isWin(this.map, row, col)
        var x = row
        var y = col
        var sendObj = {
            againstId: this.againstId,
            coordinate: [x, y],
            isWin: ifWin,
            myTurn: true
        }
        this.$socket.emit('chess', sendObj)
      }
    }
  },
  watch: {
    coordinate: function() {
      this.$set(this.map[this.coordinate[0]], this.coordinate[1], this.myColor*-1)
    }
  }
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: bisque;
  .row {
    width: 100%;
    height: 7.15%;
    display: flex;
    .col {
      width: 7.15%;
      height: 100%;
      border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        display: inline-block;
        width: 90%;
        height: 90%;
        border-radius: 50%;
        // background-color: black;
      }
      span.white {
        background-color: white;
      }
      span.black {
        background-color: black;
      }
    }
  }
}
</style>
