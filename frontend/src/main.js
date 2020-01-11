import Vue from 'vue'
import './plugins/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
