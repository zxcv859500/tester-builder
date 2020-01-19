<template>
    <div class="main-footer">
        <div class="main-footer-bottom">
            <div class="img-container">
                <img src="@/assets/footer_logo.png">
            </div>
            <div class="desc-span">
                <p class="desc">㈜에듀8760｜사업자등록번호:737-88-00944｜통신판매업신고:제2018-서울강남-03152</p>
                <p class="desc2">문의전화:070-4709-8760 | 서울 강남구 테헤란로 82길 15 (대치동)</p>
                <p class="desc3">Copyright Edu8760 Corp. All rights reserved. 개인정보취급방침 및 이용약관</p>
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
    @import url(https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css);

    .main-footer-bottom {
        margin: 0 auto;
        display: inline-block;
        width: 875px;
        height: 256px;
    }
    img {
        display: inline-block;
    }
    .main-footer {
        width: 1400px;
        margin: 0 auto;
        text-align: center;
    }
    .main-footer-bottom {
        font-family: 'NanumSquare';
        font-size: 13pt;
        text-align: left;
        margin-top: 100px;
    }
    .img-container {
        height: 100px;
        display: inline-block;
        margin-left: 75px;
    }
    .main-footer-bottom > div > img {
        float: left;
        margin-top: 25px;
    }
    .desc-span{
        float: right;
        margin-right: 50px;
    }
</style>