import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import(/* webpackChunkName: "about" */ './views/Projects.vue'),
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import(/* webpackChunkName: "about" */ './views/Project.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "about" */ './views/Users.vue'),
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import(/* webpackChunkName: "about" */ './views/User.vue'),
    },
    {
      path: '/me',
      meta: { auth: true },
      component: () => import(/* webpackChunkName: "about" */ './views/MeLayout.vue'),
      children: [
        {
          path: '',
          name: 'me',
          component: () => import(/* webpackChunkName: "about" */ './views/me/Profile.vue'),
        },
        {
          path: 'projects',
          name: 'my_projects',
          component: () => import(/* webpackChunkName: "about" */ './views/me/Projects.vue'),
        },
        {
          path: 'project/:id',
          name: 'my_project',
          component: () => import(/* webpackChunkName: "about" */ './views/me/Project.vue'),
        },
        {
          path: 'chat',
          name: 'chat',
          component: () => import(/* webpackChunkName: "about" */ './views/me/Inbox.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "about" */ './views/Test.vue'),
    },
  ],
});
