<template>
  <div id="timer">
    <img src="../../../static/img/clocktime.png" class="clockname" />
    <div class="clock">{{computedMinutes}}:{{computedSeconds}}</div>
  </div>
</template>

<script>
  export default {
    name: 'timer',
    data () {
      return {
        seconds: 0,
        minutes: 1,
      };
    },
    methods: {
      num (n) {
        return n < 10 ? '0' + n : '' + n;
      },
      timer () {
        var _this = this;
        var time = window.setInterval(function () {
          if (_this.seconds === 0 && _this.minutes !== 0) {
            _this.seconds = 59;
            _this.minutes -= 1;
          } else if (_this.minutes === 0 && _this.seconds === 0) {
            _this.seconds = 0;
            window.clearInterval(time);
          } else {
            _this.seconds -= 1;
          }
        }, 1000);
      },
    },

    mounted () {
      this.timer();
    },
    computed: {
      computedSeconds: function () {
        return this.num(this.seconds);
      },
      computedMinutes: function () {
        return this.num(this.minutes);
      },
    },
  };
</script>

<style scoped lang="scss">
  #timer {
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
