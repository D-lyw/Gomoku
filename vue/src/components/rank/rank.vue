<template>
<div class="rankWrap animated fadeInLeft">
  <div class='rank'>
  <div class="close" @click="$emit('closerank')">
    <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
      </svg>
  </div>

    <div class='second'>
      <img src='/static/img/second.png' class='second-crown'></img>
      <img src="/static/img/avatar2.jpg" class="two" alt="">
      <div class="user">
        {{seconde.name}} 
        <br>
        {{seconde.winTime}} 
      </div>
    </div>
    <div class='first'>
      <img src='/static/img/first.png' class='first-crown'></img>
      <img src="/static/img/avatar1.jpg" class="one" alt="">
       <div class="user">
        {{first.name}} 
        <br>
        {{first.winTime}}
      </div>
    </div>
    <div class='third'>
      <img src='/static/img/third.png' class='third-crown'></img>
      <img src="/static/img/avatar3.jpg" class="three" alt="">
       <div class="user">
        {{third.name}}
        <br>
        {{third.winTime}}
      </div>
    </div>
  </div>
  <div class="otherRank">
    <ul>
      <li v-for="(item, index) in other" :key="index">
        <div class="">{{index + 4 }}</div>
        <div class="avatar">
          <img src="/static/img/avatar1.jpg" alt="">
        </div>
        <div class="userName">{{item.name}}</div>
        <div class="score">{{item.winTime}}</div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      first: {},
      seconde: {},
      third: {},
      other: []
    }
  },
  mounted() {
    var that = this;
    // D-lyw write 将输入的传给后台
    axios.post('http://120.78.156.5:8080/getTop10')
      .then(function (response) {
        console.log(response);
        that.first = response.data.shift();
        that.seconde = response.data.shift();
        that.third = response.data.shift();
        that.other = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.rankWrap {
  // margin-left: -30px;
  z-index: 2;
  left: 0;
  position: absolute; 
}

.rank {
  display: flex;
  justify-content: center;
  width: 264px;
  padding-bottom: 30px;
  background-image: linear-gradient(to top, #71cdfa, #19b4ec);
  .close {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    font-size: 8px;
    color: white;
  }
  .first, .second, .third {
    position: relative;
    width: 24%;
    margin: 10px;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    .user {
      font-size: 12px;
      color: white;
      position: absolute;
      top: 100%;
      text-align: center;
    }
    .one {
      position: absolute;
      border-radius: 50%;
      width: 65px;
      top: 29px;
    }
    .two {
      position: absolute;
      border-radius: 50%;
      width: 65px;
      top: 29px;
    }
    .three {
      position: absolute;
      border-radius: 50%;
      width: 65px;
      top: 29px;
    }
  }
  .first {
    margin-top: 20px;
  }

  .first-crown, .second-crown, .third-crown {
    width: 71px;
    z-index: 1;
    height: 106px;
    // width: 96px;
    // height: 96px;
  }
}
.otherRank {
   width: 264px;
  ul {
    list-style-type: none;
  }
  li {
    font-size: 12px;
    color: #55555591;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d0caca;
    border-right: 1px solid #d0caca;
    padding: 4px;
    .avatar {
      margin-left: -113px;
      img {
        border-radius: 50%;
        width: 50px;
      }
    }
    .userName {
      width: 50px;
      height: 18px;
      overflow: hidden;
      white-space:nowrap;
      text-overflow: ellipsis;
      margin-left: -112px;
    }

  }
}



</style>
