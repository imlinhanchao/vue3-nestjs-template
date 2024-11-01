import { LAYOUT } from '@/router/constant';
export default [
  {
    path: '/app',
    component: LAYOUT,
    meta: {
      order: 1,
      icon: 'i-bi:app',
      title: '其他',
    },
    children: [
      {
        path: '',
        name: 'app',
        component: () => import('/@/views/app/index.vue'),
        meta: {
          title: '其他',
        },
      },
    ],
  },
];
