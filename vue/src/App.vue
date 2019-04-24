<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import home from './components/home/home';

  export default {
    name: 'App',
    components: {
      home,
    },
  };
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }
</style>
