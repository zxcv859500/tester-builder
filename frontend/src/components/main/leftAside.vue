<template>
    <div class="main-page-left-aside">
        <div class="aside-first"></div>
        <div class="aside-second"></div>
        <div class="aside-third"></div>
    </div>
</template>

<script>
    export default {
        name: "leftAside"
    }
</script>

<style scoped>
    .main-page-left-aside > div {
        width: 253px;
    }
    .aside-first {
        height: 520px;
        background-color: #cfa972;
    }
    .aside-second {
        height: 230px;
    }
    .aside-third {
        background-color: #333333;
        height: 230px;
    }
</style>