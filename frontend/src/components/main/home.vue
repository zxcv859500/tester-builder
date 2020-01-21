<template>
    <div class="main">
        <div class="main-board">
            <div class="container">
                <div class="right-aside">
                    <right-aside></right-aside>
                </div>
                <div class="router-container">
                    <router-view :key="$route.fullPath"></router-view>
                </div>
                <div class="left-aside">
                    <left-aside></left-aside>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import rightAside from './rightAside';
    import leftAside from "./leftAside";
    export default {
        name: "home",
        components: {
            rightAside,
            leftAside
        }
    }
</script>

<style scoped>
    .main {
        text-align: center;
        clear: both;
        height: auto;
        margin: 0 auto;
        width: 100%;
    }
    .container > div {
        float: right;
    }
    .main-board {
        margin: 0 auto;
        min-width: 1400px;
        text-align: center;
        display: flex;
    }
    .container {
        margin: 0 auto;
        display: inline-block;
    }
    .router-container {
        min-width: 874px;
        min-height: 657px;
    }
</style>