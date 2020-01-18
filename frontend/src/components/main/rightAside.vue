<template>
    <div class="main-page-right-aside">
        <div class="menu-start">
            <img src="@/assets/시작하기.png">
        </div>
        <div class="menu-again">
            <img src="@/assets/다시풀기.png">
        </div>
        <div class="menu-twin">
            <img src="@/assets/쌍둥이문제.png">
        </div>
        <div class="menu-print">
            <img src="@/assets/문제지인쇄하기.png">
        </div>
        <div class="menu-answer">
            <img src="@/assets/답안지.png">
        </div>
        <div class="menu-media img-div">
            <img src="@/assets/동영상보기.png">
        </div>
        <div class="menu-ask" @click="goQuestion">
            <img class='astext' src="@/assets/질문하기.png">
        </div>
        <div class="menu-grade">
            <img src="@/assets/성적표.png">
        </div>
        <div class="menu-total">
            <img src="@/assets/총응시자.png">
        </div>
        <div class="menu-average">
            <img src="@/assets/평균.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: "rightAside",
        methods: {
            goQuestion() {
                this.$router.push('/question')
            }
        }
    }
</script>

<style scoped>
    .main-page-right-aside > div > img {
        display: block;
    }
    .astext {
        cursor: pointer;
    }
</style>