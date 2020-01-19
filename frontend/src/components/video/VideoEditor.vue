<template>
    <div class="video-editor">
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
                        :http-request="upload">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text"><em>눌러서 영상을 업로드하세요.</em></div>
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
                type: ''
            }
        },
        mounted() {
            this.type = window.location.href.split('/')[4];
        },
        methods: {
            writeCancel() {
                this.$router.go(-1);
            },
            saveContent() {
                this.$axios.defaults.headers['x-access-token'] = this.token;
                if (this.token === null) {
                    alert("로그인 되어있지 않습니다.");
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

                const formData = new FormData();
                formData.append('file', file.raw);
                this.$axios.post('/api/upload', formData).then(res => {
                    this.content = res.data.uri;
                    this.$refs.upload.clearFiles();
                })
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
        width: 1400px;
        margin: 0 auto;
    }
    .video-container {
        max-width: 890px;
        height: auto;
        padding: 20px 20px;
        margin: 0 auto;
        border: 2px solid #d5d5d5;
        display: flow-root;
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