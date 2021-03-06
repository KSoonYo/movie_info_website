import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// vue-scroll
import vuescroll from 'vuescroll';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VModal, { dynamic: true })
Vue.use(vuescroll);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
