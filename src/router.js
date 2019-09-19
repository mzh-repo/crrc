import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/userAccess/login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard'),
      children: [
        {
          path: '/modelTraning',
          name: '模型训练',
          component: () => import(/* webpackChunkName: "dashboard" */ './views/traning'),
        },
        {
          path: '/modelApplication',
          name: '模型应用',
          component: () => import(/* webpackChunkName: "dashboard" */ './views/application/index.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
  ],
});
