import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import VueStateValidator from '../../../dist/index';

Vue.config.productionTip = false

Vue.use(VueStateValidator)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')