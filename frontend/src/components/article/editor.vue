<template>
    <div class="editor">
        <div class="container">
            <div class="title-wrapper">
                <el-input placeholder="제목을 입력해주세요." v-model="title"></el-input>
            </div>
            <div class="wysiwyg-editor-wrapper">
                <vue-editor class="wysiwyg-editor"
                            v-model="content"></vue-editor>
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
                type: ''
            }
        },
        mounted() {
            this.type = window.location.href.split('/')[4];
            console.log(this.type);
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
        width: 1400px;
        margin: 0 auto;
    }
    .container {
        max-width: 890px;
        height: 630px;
        padding: 20px 20px;
        margin: 0 auto;
        border: 2px solid #d5d5d5;
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