import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        grade: 1,
        semester: 1,
        chapter: '',
        problem: '',
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        userId: localStorage.getItem('userId'),
        mode: 0,
        problemRand: 0,
        printState: 0,
        totalCount: 0
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
        getUserId(state) {
            state.userId = localStorage.getItem('userId');
            return state.userId;
        },
        getMode(state) {
            return state.mode;
        },
        getProblemRand(state) {
            return state.problemRand;
        },
        getPrintState(state) {
            return state.printState;
        },
        getTotalCount(state) {
            return state.totalCount;
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
            localStorage.setItem('userId', payload.userId);
            state.token = localStorage.getItem('token');
            state.username = localStorage.getItem('username');
            state.userId = localStorage.getItem('userId');
        },
        delToken (state) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            state.token = null;
            state.username = null;
            state.userId = null;
        },
        setMode(state, payload) {
            state.mode = payload.mode;
        },
        setProblemRand(state, payload) {
            state.problemRand = payload.problemRand;
        },
        setPrintState(state, payload) {
            state.printState = payload.printState;
        },
        setTotalCount(state) {
            axios.get('/api/count')
                .then((result) => {
                    state.totalCount = result.data.cnt;
                    state.totalCount = state.totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    state.totalCount += "명";
                });
        }
    }
});

export default store;