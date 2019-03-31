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
      component: () => import('./views/About.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./views/Projects.vue'),
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('./views/Project.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./views/Users.vue'),
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('./views/User.vue'),
    },
    {
      path: '/me',
      meta: { auth: true },
      component: () => import('./views/MeLayout.vue'),
      children: [
        {
          path: '',
          name: 'me',
          component: () => import('./views/me/Profile.vue'),
        },
        {
          path: 'projects',
          name: 'my_projects',
          component: () => import('./views/me/Projects.vue'),
        },
        {
          path: 'project/:id',
          name: 'my_project',
          component: () => import('./views/me/Project.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/Test.vue'),
    },
  ],
});
