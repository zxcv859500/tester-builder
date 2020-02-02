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
import VideoEditor from "./components/video/VideoEditor";
import VideoViewer from "./components/video/VideoViewer";
import Score from "./components/score/score";

Vue.use(Router);

export default new Router({
    base: process.env.BASE_URL,
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            redirect: { path: '/'},
            components: { default: Page },
            children: [
                {
                    path: '/',
                    components: { default: Home },
                    children: [
                        {
                            path: '/',
                            components: { default: MainImg }
                        },
                        {
                            path: '/score',
                            components: { default: Score }
                        },
                        {
                            path: '/testviewer/:id',
                            components: { default: TesterViewer }
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
                            path: '/notice/edit/:id',
                            name: "NoticeEdit",
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
                        },
                        {
                            path: "/question/edit/:id",
                            name: "QuestionEdit",
                            components: { default: Editor }
                        },
                        {
                            path: "/video",
                            name: "VideoList",
                            components: { default: list }
                        },
                        {
                            path: "/video/write",
                            name: "VideoWrite",
                            components: { default: VideoEditor }
                        },
                        {
                            path: "/video/:id",
                            name: "Video",
                            components: { default: VideoViewer }
                        }
                    ]
                },
            ]
        },
        {
            path: '/login',
            name: 'Login',
            components: { default: Login }
        }
    ]
})