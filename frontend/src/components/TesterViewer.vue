<template>
    <div class="paper">
        <div class="paper-selector">
            <el-select v-model="value" placeholder="Select" @change="gradeChange" default-first-option>
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="unitValue" placeholder="Select" @change="unitChange" default-first-option>
                <el-option
                        v-for="item in unitOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="problemValue" placeholder="Select" @change="problemChange">
                <el-option
                        v-for="item in problemOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="normal">문제지</el-button>
            <el-button type="primary" @click="answer">답지</el-button>
        </div>
        <div class="paper-bound" :style="'.visibleMode{ visibility: hidden }'">
            <div class="paper-head">
                <div class="logo"></div>
                <div class="qrcode"></div>
                <div class="title">
                    <div class="grade">{{ this.grade }}</div>
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
                badge: String,
                options: [{
                    value: '1',
                    label: '1학년'
                }, {
                    value: '2',
                    label: '2학년'
                }, {
                    value: '3',
                    label: '3학년'
                }, {
                    value: '4',
                    label: '4학년'
                }, {
                    value: '5',
                    label: '5학년'
                }, {
                    value: '6',
                    label: '6학년'
                }],
                value: '1',
                unitOptions: [],
                unitValue: '1 3',
                problemOptions: [],
                problemValue: '1',
                semesterValue: '1',
                visibleMode: true
            }
        },
        created() {
            this.gradeChange();
        },
        mounted() {
            if (window.location.pathname === '/test') {
                this.$axios.get('/api/test')
                    .then((res) => {
                        this.controller = new Controller(res.data);

                        const inform = this.controller.inform;
                        this.grade = inform['grade'];
                        this.chapter = inform['chapter'];
                        this.chapter2 = inform['chapter2'];
                        this.chapter2Small = inform['chapter2_small'];
                        this.badge = inform['badge'];
                    })
            } else {
                this.unitValue = '1 3';
                this.unitChange();
                this.problemValue = 1;
                this.problemChange();
            }
        },
        methods: {
            gradeChange() {
                this.$axios.get(`/api/unit/${this.value}`)
                    .then((res) => {
                        this.unitOptions = [];
                        this.problemOptions = [];
                        this.unitValue = '';
                        this.problemValue = '';
                        for (const data of res.data) {
                            const temp = {
                                value: `${data.semester.replace('학기', '')} ${data.idunit}`,
                                label: `${data.semester} ${data.name}`,
                                semester: data.semester.replace('학기', '')
                            };
                            this.unitOptions.push(temp);
                        }
                    })
            },
            unitChange() {
                const semester = this.unitValue.split(' ')[0];
                const unit = this.unitValue.split(' ')[1];
                this.semesterValue = semester;
                this.$axios.get(`/api/problems/${this.value}/${semester}/${unit}`)
                    .then((res) => {
                        this.problemOptions = [];
                        this.problemValue = '';
                        for (const data of res.data) {
                            const temp = {
                                value: data.idproblem,
                                label: data.name
                            };
                            this.problemOptions.push(temp);
                        }
                    })
            },
            problemChange() {
                this.$axios.get(`/api/problem/${this.value}/${this.semesterValue}/${this.unitValue.split(' ')[1]}/${this.problemValue}`)
                    .then((res) => {
                        this.controller = new Controller(res.data, 0);

                        const inform = this.controller.inform;
                        this.grade = inform['grade'];
                        this.chapter = inform['chapter'];
                        this.chapter2 = inform['chapter2'];
                        this.chapter2Small = inform['chapter2_small'];
                        this.badge = inform['badge'];
                })
            },
            answer() {
                this.controller.rebuild(1);
            },
            normal() {
                this.controller.rebuild(0);
            }
        }
    }
</script>

<style>
    .visible-mode {
    }
    .paper-bound{
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