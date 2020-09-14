/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const system = {
  path: '/system',
  component: Layout,
  redirect: '/system/manager',
  meta: {
    icon: 'lock',
    roles: ['ADMIN', 'ORG']
  },
  children: [
    {
      path: 'manager',
      component: () => import('@/views/contents/system/manager/index'),
      name: 'Manager',
      meta: { title: 'manager', icon: 'lock', noCache: true }
    }
  ]
}

export default system
