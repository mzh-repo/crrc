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
      component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/material'),
      children: [
        {
          path: '/dashboard',
          name: '首页',
          selectIcon: '首页-选中',
          component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard'),
        },
        {
          path: '/modelTraning',
          name: '创建训练',
          selectIcon: '创建训练-选中',
          component: () => import(/* webpackChunkName: "traning" */ './views/traning'),
        },
        {
          path: '/modelPublish',
          name: '模型部署',
          selectIcon: '模型部署-选中',
          component: () => import(/* webpackChunkName: "publish" */ './views/publish'),
        },
        {
          path: '/importData',
          name: '数据导入',
          selectIcon: '数据导入-选中',
          component: () => import(/* webpackChunkName: "dataImport" */ './views/dataImport'),
        },
        {
          path: '/modelCenter',
          name: '模型中心',
          selectIcon: '模型中心-选中',
          component: () => import(/* webpackChunkName: "modelCenter" */ './views/modelCenter'),
        },
      ],
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/test',
      component: () => import(/* webpackChunkName: "modelCenter" */ './components/stepBar'),
    },
  ],
});
