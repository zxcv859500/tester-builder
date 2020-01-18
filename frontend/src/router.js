import Vue from 'vue';
import Router from 'vue-router';
import Page from './components/Page';
import Login from './components/Login';
import MainImg from './components/main/main';
import TesterViewer from "./components/TesterViewer";
import Home from "./components/main/home";
import Editor from './components/article/editor';
import list from './components/article/list';
import ArticleViewer from "./components/article/ArticleViewer";

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
                {
                    path: '/home',
                    components: { default: Home },
                    children: [
                        {
                            path: '/',
                            components: { default: MainImg }
                        },
                        {
                            path: '/testviewer/:id',
                            components: { default: TesterViewer }
                        }
                    ]
                },
                {
                    path: "/notice",
                    name: "NoticeList",
                    components: { default : list }
                },
                {
                    path: '/notice/write',
                    name: "NoticeWrite",
                    components: { default: Editor }
                },
                {
                    path: '/article/:id',
                    name: "Article",
                    components: { default: ArticleViewer }
                },
                {
                    path: "/question",
                    name: "QuestionList",
                    components: { default: list }
                },
                {
                    path: "/question/write",
                    name: "QuestionWrite",
                    components: { default: Editor }
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            components: { default: Login }
        }
    ]
})