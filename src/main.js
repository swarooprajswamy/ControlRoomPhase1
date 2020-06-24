import Vue from 'vue';
import App from './App.vue';
import router from './script/router/index';
import Dashboard from './plugins/Dashboard';

Vue.config.productionTip = false
Vue.use(Dashboard);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
