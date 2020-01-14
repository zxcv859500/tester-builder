import Vue from 'vue';
import Router from 'vue-router';
import Page from './components/Page';
import Login from './components/Login';
import MainImg from './components/main/main';
import TesterViewer from "./components/TesterViewer";

Vue.use(Router);

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            redirect: { path: '/home'},
            components: { default: Page },
            children: [
                { path: '/home', components: { default: MainImg } },
                { path: '/testviewer/:id', components: { default: TesterViewer }}
            ]
        },
        {
            path: '/login',
            name: 'Login',
            components: { default: Login }
        }
    ]
})