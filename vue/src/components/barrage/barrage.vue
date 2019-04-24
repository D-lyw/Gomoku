<template>
  <div id="barrage">
    <div @click="startmove">触发</div>
    <div v-for="(item,index) in barrages">
      <transition name="barrage-move"
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @after-enter="afterEnter"
                  @after-leave="afterLeave">

        <div class="barrage-container" v-if="item.show" style="transform: translateX(100%)">
          <div class="barrage-com"  ><!--v-if="item.show"-->
            {{item.content}}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'barrage',
    data () {
      return {
        barrages: [{'content': '32撒大大多多多多多多多多多多多多asd', 'show': false},
          {'content': '12312123', show: false}],
      };
    },
    methods: {
      startmove () {
        this.barrages[0].show = !this.barrages[0].show;
      },
      beforeEnter (el) {

      },
      enter (el) {
        el.style.transform = `translateX(-200px)`;
      },
      afterEnter () {

      },
      afterLeave () {

      },
    },
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
