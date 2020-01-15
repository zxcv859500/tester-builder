<template>
    <div class="paper">
        <div class="paper-bound" :style="'.visibleMode{ visibility: hidden }'">
            <div class="paper-head">
                <div class="logo"></div>
                <div class="qrcode">
                    <qrcode-vue :value="currentUrl" size="92" level="L"></qrcode-vue>
                </div>
                <div class="title">
                    <div class="top">
                        <div class="grade">{{ this.grade }}</div>
                        <div class="id">문제지번호 {{ this.$route.params.id }}</div>
                    </div>
                    <div class="chapter">{{ this.chapter }}</div>
                    <div class="chapter2">{{ this.chapter2 }}
                        <small>{{ this.chapter2Small }}</small>
                        <span class="badge" v-if="this.badge !== ''">{{ this.badge }}</span>
                    </div>
                </div>
            </div>
            <div v-html="controller.template"></div>
        </div>
    </div>
</template>

<script>
    import Controller from '@/controller/';
    import { mapGetters } from 'vuex';
    import QrcodeVue from 'qrcode.vue';

    export default {
        name: "TesterViewer",
        components: {
            QrcodeVue
        },
        data() {
            return {
                controller: null,
                grade: String,
                chapter: String,
                chapter2: String,
                chapter2Small: String,
                badge: String,
                visibleMode: true,
                currentUrl: ''
            }
        },
        created() {
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            answer() {
                this.controller.rebuild(1);
            },
            normal() {
                this.controller.rebuild(0);
            },
            fetchData() {
                this.$axios.get(`/api/problem/${this.$route.params.id}`)
                    .then((result) => {
                        this.currentUrl = window.location.href;
                        const compJson = JSON.parse(result.data.compJson[0]);
                        let varsJsons = [];
                        for (const varsJson of result.data.varsJsons) {
                            varsJsons.push({
                                    "json": JSON.parse(varsJson['json']),
                                    "number": varsJson['number']
                                }
                            );
                        }
                        this.controller = new Controller(compJson, varsJsons, 0);

                        const inform = this.controller.inform;
                        this.grade = inform['grade'];
                        this.chapter = inform['chapter'];
                        this.chapter2 = inform['chapter2'];
                        this.chapter2Small = inform['chapter2_small'];
                        this.badge = inform['badge'];
                    })
            }
        },
        watch: {
            '$route': 'fetchData'
        },
        computed: mapGetters({
            inform: "getState"
        })
    }
</script>

<style>
    .paper {
        width: 800px;
        height: 1123px;
    }
    .paper-bound{
        font-family: "나눔스퀘어라운드 ExtraBold";
        font-size: 20px;
        text-align: left;
    }
    .paper-bound {
        border: 3px solid #dddddd;
        width: 210mm;
        height: 290mm;
        margin: 0 auto 20px;
        position: relative;
        float: top;
    }
    .paper-head {
        height: 92px;
        overflow: hidden;
        border: 1px solid #333333;
    }
    .paper-head .logo {
        width: 128px;
        height: 92px;
        float: left;
        color: black;
        background-color: white;
        border-right: 1px solid #333333;
        text-align: center;
    }
    .paper-head .title {
        margin: 0px 92px 0px 130px;
        height: 92px;
        padding: 0px;
        position: relative;
        white-space: nowrap;
    }
    .paper-head .qrcode {
        float: right;
        border-left: 1px solid #333;
        width: 92px;
        height: 92px;
    }
    .id {
        float: right;
        position: relative;
        bottom: 30px;
        font-size: 10pt;
        margin-right: 5px;
    }
    .title {
        font-family: "나눔스퀘어라운드";
    }
    .title div.grade {
        font-size: 15px;
        line-height: 26px;
        width: 130px;
        font-family: inherit;
        margin: 5px;
    }
    .title div.chapter {
        font-size: 24px;
        line-height: 26px;
        font-family: inherit;
    }
    .title div.chapter2 {
        font-size: 17px;
        line-height: 26px;
        font-family: inherit;
    }
    .title div.chapter2 small {
        font-size: 12px;
        font-family: inherit;
    }
    .badge {
        padding: 2px 14px 3px;
        border-radius: 9px;
        font-size: 11px;
        font-weight: bold;
        line-height: 14px;
        color: #fff;
        text-shadow: 0 -1px 0 rgba(0,0,0,0.25);
        white-space: nowrap;
        vertical-align: baseline;
        background-color: #999;
        margin-left: 5px;
    }
</style>