<template>
  <div class="app">
    <el-header>
      <mainHeader></mainHeader>
    </el-header>
    <div class="main">
      <mainPage></mainPage>
    </div>
  </div>
</template>

<script>
  import mainHeader from './components/header'
  import mainPage from './components/main'

export default {
  name: 'app',
  components: {
    mainHeader,
    mainPage
  }
}
</script>

<style>
  .main {
    position: absolute;
    width:100%;
    text-align: center;
  }
  .main > div {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
