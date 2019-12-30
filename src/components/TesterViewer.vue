<template>
    <div class="paper-bound">
        <div class="paper-head">
            <div class="logo"></div>
            <div class="qrcode"></div>
            <div class="title">
                <div class="grade">{{ this.grade }}</div>
                <div class="chapter">{{ this.chapter }}</div>
                <div class="chapter2">{{ this.chapter2 }}
                    <small>{{ this.chapter2Small }}</small>
                    <span class="badge">{{ this.badge }}</span>
                </div>
            </div>
        </div>
        <div  v-html="controller.template"></div>
    </div>
</template>

<script>
    import Controller from '@/controller/'

    export default {
        name: "TesterViewer",
        data() {
            return {
                controller: null,
                grade: String,
                chapter: String,
                chapter2: String,
                chapter2Small: String,
                badge: String
            }
        },
        mounted() {
            this.$axios.get('/api')
                .then((res) => {
                    this.controller = new Controller(res.data);

                    const inform = this.controller.inform;
                    this.grade = inform['grade'];
                    this.chapter = inform['chapter'];
                    this.chapter2 = inform['chapter2'];
                    this.chapter2Small = inform['chapter2_small'];
                    this.badge = inform['badge'];
                })
        }
    }
</script>

<style scoped>
    *{
        font-family: "나눔스퀘어라운드 ExtraBold";
        font-size: 30px;
    }
    .paper-bound {
        border: 3px solid #dddddd;
        width: 315mm;
        height: 435mm;
        margin: 0 auto 20px;
        position: relative;
        float: top;
    }
    .paper-head {
        height: 138px;
        overflow: hidden;
        border: 1px solid #333333;
    }
    .paper-head .logo {
        width: 193px;
        height: 138px;
        padding-top: 10px;
        float: left;
        color: black;
        background-color: white;
        border-right: 1px solid #333333;
        text-align: center;
    }
    .paper-head .title {
        margin: 0px 138px 0px 195px;
        height: 138px;
        padding: 0px;
        position: relative;
        white-space: nowrap;
    }
    .paper-head .qrcode {
        float: right;
        border-left: 1px solid #333;
        width: 138px;
        height: 138px;
    }
    .title {
        font-family: "나눔스퀘어라운드";
    }
    .title div.grade {
        font-size: 22px;
        line-height: 39px;
        width: 195px;
        font-family: inherit;
        margin: 5px;
    }
    .title div.chapter {
        font-size: 36px;
        line-height: 39px;
        font-family: inherit;
    }
    .title div.chapter2 {
        font-size: 25px;
        line-height: 39px;
        font-family: inherit;
    }
    .title div.chapter2 small {
        font-size: 18px;
        font-family: inherit;
    }
    .badge {
        padding: 2px 14px 3px;
        border-radius: 9px;
        font-size: 17px;
        font-weight: bold;
        line-height: 21px;
        color: #fff;
        text-shadow: 0 -1px 0 rgba(0,0,0,0.25);
        white-space: nowrap;
        vertical-align: baseline;
        background-color: #999;
        margin-left: 5px;
    }
</style>