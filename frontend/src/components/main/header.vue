<template>
    <div class="main-page-header">
        <div class="main-page-top-header">
                <div class="main-page-top-header-menu">
                <span class="astext">공지사항</span>
                <el-divider direction="vertical"></el-divider>
                <span class="astext">로그인</span>
                <el-divider direction="vertical"></el-divider>
                <span class="astext">회원가입</span>
                <el-divider direction="vertical"></el-divider>
                <span class="astext">나의정보</span>
            </div>
        </div>
        <el-row class="main-page-bottom-header">
            <el-col :span="5" class="main-page-logo">
                <img src="@/assets/logo.jpg">
            </el-col>
            <el-col :span="19" class="main-page-bottom-header-menu">
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
                    <el-divider direction="vertical"></el-divider>
                    <span class="astext" @click="clickGrade('중1')">중1</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="astext" @click="clickGrade('중2')">중2</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="astext" @click="clickGrade('중3')">중3</span>
                </div>
                <div class="menu-chapter">
                    <div class="problem">
                        <el-select v-model="problemValue" placeholder="소단원" @change="changeProblem">
                            <el-option
                                    v-for="item in problemOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="chapter">
                        <el-select v-model="chapterValue" placeholder="대단원" @change="changeChapter">
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
            </el-col>
        </el-row>
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
                        this.chapterValue = '';
                        this.problemValue = '';
                        this.problemOptions = [];
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
            }
        },
        mounted() {
            this.clickGrade("초1");
        },
        computed: mapGetters({
            inform: "getState"
        })
    }
</script>

<style scoped>
    .main-page-header {
        width: 100%;
        height: 241px;
    }
    .main-page-top-header {
        font-size: 12pt;
        font-family: "나눔스퀘어 Regular";
        width: 100%;
        margin-top: 20px;
        height: 20px;
    }
    .main-page-top-header-menu {
        float: right;
        margin-right: 30px;
    }
    .main-page-bottom-header {
        position: absolute;
        margin-top: 110px;
        width: 912px;
        left: 50%;
        float: top;
        transform: translate(-50%, -50%)
    }
    .main-page-bottom-header-menu {
        font-size: 22pt;
        font-family: "나눔스퀘어 Regular";
        color: #000000;
        margin-top: 30px;
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