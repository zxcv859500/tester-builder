<template>
    <div class="main-page-header">
        <div class="main-page-top-header">
                <div class="container">
                    <div class="main-page-top-header-menu">
                    <span class="astext" @click="goNotice()">공지사항</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="astext" @click="goLogin()">{{this.token ? '로그아웃' :'로그인'}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="astext" v-if="this.token === '' || this.token === null">회원가입</span>
                    <span class="astext" v-if="this.token !== '' && this.token !== null">나의정보</span>
                </div>
            </div>
        </div>
        <div class="main-page-bottom-header">
            <div class="wrapper">
                <div class="main-page-logo img-div">
                    <router-link to="/home"><img src="@/assets/메인로고.jpg"></router-link>
                </div>
                <div class="main-page-bottom-header-menu">
                    <div class="menu-grade">
                        <span class="astext" @click="clickGrade('초1')">초1</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="astext" @click="clickGrade('초2')">초2</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="astext" @click="clickGrade('초3')">초3</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="astext" @click="clickGrade('초4')">초4</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="astext" @click="clickGrade('초5')">초5</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="astext" @click="clickGrade('초6')">초6</span>
                        <!-- <el-divider direction="vertical"></el-divider>
                        <span class="astext" @click="clickGrade('중1')">중1</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="astext" @click="clickGrade('중2')">중2</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="astext" @click="clickGrade('중3')">중3</span> -->
                    </div>
                    <div class="menu-chapter">
                        <div class="problem">
                            <el-select v-model="problemValue"
                                       placeholder="소단원"
                                       @change="changeProblem"
                                       size="small">
                                <el-option
                                        v-for="item in problemOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="chapter">
                            <el-select
                                    v-model="chapterValue"
                                    placeholder="대단원"
                                    @change="changeChapter"
                                    size="small">
                                <el-option-group
                                        v-for="group in chapterOptions"
                                        :key="group.label"
                                        :label="group.label">
                                    <el-option
                                            v-for="item in group.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "header.vue",
        data() {
          return {
              chapterValue: '',
              chapterOptions: [],
              problemValue: '',
              problemOptions: []
          }
        },
        methods: {
            clickGrade(gradeString) {
                let grade;
                if (gradeString.indexOf('초') !== -1) {
                    grade = gradeString.replace('초', '');
                } else {
                    grade = Number(gradeString.replace('중', '')) + 6;
                }

                this.$store.commit('setGrade', {
                    grade: grade
                });

                this.$axios.get(`/api/chapter/${this.inform.grade}`)
                    .then((result) => {
                        this.chapterOptions = [
                            {
                                label: "1학기",
                                options: []
                            },
                            {
                                label: "2학기",
                                options: []
                            }
                        ];
                        for (const data of result.data) {
                            const temp = {
                                value: `${data.semester} ${data.idchapter}`,
                                label: `${data.semester} ${data.name}`
                            };
                            if (data.semester.indexOf("1") !== -1) this.chapterOptions[0]['options'].push(temp);
                            else this.chapterOptions[1]['options'].push(temp);
                        }
                        this.chapterValue = this.chapterOptions[0]['options'][0].value;
                        this.problemValue = '';
                        this.problemOptions = [];

                        this.changeChapter();
                    })
            },
            changeChapter() {
                const semester = this.chapterValue.split('학기')[0],
                    chapter = this.chapterValue.split(' ')[1];
                this.$store.commit('setSemester',
                    {
                        semester: semester
                    });
                this.$store.commit('setChapter',
                    {
                        chapter: chapter
                    });
                this.$axios.get(`/api/problems/${this.inform.grade}/${this.inform.semester}/${this.inform.chapter}`)
                    .then((result) => {
                        this.problemOptions = [];
                        this.problemValue = '';
                        for (const data of result.data) {
                            const temp = {
                                value: data.idproblem,
                                label: data.name
                            };
                            this.problemOptions.push(temp);
                        }
                    })
            },
            changeProblem() {
                this.$store.commit('setProblem',
                    {
                        problem: this.problemValue
                });
                const { grade, semester, chapter, problem } = this.inform;
                const problemId = `${grade}${semester}${chapter}${problem}`;
                this.$axios.get(`/api/make/${grade}/${semester}/${chapter}/${problem}`);
                this.$axios.get(`/api/problemId/${problemId}`)
                    .then((result) => {
                        this.$router.push(`/testviewer/${result.data.problemId}`).catch(() => {})
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            goLogin() {
                if (this.token) {
                    this.$store.commit('delToken');
                    this.$axios.defaults.headers.common['x-access-token'] = undefined;
                    this.$router.push('/home').catch(()=> {});
                } else {
                    this.$router.push('/login').catch(()=> {});
                }
            },
            goNotice() {
                this.$router.push('/notice').catch(()=> {});
            }
        },
        mounted() {
            this.clickGrade("초1");
        },
        computed: mapGetters({
            inform: "getState",
            token: "getToken"
        })
    }
</script>

<style scoped>
    .main-page-header {
        height: 180px;
        margin: 0 auto;
        min-width: 1400px;
        text-align: center;
    }
    .main-page-top-header {
        font-size: 10pt;
        font-family: "나눔스퀘어 Regular";
        margin: 0px auto;
        padding-top: 20px;
        height: 20px;
        max-width: 1400px;
        text-align: center;
    }
    .container {
        margin: 0 auto;
        width: 63%;
        min-width: 880px;
    }
    .main-page-top-header-menu{
        float: right;
        min-width: 275px;
    }
    .main-page-bottom-header {
        display:inline-block;
        text-align: center;
        max-width: 1400px;
        margin: 0 auto;
    }
    .main-page-bottom-header-menu {
        font-size: 15pt;
        margin-left: 100px;
        font-family: "나눔스퀘어 Regular";
        color: #000000;
        margin-top: 40px;
    }
    .wrapper {
        margin: 0 auto;
        width: 900px;
    }
    .main-page-logo {
        float: left;
        display: inline-block;
    }
    .main-page-bottom-header-menu {
        display: inline-block;
        float: right;
    }
    .main-page-bottom-header-menu > div {
        float: top;
    }
    .menu-grade {
        float: right;
    }
    .menu-grade > span {
        margin-left: 10px;
        margin-right: 10px;
    }
    .menu-chapter > div{
        float: right;
        margin: 10px;
    }
    .astext {
        background:none;
        border:none;
        margin:0;
        padding:0;
        cursor: pointer;
    }
</style>