import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/userAccess/login.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      component: () => import('./views/dashboard/material'),
      children: [
        {
          path: '/dashboard',
          name: '首页',
          selectIcon: '首页-选中',
          // component: () => import('./views/dashboard/case'),
          component: () => import('./views/dashboard'),
        },
        {
          path: '/newModel',
          name: '模型中心',
          selectIcon: '模型中心-选中',
          component: () => import('./views/createModel'),
        },
        {
          path: '/chooseData',
          name: '创建训练',
          selectIcon: '创建训练-选中',
          // component: () => import('./views/traning'),
          component: () => import('./views/createTrain'),
        },
        {
          path: '/intense',
          name: '强化训练',
          selectIcon: '强化训练-选中',
          component: () => import('./views/intense'),
        },
        {
          path: '/importData',
          name: '数据导入',
          selectIcon: '数据导入-选中',
          // component: () => import('./views/dataImport'),
          component: () => import('./views/importData'),
          // children: [
          //   {
          //     path: '/importData',
          //     name: '表格上传',
          //     component: () => import('./views/dataImport/steps/tableUpload'),
          //   },
          //   {
          //     path: '/analyze',
          //     name: '分析报告',
          //     component: () => import('./views/dataImport/steps/analyze'),
          //   },
          //   {
          //     path: '/recommend',
          //     name: '模型推荐',
          //     component: () => import('./views/dataImport/steps/recommend'),
          //   },
          // ],
        },
        {
          path: '/report',
          // name: '',
          // selectIcon: '',
          component: () => import('./views/case'),
        },
        {
          path: '/result',
          component: () => import('./views/publish/modelPublishForecast'),
        },
        {
          path: '/upload',
          component: () => import('./views/case/upload'),
        },
        {
          path: '/training',
          component: () => import('./views/case/trainResult.vue'),
        },
        {
          path: '/trainConfig',
          component: () => import('./views/dataConfig.vue'),
        },
        {
          path: '/instance',
          component: () => import('./views/instaceList.vue'),
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
      component: () => import(/* webpackChunkName: "modelCenter" */ './components/histogram'),
    },
  ],
});
