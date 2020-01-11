<template>
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
</template>

<script>
    export default {
        name: "footer"
    }
</script>

<style scoped>
    .main-footer {
        margin: 0 auto;
        width: 1305px;
    }
    .main-footer-top {
        width: auto;
        height: auto;
        background-color: #ff915b;
    }
    .footer-menu {
        width: auto;
        height: auto;
        overflow: hidden;
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