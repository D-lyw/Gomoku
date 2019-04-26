<template>
  <div id="barrage">
    <div @click="startAnmition">触发</div>
    <transition-group name="barrage-move"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @after-enter="afterEnter"
                      @afterLeave="afterLeave">
      <div v-for="(item,index) in list" :key="item">
        <barrageitem :msg="item"></barrageitem>
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
      };
    },
    props: {
      linecount: {
        type: Number,
      },
      msglist: {
        type: Array,
      },
    },
    components: {
      barrageitem,
    },
    methods: {
      startAnmition () {
        this.list.push(this.msglist[0]);
      },
      beforeEnter (el) {
        console.log('chufa');
        el.style.transform = 'translateX(600px)';
        el.style.transition = 'all 10s ease';
      },
      enter (el, done) {
        el.offsetHeight;
        el.style.transform = 'translateX(0px)';
        done();
      },
      afterEnter () {
        this.isShow = !this.isShow;
      },
      afterLeave (el) {
      },
    },
    watch: {},
    computed: {},
  };
</script>

<style scoped lang="scss">
  #barrage {
    width: 100%;
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
