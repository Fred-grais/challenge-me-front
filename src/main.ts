import './class-component-hooks';

import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store/index';
import axios from 'axios';
import VueAxios from 'vue-axios';

import camelCase from 'lodash/camelCase';

import VueAuth from '@websanova/vue-auth';
import VeeValidate from 'vee-validate';
import twitter from 'vue-twitter';
import Vuetify from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify, {
  iconfont: 'mdi',
});
Vue.use(VeeValidate, {
  delay: 1,
  errorBagName: 'veeErrors',
});

Vue.use(twitter);

Vue.config.productionTip = false;

// Need to pass an independant axios instance because the auth library
// set up some interceptor on it in order to add auth tokens to calls
Vue.use(VueAxios, axios.create());
Vue.router = router;
Vue.axios.defaults.baseURL = process.env.VUE_APP_API_BASE as string;

Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/devise.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {
    url: 'auth/sign_in',
    method: 'POST',
    redirect: '/',
    fetchUser: true,
  },
  registerData: { url: 'auth', method: 'POST', redirect: '/login' },
  refreshData: {
    url: 'auth/validate_token',
    method: 'GET',
    enabled: true,
    interval: 0,
  },
  fetchData: {
    url: 'me',
    method: 'GET',
    enabled: true,
    success: () => {
      const user: any = {};
      const authUser = Vue.auth.user();

      store.commit('meState/setMe', authUser);
      store.commit('meState/setFetching', false);
    },
  },
});

// Vue Bootstrap
// Vue.use(BootstrapVue);
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
// import '../public/assets/mobirise/css/mbr-additional.css';
//////////////////
import 'vuetify/dist/vuetify.min.css';
import '@/assets/stylesheets/global/index.scss';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
