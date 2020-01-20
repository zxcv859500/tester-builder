<template>
    <div class="page">
        <div class="header">
            <mainHeader></mainHeader>
        </div>
        <router-view :key="$route.fullPath"></router-view>
        <div class="main-footer">
            <main-footer></main-footer>
        </div>
    </div>
</template>

<script>
    import mainHeader from './main/header';
    import mainFooter from './main/footer';

    export default {
        name: "Page",
        components: {
            mainHeader,
            mainFooter
        }
    }
</script>

<style scoped>
    .main > div {
        display: inline-block;
        box-sizing: border-box;
    }
    .page {
        position: relative;
        width: 100%;
        min-height: 95%;
        padding-bottom: 150px;
        box-sizing: border-box;
    }
    .header {
        box-sizing: border-box;
    }
    .main-footer {
        width: 100%;
        position: absolute;
        bottom: 0;
    }
</style>