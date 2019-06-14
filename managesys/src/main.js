// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


// axios
// import axios from 'axios'
// Vue.prototype.$axios = axios;

// 公共组件
import commonCom from './components/common'
for(var i in commonCom){
  Vue.component(i,commonCom[i])
}
// filter
import filter from './filter'
for(var i in filter){
  Vue.filter(i,filter[i])
}


// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// jquery
import $ from 'jquery'
Vue.prototype.$=$

// evenBus
Vue.prototype.ev = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
