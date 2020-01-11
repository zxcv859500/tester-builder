import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        grade: 1,
        semester: 1,
        chapter: '',
        problem: ''
    },
    getters: {
        getState (state) {
            return {
                grade: state.grade,
                semester: state.semester,
                chapter: state.chapter,
                problem: state.problem
            }
        }
    },
    mutations: {
        setGrade (state, payload) { state.grade = payload.grade },
        setSemester (state, payload) { state.semester = payload.semester },
        setChapter (state, payload) { state.chapter = payload.chapter },
        setProblem (state, payload) { state.problem = payload.problem }
    }

});

export default store;