<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
  body {
    margin: 0;
    height: 100%;
  }
  .app > div{
    height: auto;
  }
</style>
