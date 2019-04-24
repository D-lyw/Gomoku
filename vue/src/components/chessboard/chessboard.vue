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
import isWin from '@/utils/isWin'
export default {
  name: "chess-board",
  data() {
    return {
      map: [
        [1, 0, 1, -1, 0, -1, 0, 0, -1, -1, 1, -1, 1, 1],
        [-1, -1, 1, 1, 0, 0, -1, 0, 0, -1,0, 0, 1, -1],
        [1, 1, 0, -1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 1],
        [-1, 0, 0, 0, 0, 0, 0, 0, 1, -0, 1, -1, -1, 0],
        [1, 0, 1, -1, 1, 1, 0, 0, -1, -1, 0, -1, 1, 1],
        [0, -1, 1, -1, 0, 0, 0, 0, 0, 1, 1, -1, 0, -1],
        [1, -1, 1, 1, 0,0, -0, 0, 0, -1, 1, -1, 1, 0],
        [-1, -1, 1, 0, 1, -1, -1, 1, 0, 0,0, -1, 1, -1],
        [1, 1, 1, -1, 1, -1, -1, 0, 1, 0, 0, 1, 1, 1],
        [0, -1, 1, 1, 0, -1, 1, 1, -1, -1, 1, 0, -1, 0],
        [1, 1, 1, -1, 1, -1, -1, 1, -1, -1, -1, -1, 1, 1],
        [1, -1, -1, 0, 0, -1, -1, 1, -1, 1,0, -1, -1, -1],
        [0, -1, 1, -1, 1, -1, 1, 1, -1, -1, -1, -1, 0, 1],
        [1, -1, 0, 1, 1, -1, -1, 1, 0, -1, 1, 1, 1, 1]
      ]
    };
  },
  methods: {
    doChess(row, col) {
      if(this.map[row][col] === 0) {
        this.$set(this.map[row], col, 1)
        if(isWin(this.map, row, col)) {
          console.log('你赢了')
        }
      }
    }
  },
  mounted() {
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
