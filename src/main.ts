import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import axios from 'axios'
import VueAxios from 'vue-axios'

import * as _ from 'lodash';

import VueAuth from '@websanova/vue-auth'
import environment from './environments/environment';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.router = router;
Vue.axios.defaults.baseURL = <string>process.env.VUE_APP_API_BASE;

Vue.use(VueAuth, {
    auth: require('@websanova/vue-auth/drivers/auth/devise.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    loginData: {url: 'auth/sign_in', method: 'POST', redirect: '/', fetchUser: true},
    registerData: {url: 'auth', method: 'POST', redirect: '/login'},
    refreshData: {url: 'auth/validate_token', method: 'GET', enabled: true, interval: 0},
    fetchData: {
      url: 'me',
      method: 'GET',
      enabled: true,
      success: () => {
        let user: any = {};
        const authUser = Vue.auth.user();

        for (let key in authUser) {
            user[_.camelCase(key)] = authUser[key];
        }
        store.commit('meState/setMe', user);
      },
    }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
