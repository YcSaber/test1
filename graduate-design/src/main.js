import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false
Vue.use(infiniteScroll)
Vue.use(VueLazyLoad,{
  loading:'/static/loading-svg/loading-bars.svg'
})
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
