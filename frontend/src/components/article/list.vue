<template>
    <div class="article-list">
        <div class="article-container">
            <div class="article-title">
                <div class="name-wrapper">
                    <h3>{{ this.name }}</h3>
                </div>
            </div>
            <div class="article-demonstrate">
                <li class="demonstration">{{ this.description }}</li>
            </div>
            <div class="article-table">
                <template v-if="tableData !== null">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            size="small"
                            empty-text="글이 없습니다."
                            @cell-click="goArticle"
                            cell-style="cursor: pointer">
                        <el-table-column
                                prop="index"
                                width="45">
                        </el-table-column>
                        <el-table-column
                                label="제목"
                                width="509"
                                align="left"
                                header-align="center">
                            <template slot-scope="scope">
                                <span class="astext">
                                    {{ tableData[scope.$index].title }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="author"
                                label="작성자"
                                width="200"
                                header-align="center">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="작성일"
                                width="90"
                                align="center">
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="write-buttons">
                <el-button v-if="flag" type="primary" @click="goWrite">글쓰기</el-button>
            </div>
            <div class="pagination">
                <el-pagination
                        layout="prev, pager, next"
                        @current-change="pagination"
                        :total="listCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "list",
        data() {
            return {
                tableData: null,
                listCount: 0,
                type: '',
                flag: true,
                name: '공지사항',
                description: "A아이연산의 신규/업데이트 소식 및 이벤트 관련 소식을 알려 드립니다."
            }
        },
        mounted() {
            this.type = window.location.href.split('/')[3];
            this.$axios.get(`/api/article/${this.type}/count`)
                .then((result) => {
                    this.listCount = result.data.articleCount;
                })
                .catch((err) => {
                    console.log(err);
                });
            if (this.type === "question") {
                this.name = "질문하기";
                this.description = "질문 게시판입니다.";
            } else if (this.type === "video") {
                this.name = "동영상 게시판";
                this.description = "동영상 게시판입니다.";
            }
            this.getList(1);
            if (this.type === "notice" && (this.username === "edumaster" || this.username === "zxcv859500@naver.com")) {
                this.flag = true;
            } else if (this.type === "notice") {
                this.flag = false;
            }
        },
        methods: {
            getList(page) {
                this.$axios.get(`/api/article/${this.type}/list/${page}`)
                    .then((result) => {
                        this.tableData = result.data;
                        this.tableData = this.tableData.filter(n => n);
                        this.tableData.map(x => x.date = x.date.split('T')[0]);
                    })
            },
            goArticle(id) {
                if (this.type === "video") {
                    this.$router.push(`/video/${id.id}`).catch(()=> {})
                } else {
                    this.$router.push(`/article/${id.id}`).catch(()=> {})
                }
            },
            goWrite() {
                if (this.token === null || this.token === '') {
                    alert("로그인이 필요합니다");
                } else {
                    this.$router.push(`/${this.type}/write`).catch(()=> {});
                }
            },
            pagination(page) {
                this.getList(page);
            }
        },
        computed: mapGetters({
            token: "getToken",
            username: "getUsername"
        })
    }
</script>

<style scoped>
    .article-list {
        max-width: 874px;
        text-align: center;
        display: inline-block;
        box-sizing: border-box;
        padding: 15px;
    }
    .article-container {
        width: 100%;
        text-align: center;
        margin: 0 auto;
        display: inline-block;
    }
    .article-title {
        width: 100%;
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
        width: 100%;
        margin: 0 auto;
        display: inline-block;
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
    .article-table {
        width: 100%;
        margin: 30px auto;
        display: inline-block;
    }
    .pagination{
        display: inline-block;
        width: 880px;
    }
    .astext {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        cursor: pointer;
    }
    .write-buttons {
        width: 100%;
        margin: 0 auto;
        display: inline-block;
    }
    .write-buttons > button {
        float: right;
    }
</style>