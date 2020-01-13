<template>
    <div class="login-main">
        <div class="container">
            <div class="login-box">
                <div class="logo">
                    <router-link to="/"><img src="@/assets/logo.jpg"></router-link>
                </div>
                <el-input placeholder="아이디" v-model="form.account" style="margin-bottom: 10px"></el-input>
                <el-input placeholder="비밀번호" v-model="form.password" style="margin-bottom: 10px"></el-input>
                <el-button type="primary" style="width:100%; margin-bottom: 10px;">로그인</el-button>
                <el-button style="width:100%; margin-left: 0px">회원가입</el-button>
                <el-divider></el-divider>
                <div class="find">
                    <el-button type="text">아이디 찾기</el-button>
                    <el-button type="text">비밀번호 찾기</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    account: '',
                    password: ''
                }
            }
        },
        methods: {
            goHome() {

            }
        }
    }
</script>

<style scoped>
    .login-main {
        width: 100%;
        height: 100%;
        position: relative;
        text-align: center;
    }
    .container {
        width: 1170px;
        margin: 0 auto;
        display: inline-block;
    }
    .logo {
        -webkit-transform: scale(0.67); /* Saf3.1+, Chrome */
        -moz-transform: scale(0.67); /* FF3.5+ */
        -ms-transform: scale(0.67); /* IE9 */
        -o-transform: scale(0.67); /* Opera 10.5+ */
        transform: scale(0.67);
    }
    .login-box {
        margin: 30px auto;
        display: inline-block;
        width: 400px;
        text-align: center;
        background-color: white;
        padding: 30px 15px 100px;
        border: 1px solid #e4e4e5;
    }
    .login-box > div {
        margin: 0 auto;
        display: inline-block;
    }
    .el_input > input{
        margin-left: 0;
    }
</style>