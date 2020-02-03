<template>
    <div class="score-list">
        <div class="score-title">
            <div class="name-wrapper">
                <h3>성적표</h3>
            </div>
        </div>
        <div class="article-demonstrate">
            <li class="demonstration">회원님의 선생님이 입력한 채점 결과입니다.</li>
            <li class="average">평균:{{ this.average }}</li>
        </div>
        <div class="score-table">
            <template v-if="tableData !== null">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    size="small"
                    empty-text="채점결과가 없습니다.">
                    <el-table-column
                        prop="chapter"
                        label="대단원">
                    </el-table-column>
                    <el-table-column
                        prop="problem"
                        label="소단원">
                    </el-table-column>
                    <el-table-column
                        prop="score"
                        label="점수">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="채점 날짜">
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "score.vue",
        data() {
            return {
                tableData: null
            }
        },
        mounted() {
            this.$axios.defaults.headers['x-access-token'] = this.token;
            this.$axios.get('/api/score/list')
            .then((result) => {
                this.tableData = result.data;
                this.tableData.map(r => r.date = r.date.split('T')[0])
            })
            .catch((err) => {
                console.log(err);
            })
        },
        computed: mapGetters({
            average: "getAverage",
            token: "getToken"
        })
    }
</script>

<style scoped>
    .score-list {
        min-width: 874px;
        text-align: center;
        display: inline-block;
        box-sizing: border-box;
        padding: 15px;
    }
    .score-title {
        width: 100%;
        border-bottom: 2px solid #bcbcbc;
        margin: 0 auto;
        display: inline-block;
    }
    name-wrapper {
        float: left;
        line-height: 22px;
        letter-spacing: -1px;
        display: inline-block;
    }
    name-wrapper > h3 {
        font-family: 나눔고딕,NanumGothic,system,sans-serif;
        font-size: 18px;
        font-weight: 600;
        color: #333;
    }
    .article-demonstrate {
        margin: 0 auto;
        min-width: 230px;
        display: table-caption;
        vertical-align: top;
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
        vertical-align: top;
    }
    .average {
        display: list-item;
        text-align: -webkit-match-parent;
        margin-top: 30px;
        margin-bottom: 4px;
        color: #888;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -.3px;
        font-family: 나눔고딕,NanumGothic,system,sans-serif;
        list-style: none;
        float: left;
        vertical-align: top;
    }
    .score-table {
        width: 100%;
        margin: 30px auto;
        display: inline-block;
    }
    .pagination{
        display: inline-block;
        width: 880px;
    }
    .write-buttons > button {
        float: right;
    }
</style>