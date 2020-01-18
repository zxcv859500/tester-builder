import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        grade: 1,
        semester: 1,
        chapter: '',
        problem: '',
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        mode: 0,
        problemRand: 0
    },
    getters: {
        getState (state) {
            return {
                grade: state.grade,
                semester: state.semester,
                chapter: state.chapter,
                problem: state.problem
            }
        },
        getToken(state) {
            state.token = localStorage.getItem('token');
            return state.token;
        },
        getUsername(state) {
            state.username = localStorage.getItem('username');
            return state.username;
        },
        getMode(state) {
            return state.mode;
        },
        getProblemRand(state) {
            return state.problemRand;
        }
    },
    mutations: {
        setGrade (state, payload) { state.grade = payload.grade },
        setSemester (state, payload) { state.semester = payload.semester },
        setChapter (state, payload) { state.chapter = payload.chapter },
        setProblem (state, payload) { state.problem = payload.problem },
        setToken (state, payload) {
            localStorage.setItem('token', payload.token);
            localStorage.setItem('username', payload.username);
            state.token = localStorage.getItem('token');
            state.username = localStorage.getItem('username');
        },
        delToken (state) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            state.token = null;
            state.username = null;
        },
        setMode(state, payload) {
            state.mode = payload.mode;
        },
        setProblemRand(state, payload) {
            state.problemRand = payload.problemRand;
        }
    }
});

export default store;