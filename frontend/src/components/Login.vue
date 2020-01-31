<template>
    <div class="login-main">
        <div class="container">
            <div class="login-box">
                <div class="logo">
                    <router-link to="/"><img src="@/assets/로고.png"></router-link>
                </div>
                <el-input placeholder="아이디" v-model="form.username" @keyup.enter.native="login" style="margin-bottom: 10px"></el-input>
                <el-input placeholder="비밀번호" v-model="form.password" @keyup.enter.native="login" style="margin-bottom: 10px" show-password></el-input>
                <el-button type="primary" style="width:100%; margin-bottom: 10px;" @click="login">로그인</el-button>
                <el-button style="width:100%; margin-left: 0px">회원가입</el-button>
                <el-divider></el-divider>
                <div class="find">
                    <!--el-button type="text">아이디 찾기</el-button-->
                    <!--el-button type="text">비밀번호 찾기</el-button-->
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
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                const regExpId = /^[0-9a-z]+$/;
                // eslint-disable-next-line no-useless-escape
                const regExpPw = /(?=.*\d{1,50})(?=.*[a-zA-Z]{2,50}).{1,50}$/;
                // eslint-disable-next-line no-useless-escape
                const regExpEm = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

                if (!regExpId.test(this.form.username) && !regExpEm.test(this.form.username)) {
                    alert("올바르지 않은 이메일 형식입니다.");
                } else if (!regExpPw.test(this.form.password)) {
                    alert("올바르지 않은 비밀번호 형식입니다.");
                } else {
                    this.$axios.post('/api/auth/login', this.form)
                        .then((result) => {
                            this.$store.commit('setToken', { token: result.data.token, username: result.data.username, userId: result.data.userId });
                            this.$axios.defaults.headers.common['x-access-token'] = result.data.token;
                            this.$router.push('/home');
                        })
                        .catch(() => {
                            alert("이메일 혹은 비밀번호가 잘못되었습니다.")
                        })
                }
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
