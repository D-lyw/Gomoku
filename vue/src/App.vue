<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
  import home from './components/home/home';
export default {
  name: 'App',
  components:{
    home,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
