import Vue from 'vue';
import Router from 'vue-router';
import Page from './components/Page';
import Login from './components/Login';

Vue.use(Router);

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: { name: 'Home' }
        },
        {
            path: '/home',
            name: 'Home',
            components: { default: Page }
        },
        {
            path: '/login',
            name: 'Login',
            components: { default: Login }
        }
    ]
})