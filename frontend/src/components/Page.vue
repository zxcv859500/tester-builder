<template>
    <div class="page">
        <div class="header">
            <mainHeader></mainHeader>
        </div>
        <router-view></router-view>
        <div class="footer">
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
    }
    .page {
    }
    .header {
        clear: both;
    }
</style>