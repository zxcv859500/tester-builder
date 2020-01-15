<template>
    <div class="page">
        <div class="header">
            <mainHeader></mainHeader>
        </div>
        <div class="main">
            <div class="main-board">
            <div class="container">
                <div class="right-aside">
                    <right-aside></right-aside>
                </div>
                <div class="router-container">
                    <router-view></router-view>
                </div>
                <div class="left-aside">
                    <left-aside></left-aside>
                </div>
            </div>
            </div>
        </div>
        <div class="footer">
            <main-footer></main-footer>
        </div>
    </div>
</template>

<script>
    import mainHeader from './main/header';
    //import mainPage from './main/main';
    import mainFooter from './main/footer';
    import rightAside from './main/rightAside';
    import leftAside from './main/leftAside';

    export default {
        name: "Page",
        components: {
            mainHeader,
            //mainPage,
            mainFooter,
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
    .main > div {
        display: inline-block;
    }
    .main-board {
        margin: 0 auto;
        min-width: 1640px;
        text-align: center;
    }
    .container {
        margin: 0 auto;
        display: inline-block;
    }
    .container > div {
        float: right;
    }
    .page {
    }
    .footer {
        clear: both;
        height: auto;
        position: relative;
        top: -4px;
        left: -38px;
    }
    .header {
        clear: both;
    }
    .router-container {
        min-width: 800px;
        min-height: 657px;
    }
</style>