import { LAYOUT } from '@/router/constant';
export default [
  {
    path: '/',
    component: LAYOUT,
    redirect: '/home',
    meta: {
      order: 0,
      icon: 'i-icon-park-outline:api-app',
      title: '首页',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('/@/views/home/home.vue'),
        meta: {
          title: '首页',
        },
      }
    ],
  },
];
