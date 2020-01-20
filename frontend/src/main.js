import Vue from 'vue'
import './plugins/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App.vue'
import store from './store/index'
import router from './router'

Vue.use(ElementUI, {locale})
Vue.config.productionTip = false
Vue.config.silent = true

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
