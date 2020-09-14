/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const org = {
  path: '/org',
  component: Layout,
  redirect: '/org/list',
  name: 'Org',
  meta: {
    icon: '',
    title: 'org',
    roles: ['ADMIN']
  },
  children: [
    {
      path: 'list',
      name: 'OrgManagement',
      component: () => import('@/views/contents/management/org/index'),
      meta: {
        icon: 'tree-table',
        title: 'orgManagement'
      }
    }
  ]
}

export default org
