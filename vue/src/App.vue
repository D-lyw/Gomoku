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

</style>
