// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Fullpage from './components/Fullpage.vue'
import Page1 from './components/Page1.vue'
// import App from './App'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    bgColor: ['#ffb6b9', '#fae3d9', '#bbded6', '#61c0bf'],
  },
  components: { Fullpage, Page1 },
  // template: '<App/>'
})
