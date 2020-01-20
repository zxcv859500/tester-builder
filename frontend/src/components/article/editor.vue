<template>
    <div class="editor">
        <div class="article-title">
            <div class="name-wrapper">
                <h3>{{ this.name }}</h3>
            </div>
        </div>
        <div class="article-demonstrate">
            <li class="demonstration">{{ this.description }}</li>
        </div>
        <div class="container">
            <div class="title-wrapper">
                <el-input placeholder="제목을 입력해주세요." v-model="title"></el-input>
            </div>
            <div class="wysiwyg-editor-wrapper">
                <vue-editor class="wysiwyg-editor"
                            v-model="content"
                            useCustomImageHandler
                            @image-added="handleImageAdded"></vue-editor>
            </div>
            <div class="buttons-wrapper">
                <el-button type="primary" @click="saveContent">등록</el-button>
                <el-button @click="writeCancel">취소</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor';
    import { mapGetters } from 'vuex';

    export default {
        name: "editor",
        components: {
            VueEditor
        },
        data() {
            return {
                title: '',
                content: '',
                type: '',
                mode: '',
                name: '공지사항',
                description: "A아이연산의 신규/업데이트 소식 및 이벤트 관련 소식을 알려 드립니다."
            }
        },
        mounted() {
            if (this.type === "question") {
                this.name = "질문하기";
                this.description = "질문 게시판입니다.";
            }
            this.type = window.location.href.split('/')[3];
            this.mode = window.location.href.split('/')[4];
            if (this.mode === "edit") {
                const id = this.$route.params.id;

                this.$axios.get(`/api/article/${id}`)
                    .then((result) => {
                        this.title = result.data.title;
                        this.content = result.data.content;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        methods: {
            writeCancel() {
                this.$router.go(-1);
            },
            saveContent() {
                const id = this.$route.params.id;
                this.$axios.defaults.headers['x-access-token'] = this.token;
                if (this.token === null) {
                    alert("로그인 되어있지 않습니다.");
                } else if (this.title === '' || this.content === '') {
                    alert("글과 내용은 필수항목입니다.");
                } else {
                    this.$axios.post(`/api/article/${this.type}/${this.mode}`, {
                        title: this.title,
                        content: this.content,
                        id: id
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
            handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                const formData = new FormData();
                formData.append("file", file);

                this.$axios.post('/api/article/imageUpload', formData)
                    .then((result) => {
                        let url = result.data.url;
                        console.log(url);
                        Editor.insertEmbed(cursorLocation, "image", url);
                        resetUploader();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        computed: mapGetters({
            token: "getToken",
            username: "getUsername"
        })
    }
</script>

<style scoped>
    .editor {
        max-width: 874px;
        margin: 0 auto;
        padding: 15px;
        box-sizing: border-box;
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
    .container {
        width: 100%;
        height: 630px;
        padding: 20px 20px;
        margin: 0 auto;
        border: 2px solid #d5d5d5;
        display: inline-table;
        box-sizing: border-box;
    }
    .title-wrapper {
        margin-bottom: 10px;
    }
    .wysiwyg-editor {
        height: 500px;
    }
    .wysiwyg-editor-wrapper {
        display: inline-block;
        width: 100%;
    }
    .buttons-wrapper > button {
        float: right;
        margin-left: 10px;
    }
</style>