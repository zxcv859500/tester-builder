<template>
    <div class="video-editor">
        <div class="article-title">
            <div class="name-wrapper">
                <h3>동영상 게시판</h3>
            </div>
        </div>
        <div class="article-demonstrate">
            <li class="demonstration">동영상 게시판입니다.</li>
        </div>
        <div class="video-container">
            <div class="video-title-wrapper">
                <el-input placeholder="제목을 입력해주세요." v-model="title"></el-input>
            </div>
            <div class="video-upload-wrapper">
                <el-upload
                        class="upload-demo"
                        drag
                        action=""
                        ref="upload"
                        :show-file-list="false"
                        :http-request="upload"
                        v-loading="loading">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text"><em>{{ desc }}</em></div>
                </el-upload>
            </div>
            <div class="video-buttons-wrapper">
                <el-button type="primary" @click="saveContent">등록</el-button>
                <el-button @click="writeCancel">취소</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "VideoEditor",
        components: {
        },
        data() {
            return {
                title: '',
                content: '',
                type: '',
                loading: false,
                desc: "눌러서 영상을 업로드하세요."
            }
        },
        mounted() {
            this.type = window.location.href.split('/')[3];
        },
        methods: {
            writeCancel() {
                this.$router.go(-1);
            },
            saveContent() {
                this.$axios.defaults.headers['x-access-token'] = this.token;
                if (this.token === null) {
                    alert("로그인 되어있지 않습니다.");
                } else if (this.loading === true) {
                    alert("동영상을 업로드 중입니다.");
                } else if (this.title === '' || this.content === '') {
                    alert("글과 내용은 필수항목입니다.");
                } else {
                    this.$axios.post(`/api/article/${this.type}/write`, {
                        title: this.title,
                        content: this.content
                    })
                        .then(() => {
                            this.$router.push(`/${this.type}`)
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("글 등록에 실패했습니다.");
                        })
                }
            },
            upload() {
                const file = this.$refs.upload.uploadFiles[0];
                if (!file.name.match(/.(mp4|flv|mkv|mov|wmv|avi)$/i)) {
                    alert("유효한 영상 형식이 아닙니다.")
                } else {
                    const formData = new FormData();
                    formData.append('file', file.raw);
                    this.loading = true;
                    this.$axios.post('/api/upload', formData).then(res => {
                        this.content = res.data.uri;
                        this.$refs.upload.clearFiles();
                        this.loading = false;
                        this.desc = "영상 업로드가 완료되었습니다.";
                    })
                }
            }
        },
        computed: mapGetters({
            token: "getToken",
            username: "getUsername"
        })
    }
</script>

<style>
    .video-editor {
        max-width: 874px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 15px;
    }
    .article-title {
        width: 100%;
        border-bottom: 2px solid #bcbcbc;
        margin: 0 auto;
        display: flex;
        text-align: left;
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
    .video-container {
        width: 100%;
        height: auto;
        padding: 20px 20px;
        margin: 0 auto;
        border: 2px solid #d5d5d5;
        display: flow-root;
        box-sizing: border-box;
    }
    .video-title-wrapper {
        margin-bottom: 10px;
    }
    .upload-demo {
    }
    .el-upload {
        width: 100%;
    }
    .el-upload-dragger{
        width: 100%;
        height: 440px;
    }
    .el-icon-upload {
        position: absolute;
        top: 33%;
        left: 46%
    }
    .el-upload__text {
        position: relative;
        margin: 0 auto;
        top: 55%;
    }
    .video-upload-wrapper {
        display: inline-block;
        width: 100%;
    }
    .video-buttons-wrapper > button {
        float: right;
        margin-left: 10px;
    }
</style>