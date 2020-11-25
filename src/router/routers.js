import { BasicLayout, UserLayout } from '@/layouts';
import dashboard from './modules/dashboard';
import permission from './modules/permission';

export const RoutersMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/analysis',
    children: [
      dashboard,
      permission,
    ],
  },
  {
    path: '/passport',
    component: UserLayout,
    redirect: '/passport',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/passport/Login'),
      },
    ],
  },
  {
    path: '*', redirect: '/404', hidden: true,
  },
];
