import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TRTC from 'trtc-js-sdk'
import '@/utils/aegis.js';
import { isMobile } from '@/utils/utils';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vconsole from 'vconsole';
const vConsole = new Vconsole()
Vue.use(vConsole)

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$isMobile = isMobile;

TRTC.Logger.setLogLevel(TRTC.Logger.LogLevel.DEBUG);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
