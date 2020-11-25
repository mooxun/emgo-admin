import { PageView } from '@/layouts';

export default {
  path: '/permission',
  redirect: '/admin/manage',
  component: PageView,
  meta: { title: '权限管理', icon: 'icon-user' },
  children: [
    {
      path: '/admin/manage',
      name: 'admin.manage',
      component: () => import('@/views/permission/Admin'),
      meta: { title: '管理员管理', keepAlive: true },
      rules: [
        'platform/v1/admin/lists'
      ]
    },
    {
      path: '/role/manage',
      name: 'role.manage',
      component: () => import('@/views/permission/Roles'),
      meta: { title: '角色管理', keepAlive: true },
    },
  ],
};
