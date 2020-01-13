<template>
  <div class="app">
    <div class="header">
      <mainHeader></mainHeader>
    </div>
    <div class="main">
      <div class="main-board">
        <div class="right-aside">
          <right-aside></right-aside>
        </div>
        <mainPage></mainPage>
        <div class="left-aside">
          <left-aside></left-aside>
        </div>
      </div>
    </div>
    <div class="footer">
      <main-footer></main-footer>
    </div>
  </div>
</template>

<script>
  import mainHeader from './components/main/header'
  import mainPage from './components/main/main'
  import mainFooter from './components/main/footer'
  import rightAside from "./components/main/rightAside"
  import leftAside from "./components/main/leftAside";

export default {
  name: 'app',
  components: {
    mainHeader,
    mainPage,
    mainFooter,
    rightAside,
    leftAside
  }
}
</script>

<style>
  .main {
    text-align: center;
    clear: both;
    height: auto;
    margin: 0 auto;
    min-width: 1887px;
  }
  .main > div {
    display: inline-block;
  }
  .main-board {
    margin: 0 auto;
  }
  .main-board > div {
    float: right;
  }
  body {
    margin: 0;
  }
  .footer {
    clear: both;
    height: auto;
    position: relative;
    top: -4px;
    left: -38px;
  }
  .app > div{
    height: auto;
  }
  .header {
    clear: both;
  }
  .app {
    -webkit-transform: scale(0.67); /* Saf3.1+, Chrome */
    -moz-transform: scale(0.67); /* FF3.5+ */
    -ms-transform: scale(0.67); /* IE9 */
    -o-transform: scale(0.67); /* Opera 10.5+ */
    transform: scale(0.67);
    position: relative;
    top: -280px;
  }
</style>
