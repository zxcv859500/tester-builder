<template>
    <div class="main-page-right-aside">
        <div class="menu-start">
            <img src="@/assets/시작하기.png">
        </div>
        <div class="menu-again" @click="problemAgain">
            <img class="astext" src="@/assets/다시풀기.png">
        </div>
        <div class="menu-twin" @click="twinProblem">
            <img class="astext" src="@/assets/쌍둥이문제.png">
        </div>
        <div class="menu-print" @click="printProblem">
            <img class="astext" src="@/assets/문제지인쇄하기.png">
        </div>
        <div class="menu-answer" @click="answerMode">
            <img class="astext" src="@/assets/답안지.png">
        </div>
        <div class="menu-media img-div" @click="goVideo">
            <img class="astext" src="@/assets/동영상보기.png">
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
    import { mapGetters } from 'vuex';

    export default {
        name: "rightAside",
        methods: {
            goQuestion() {
                this.$router.push('/question')
            },
            goVideo() {
                this.$router.push('/video')
            },
            answerMode() {
                const path = window.location.href.split('/')[4];
                if (path !== "testviewer") {
                    alert("문제지를 선택해주세요.");
                } else {
                    this.$store.commit('setMode', {mode: 1});
                }
            },
            problemAgain() {
                const path = window.location.href.split('/')[4];
                if (path !== "testviewer") {
                    alert("문제지를 선택해주세요.");
                } else {
                    this.$store.commit('setMode', {mode: 0});
                }
            },
            twinProblem() {
                const path = window.location.href.split('/')[4];
                if (path !== "testviewer") {
                    alert("문제지를 선택해주세요.");
                } else {
                    this.$store.commit("setMode", { mode: 0 });
                    const rand = Math.floor(Math.random() * 16);
                    const { grade, semester, chapter, problem } = this.inform;
                    let randomNumber = rand.toString(16);
                    while (randomNumber === this.randomNumber) {
                        randomNumber = rand.toString(16);
                    }
                    this.$store.commit("setProblemRand", {randomNumber : randomNumber});
                    const problemId = `${grade}${semester}${chapter}${problem}${randomNumber}`;
                    this.$router.push(`/testviewer/${problemId}`)
                }
            },
            printProblem() {
                const path = window.location.href.split('/')[4];
                if (path !== "testviewer") {
                    alert("문제지를 선택해주세요.");
                } else {
                    this.$store.commit("setPrintState", { printState: 1})
                }
            }
        },
        computed: mapGetters({
            mode: 'getMode',
            inform: 'getState',
            randomNumber: 'getProblemRandom'
        })
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