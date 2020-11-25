import { RouteView } from '@/layouts';

export default {
  path: '/dashboard',
  name: 'dashboard',
  redirect: '/dashboard/analysis',
  component: RouteView,
  meta: { title: '仪表盘', icon: 'icon-dashboard', keepAlive: true },
  hideChildrenInMenu: true,
  children: [
    {
      path: '/dashboard/analysis',
      name: 'Workplace',
      component: () => import('@/views/dashboard/Analysis'),
      meta: { title: '工作台', keepAlive: true },
    },
  ],
};
