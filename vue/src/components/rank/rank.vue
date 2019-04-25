<template>
<div class="rankWrap animated fadeInUp">
  <div class='rank'>
    <div class='second'>
      <img src='/static/img/second.png' class='second-crown'></img>
      <img src="/static/img/avatar2.jpg" class="two" alt="">
      <div class="user">
        张三 
        <br>
        28分
      </div>
    </div>
    <div class='first'>
      <img src='/static/img/first.png' class='first-crown'></img>
      <img src="/static/img/avatar1.jpg" class="one" alt="">
       <div class="user">
        张三 
        <br>
        60分
      </div>
    </div>
    <div class='third'>
      <img src='/static/img/third.png' class='third-crown'></img>
      <img src="/static/img/avatar3.jpg" class="three" alt="">
       <div class="user">
        张三十
        <br>
        60分
      </div>
    </div>
  </div>
  <div class="otherRank">
    <ul>
      <li>
        <div class="">4</div>
        <div class="avatar">
          <img src="/static/img/avatar1.jpg" alt="">
        </div>
        <div class="userName">张三</div>
        <div class="score">60分</div>
      </li>
      <li>
        <div class="">4</div>
        <div class="avatar">
          <img src="/static/img/avatar1.jpg" alt="">
        </div>
        <div class='userName'>张三</div>
        <div class="score">60分</div>
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

    }
  },
  methods: {

  },
  mounted() {
    axios.post('http://39.108.10.155:8080/getTop10')
      .then(function (response) {
        console.log(response);
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
  margin-left: -30px;
  left: 30px;
  // margin-right: 20px;
  position: absolute; 
}

.rank {
  display: flex;
  justify-content: center;
  width: 264px;
  padding-bottom: 30px;
  background-image: linear-gradient(to top, #71cdfa, #19b4ec);
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
      margin-left: -126px;
      img {
        border-radius: 50%;
        width: 50px;
      }
    }
    .userName {
      margin-left: -123px;
    }
  }
}



</style>
