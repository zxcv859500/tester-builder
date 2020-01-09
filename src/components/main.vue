<template>
    <div class="main-page">
        <div class="main-page-left-aside">
            <div class="aside-first"></div>
            <div class="aside-second"></div>
            <div class="aside-third"></div>
        </div>
        <div class="main-page-img">
            <img src="@/assets/mainImg.png">
        </div>
        <div class="main-page-right-aside">
            <div class="menu-first">
                <img src="@/assets/menu1.jpg">
            </div>
            <div class="menu-second">
                <img src="@/assets/menu2.jpg">
            </div>
            <div class="menu-third">
                <img src="@/assets/menu3.jpg">
            </div>
            <div class="menu-fourth">
                <img src="@/assets/menu4.jpg">
            </div>
            <div class="menu-fifth">
                <img src="@/assets/menu5.jpg">
            </div>
            <div class="menu-sixth">
                <img src="@/assets/menu6.jpg">
            </div>
            <div class="menu-seventh">
                <img src="@/assets/menu7.jpg">
            </div>
            <div class="menu-eighth">
                <img src="@/assets/menu8.jpg">
            </div>
            <div class="menu-ninth">
                <img src="@/assets/menu9.jpg">
            </div>
            <div class="menu-tenth">
                <img src="@/assets/menu10.jpg">
            </div>
        </div>
        <div class="main-footer">
            <div class="main-footer-top">
                <div class="footer-menu">
                    <div class="menu-back">
                        <img src="@/assets/menu_back.jpg">
                    </div>
                    <div class="menu-first">
                        <img src="@/assets/이해수학.jpg">
                    </div>
                    <div class="menu-second">
                        <img src="@/assets/수학불안검사.jpg">
                    </div>
                    <div class="menu-third">
                        <img src="@/assets/질문답변큐앤톡.jpg">
                    </div>
                    <div class="menu-fourth">
                        <img src="@/assets/실시간화상과외온스쿨.jpg">
                    </div>
                    <div class="menu-fifth">
                        <img src="@/assets/네이버카페.jpg">
                    </div>
                    <div class="menu-front">
                        <img src="@/assets/menu_front.jpg">
                    </div>
                </div>
            </div>
            <div class="main-footer-bottom">
                <img src="@/assets/footer.jpg">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "header.vue"
    }
</script>

<style scoped>
    .main-page {
        margin-top: 220px;
        width: 1887px;
    }
    .main-page-left-aside > div {
        float: top;
        left: 0;
    }
    .main-page > div {
        float: left;
    }
    .aside-first {
        width: 253px;
        height: 520px;
        background-color: #cfa972;
    }
    .aside-second {
        width: 253px;
        height: 230px;
    }
    .aside-third {
        background-color: #333333;
        width: 253px;
        height: 230px;
    }
    .main-page-img > img {
        display: block;
    }
    .main-page-right-aside > div > img {
        display: block;
    }
    .main-footer {
        margin-left: 253px;
        margin-right: 253px;
        float: bottom;
    }
    .main-footer-top {
        background-color: #ff915b;
        width: 1305px;
        height: 162px;
    }
    .footer-menu > div {
        float: left;
        margin-left: 40px;
        margin-right: 40px;
    }
    .footer-menu > .menu-back {
        margin-left: 10px;
        margin-top: 60px;
    }
    .footer-menu > .menu-front {
        margin-top: 60px;
        margin-left: 63px;
        margin-right: 10px;
    }
    .footer-menu > div > img  {
        display: block;
    }
</style>