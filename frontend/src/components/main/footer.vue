<template>
    <div class="main-footer">
        <div class="main-footer-top">
            <div class="container">
                <div class="footer-menu">
                    <div class="menu-back">
                        <img src="@/assets/뒤.png">
                    </div>
                    <div class="menu-container">
                        <div class="menu-understand-math img-menu">
                            <img src="@/assets/이해수학.png">
                        </div>
                        <div class="menu-math-anxiety-test img-menu">
                            <img src="@/assets/수학불안검사.png">
                        </div>
                        <div class="menu-qna img-menu">
                            <img src="@/assets/질문답변큐앤톡.png">
                        </div>
                        <div class="menu-onschool img-menu">
                            <img src="@/assets/실시간화상과외온스쿨.png">
                        </div>
                        <div class="menu-cafe img-menu">
                            <img src="@/assets/네이버카페.png">
                        </div>
                    </div>
                    <div class="menu-front">
                        <img src="@/assets/앞.png">
                    </div>
                </div>
                <div class="main-footer-bottom">
                    <img src="@/assets/아래.jpg">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "footer"
    }
</script>

<style scoped>
    .main-footer {
        margin: 0 auto;
        width: 100%;
    }
    .main-footer-top {
    }
    .footer-menu {
        overflow: hidden;
        margin: 0 auto;
    }
    .footer-menu > .menu-back {
    }
    .footer-menu > .menu-front {
    }
    .footer-menu > div > img  {
        display: block;
    }
    .footer-menu {
        background-color: #ff915b;
        width: 874px;
        height: 120px;
        position: relative;
        left: 2.4%;
    }
    .container {
        width: 41.7%;
        text-align: center;
        margin: 0 auto;
        min-width: 1640px;
    }
    .menu-back {
        width: 28px;
        height: 27px;
        display: inline-block;
        float: left;
        position: relative;
        top: 35%;
        margin-left: 15px;
    }
    .menu-container {
        width: 90%;
        margin: 0 auto;
        text-align: center;
        position: relative;
        left: 6.5%;
    }
    .menu-container > div {
        float: left;
    }
    .menu-front {
        width: 28px;
        height: 27px;
        display: inline-block;
        float: right;
        position: relative;
        top: 35%;
        margin-right: 15px;
    }
</style>