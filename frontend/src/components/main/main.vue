<template>
    <div class="main-page">
        <div class="main-page-img">
            <img src="@/assets/mainImg.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: "header.vue"
    }
</script>

<style scoped>
    .main-page {
        width: auto;
    }
    .main-page-left-aside > div {
        float: top;
        left: 0;
    }
    .main-page > div {
        float: left;
    }
    .main-page-img > img {
        display: block;
    }
</style>