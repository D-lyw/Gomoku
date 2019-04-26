<template>
  <div id="barrage" ref="barrageContainer">
    <transition-group name="barrage-move"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @after-enter="afterEnter"
                      @afterLeave="afterLeave"
                      style="display: inline-block"
    >
      <div v-for="(item,index) in list" :key="item.cont+Math.random()">
        <barrageitem :msg="item.cont" :linehei="item.linehei"></barrageitem>
      </div>
    </transition-group>

  </div>
</template>

<script>
  import barrageitem from '../barrageitem/barrageitem';

  export default {
    name: 'barrage',
    data () {
      return {
        list: [],
        isShow: false,
        linehei: 0,
      };
    },
    props: {
      linecount: {
        type: Number,
      },
      myTurn: {
        type: Boolean,
      },
    },
    components: {
      barrageitem,
    },
    methods: {
      rnd (n, m) {
        var random = Math.floor(Math.random() * (m - n + 1) + n);
        return random;
      },
      beforeEnter (el) {
        console.log('chufa');
        let barrageContainerWidth = window.getComputedStyle(this.$refs.barrageContainer)['width'];
        el.style.position = 'absolute';
        console.log(el.clientWidth);
        el.style.transform = `translateX(${barrageContainerWidth})`;
        el.style.transition = 'all 8s linear';
      },
      enter (el, done) {
        el.offsetHeight;
        el.style.transform = 'translateX(0px)';
        done();
      },
      afterEnter () {
        this.list.shift();
      },
      afterLeave (el) {
      },
    },
    watch: {},
    computed: {},
    mounted () {
      let that = this;
      let barrageHei = window.getComputedStyle(this.$refs.barrageContainer)['height'];
      this.linehei = parseInt(barrageHei) / this.linecount;

      this.$root.Bus.$on('newMsg', function (newMsg) {
        let aa = {
          cont: newMsg.cont,
          linehei: that.rnd(0, parseInt((that.linecount - 1) * that.linehei)),
        };
        that.list.push(aa);
      });

    },
  };
</script>

<style scoped lang="scss">
  #barrage {
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: relative;
    .barrage-container {
      /*transform: translateX(100%);*/
      .barrage-com {
        /*width: 200px;*/
        /*white-space: nowrap;*/
        /*overflow: hidden;*/
        /*word-break: break-all;*/
        /*text-overflow: ellipsis;*/
      }
    }
    .barrage-move-enter-active {
      transition: all 10s ease-in;
    }
    .barrage-move-leave-active {
      transition: all .5s ease-in;
    }
  }
</style>
