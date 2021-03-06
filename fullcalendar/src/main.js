// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FullCalendar from 'vue-full-calendar'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'

Vue.config.productionTip = false
Vue.use(FullCalendar)
Vue.use(ElementUI);
/* eslint-disable no-new */
window.a=new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
