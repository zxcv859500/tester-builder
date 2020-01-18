<template>
    <div class="article">
        <div class="article-container">
            <div class="article-title">
                <div class="name-wrapper">
                    <h3>공지사항</h3>
                </div>
            </div>
            <div class="article-demonstrate">
                <li class="demonstration">A아이연산의 신규/업데이트 소식 및 이벤트 관련 소식을 알려 드립니다.</li>
            </div>
            <div class="article-main">
                <div class="article-header-wrap">
                    <h4 class="title">{{ inform.title }}</h4>
                </div>
                <div class="article-date-wrap">
                    <small class="article-date">작성일: {{ inform.date }}</small>
                </div>
                <div class="article-viewer-wrap">
                    <div class="article-viewer" v-html="inform.content">
                    </div>
                </div>
            </div>
            <div class="list-button">
                <el-button size="mini" @click="goList">목록</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticleViewer",
        data() {
            return {
                inform: null
            }
        },
        mounted() {
            const id = this.$route.params.id;

            this.$axios.get(`/api/article/${id}`)
                .then((result) => {
                    this.inform = result.data;
                    this.inform.date = this.inform.date.split('T')[0];
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        methods: {
            goList() {
                this.$router.push('/notice')
            }
        }
    }
</script>

<style scoped>
    .article {
        width: 100%;
        text-align: center;
        display: inline-block;
    }
    .article-container {
        width: 1400px;
        text-align: center;
        margin: 0 auto;
        display: inline-block;
    }
    .article-title {
        width: 880px;
        border-bottom: 2px solid #bcbcbc;
        margin: 0 auto;
        display: inline-block;
    }
    .name-wrapper {
        float: left;
        line-height: 22px;
        letter-spacing: -1px;
        display: inline-block;
    }
    .name-wrapper > h3 {
        font-family: 나눔고딕,NanumGothic,system,sans-serif;
        font-size: 18px;
        font-weight: 600;
        color: #333;
    }
    .article-demonstrate {
        width: 880px;
        margin: 0 auto;
    }
    .demonstration {
        display: list-item;
        text-align: -webkit-match-parent;
        margin-top: 10px;
        margin-bottom: 4px;
        color: #888;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -.3px;
        font-family: 나눔고딕,NanumGothic,system,sans-serif;
        list-style: none;
        float: left;
    }
    .article-main {
        width: 880px;
        margin: 20px auto;
        content: "";
        display: inline-block;
        clear: both;
        padding: 5px;
        box-sizing: border-box;
        border: 1px solid #e5e8e8;
    }
    .article-header-wrap {
        padding: 15px 15px 0;
        width: 95%;
        display: inline-block;
    }
    .article-header-wrap > .title {
        text-align: left;
        padding-bottom: 10px;
        width: 100%;
        color: #888;
        border-bottom: 1px dotted #e5e8e8;
        font-size: 15px;
        line-height: 20px;
        font-weight: 600;
        letter-spacing: -.3px;
        margin: 0;
    }
    .article-date {
        float: right;
        font-size: 11px;
        line-height: 15px;
        color: #333;
        font-family: 나눔고딕,NanumGothic,system,sans-serif;
    }
    .article-date-wrap {
        padding: 10px;
    }
    .article-viewer-wrap {
        padding: 20px;
        float: left;
        text-align: left;
    }
    .list-button {
        width: 880px;
        margin: 0 auto;
    }
    .list-button > button {
        float: left;
    }
</style>