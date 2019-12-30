<template>
  <div class="page">
    <TesterViewer></TesterViewer>
    <button class="print">abc</button>
  </div>
</template>

<script>
  import TesterViewer from './components/TesterViewer';

export default {
  name: 'app',
  components: {
    TesterViewer
  }
}
</script>

<style>
  .print {
    position: absolute;
  }
</style>
