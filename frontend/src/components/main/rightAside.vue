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
            <span class="desc">총 응시자</span>
            <span class="total">{{ total }}</span>
            <div class="icon">
                <i class="el-icon-notebook-1"></i>
            </div>
        </div>
        <div class="menu-average">
            <span class="desc">평균</span>
            <span class="total">87점</span>
            <div class="icon">
                <i class="el-icon-notebook-2"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "rightAside",
        data() {
            return {
                total: 0
            }
        },
        mounted() {
            this.$axios.get('/api/count')
                .then((result) => {
                    this.total = result.data.cnt;
                    this.total = this.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.total += "명";
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        methods: {
            goQuestion() {
                this.$router.push('/question').catch(()=> {})
            },
            goVideo() {
                this.$router.push('/video').catch(()=> {})
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
                    this.$router.push(`/testviewer/${problemId}`).catch(()=> {})
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
            randomNumber: 'getProblemRand'
        })
    }
</script>

<style scoped>
    @import url(https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css);

    .main-page-right-aside > div > img {
        display: block;
    }
    .astext {
        cursor: pointer;
    }
    .menu-total {
        width: 221px;
        height: 77px;
        background-color: #ffde5b;
        font-family: 'NanumSquare';
        font-weight: 600;
        font-size: 13pt;
        text-align: left;
    }
    .desc {
        margin-top: 20px;
        display: inline-block;
    }
    .menu-total > span {
        margin-left: 32px;
    }
    .total {
        display: block;
    }
    .el-icon-notebook-1 {
        float: right;
        font-size: 1.5rem;
        display: contents;
    }
    .el-icon-notebook-2 {
        float: right;
        font-size: 1.5rem;
        display: contents;
    }
    .icon {
        position: relative;
        bottom: 32px;
        left: 180px;
    }
    .menu-average {
        width: 221px;
        height: 77px;
        background-color: #333333;
        font-family: 'NanumSquare';
        font-weight: 600;
        font-size: 13pt;
        text-align: left;
        color: white;
    }
    .menu-average > span {
        margin-left: 32px;
    }
</style>