<template>
    <div class="main-page-header">
        <div class="main-page-top-header">
                <div class="main-page-top-header-menu">
                <span>공지사항</span>
                <el-divider direction="vertical"></el-divider>
                <span>로그인</span>
                <el-divider direction="vertical"></el-divider>
                <span>회원가입</span>
                <el-divider direction="vertical"></el-divider>
                <span>나의정보</span>
            </div>
        </div>
        <el-row class="main-page-bottom-header">
            <el-col :span="5" class="main-page-logo">
                <img src="@/assets/logo.jpg">
            </el-col>
            <el-col :span="19" class="main-page-bottom-header-menu">
                <div class="menu-grade">
                    <span>초1</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>초2</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>초3</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>초4</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>초5</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>초6</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>중1</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>중2</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>중3</span>
                </div>
                <div class="menu-chapter">
                    <div class="semester">
                        <el-select></el-select>
                    </div>
                    <div class="chapter">
                        <el-select></el-select>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "header.vue"
    }
</script>

<style scoped>
    .main-page-header {
        width: 100%;
        height: 241px;
    }
    .main-page-top-header {
        font-size: 12pt;
        font-family: "나눔스퀘어 Regular";
        width: 100%;
        margin-top: 20px;
        height: 20px;
    }
    .main-page-top-header-menu {
        float: right;
    }
    .main-page-bottom-header {
        position: absolute;
        margin-top: 110px;
        width: 912px;
        left: 50%;
        float: top;
        transform: translate(-50%, -50%)
    }
    .main-page-bottom-header-menu {
        font-size: 22pt;
        font-family: "나눔스퀘어 Regular";
        color: #000000;
        margin-top: 30px;
    }
    .menu-grade > span {
        margin-left: 10px;
        margin-right: 10px;
    }
    .menu-chapter > div{
        float: right;
        margin: 10px;
    }
    img {
    }
</style>