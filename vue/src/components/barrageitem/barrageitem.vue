<template>
  <div id="barrageitem" ref="barrageItem">
    {{msg}}
  </div>
</template>

<script>
  export default {
    name: 'barrageitem',
    props: {
      msg: {
        type: String,
      },
      linehei: {
        type: Number,
      },
    },
    mounted () {
      this.$refs.barrageItem.style.transform = `translateY(${this.linehei}px)`;
    },
  };
</script>

<style scoped lang="scss">
  #barrageitem {
    display: inline-block;
    font-size: 18px;
    color: white;
    background-color: rgba(0,0,0,0.3);
    border-radius: 10px;
    padding: 0 10px;
    font-weight: 500;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
