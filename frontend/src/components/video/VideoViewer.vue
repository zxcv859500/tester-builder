<template>
    <div class="article">
        <div class="article-container">
            <div class="article-title">
                <div class="name-wrapper">
                    <h3>동영상 게시판</h3>
                </div>
            </div>
            <div class="article-demonstrate">
                <li class="demonstration">동영상 게시판입니다.</li>
            </div>
            <div class="article-main">
                <div class="article-header-wrap">
                    <h4 class="title">{{ inform.title }}</h4>
                </div>
                <div class="article-date-wrap">
                    <small class="article-date">작성일: {{ inform.date }}</small>
                </div>
                <div class="article-viewer-wrap">
                    <vimeo-player ref="player"
                                  player-width="880px"
                                  :video-id="this.src"></vimeo-player>
                </div>
            </div>
            <div class="list-button">
                <el-button size="mini" @click="goList">목록</el-button>
                <div class="removeButton" v-if="Number(this.userId) === this.inform.userId">
                    <el-button class="remove"
                               size="mini"
                               type="danger"
                               @click="remove">삭제</el-button>
                </div>
            </div>
            <div class="article-title">
                <div class="name-wrapper">
                    <h3>댓글</h3>
                </div>
            </div>
            <div class="article-comment">
                <el-input
                        type="textarea"
                        placeholder=""
                        v-model="comment"
                        resize="none"
                        show-word-limit>
                </el-input>
            </div>
            <div class="comment-button">
                <el-button size="mini" @click="writeComment">등록</el-button>
            </div>
            <div class="comment-table">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        size="small"
                        empty-text="댓글이 없습니다."
                        :show-header="false">
                    <el-table-column
                            prop="author"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            width="550"
                            text-align="left">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="작성일"
                            width="90"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            width="40">
                        <template slot-scope="scope">
                            <div class="icon" v-if="scope.row.flag">
                                <i @click="removeComment(scope.row.id)" class="el-icon-close"></i>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "VideoViewer",
        data() {
            return {
                inform: null,
                comment: '',
                tableData: [],
                src: ''
            }
        },
        mounted() {
            const id = this.$route.params.id;

            this.$axios.get(`/api/article/${id}`)
                .then((result) => {
                    this.inform = result.data;
                    this.inform.date = this.inform.date.split('T')[0];
                    this.getCommentList();
                    this.src = this.inform.content.split('/')[2];
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        methods: {
            goList() {
                this.$router.push('/video')
            },
            writeComment() {
                if (this.username === undefined || this.username === '') {
                    alert("로그인이 필요합니다.");
                } else if (this.comment === '') {
                    alert("내용을 입력해주세요.");
                } else {
                    this.$axios.defaults.headers['x-access-token'] = this.token;
                    this.$axios.post('/api/comment/write', {
                        author: this.username,
                        content: this.comment,
                        articleId: this.$route.params.id
                    })
                        .then(() => {
                            this.comment = '';
                            this.getCommentList();
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            },
            removeComment(id) {
                this.$axios.defaults.headers['x-access-token'] = this.token;
                this.$axios.get(`/api/comment/remove/${id}`)
                    .then(() => {
                        this.getCommentList();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            getCommentList() {
                const id = this.$route.params.id;

                this.$axios.get(`/api/comment/${id}`)
                    .then((result) => {
                        console.log(result.data);
                        this.tableData = result.data;
                        this.tableData.map(dt => dt.date = `${dt.date.split('T')[0]} ${dt.date.split('T')[1].split('.')[0]}`)
                        this.tableData.map(dt => dt['flag'] = dt.userId === Number(this.userId));
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            remove() {
                const id = this.$route.params.id;
                this.$axios.defaults.headers['x-access-token'] = this.token;
                this.$axios.get(`/api/article/remove/${id}`)
                    .then(() => {
                        this.$router.push('/video');
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        computed: mapGetters({
            token: "getToken",
            username: "getUsername",
            userId: "getUserId"
        })
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
        display: flow-root;
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
        display: inline-block;
    }
    .list-button > button {
        float: left;
    }
    .remove {
        float: right;
    }
    .article-comment {
        width: 880px;
        margin: 20px auto;
        display: inline-block;
    }
    .comment-button {
        width: 880px;
        margin: 0 auto;
        display: inline-block;
    }
    .comment-button > button {
        float: right;
    }
    .comment-table {
        width: 880px;
        margin: 30px auto;
        display: inline-block;
    }
</style>