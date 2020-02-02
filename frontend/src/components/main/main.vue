<template>
    <div class="main-page">
        <div class="main-page-img img-div">
            <img src="@/assets/아이연산.png">
        </div>
        <div class="main-footer">
            <div class="footer-container">
                <div class="footer-menu">
                    <div class="menu-container">
                        <div class="menu-understand-math img-menu">
                            <img class="astext" @click="goUnderstandMath" src="@/assets/이해수학.png">
                        </div>
                        <div class="menu-math-anxiety-test img-menu">
                            <img class="astext" src="@/assets/수학불안검사.png">
                        </div>
                        <div class="menu-qna img-menu">
                            <img class="astext" src="@/assets/질문답변큐앤톡.png">
                        </div>
                        <div class="menu-onschool img-menu">
                            <img class="astext" src="@/assets/실시간화상과외온스쿨.png">
                        </div>
                        <div class="menu-cafe img-menu">
                            <img class="astext" @click="openNaver" src="@/assets/네이버카페.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "header.vue",
        methods: {
            openNaver() {
                window.open("https://cafe.naver.com/m8760")
            },
            goUnderstandMath() {
                window.open("http://www.8760.co.kr")
            }
        }
    }
</script>

<style scoped>
    .main-page {
        width: auto;
    }
    .main-page-left-aside > div {
        float: top;
        left: 0;
    }
    .main-page > div {
        float: top;
    }
    .main-page-img > img {
        display: block;
    }


    .footer-menu {
        background-color: #ff915b;
        width: 874px;
        height: 120px;
        position: relative;
    }
    .footer-container {
        text-align: center;
    }
    .menu-container {
        width: 90%;
        margin: 0 auto;
        text-align: center;
        position: relative;
        left: 6.5%;
    }

    .footer-menu {
        overflow: hidden;
        margin: 0 auto;
    }

    .menu-container > div {
        float: left;
    }

    .main-footer {
        margin: 0 auto;
        width: 874px;
    }.astext {
         background:none;
         border:none;
         margin:0;
         padding:0;
         cursor: pointer;
     }
</style>