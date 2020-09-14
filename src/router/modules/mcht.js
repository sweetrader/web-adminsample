/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const mcht = {
  path: '/mcht',
  component: Layout,
  redirect: '/mcht/list',
  name: 'Mcht',
  meta: {
    icon: 'example',
    title: 'mcht',
    roles: ['ADMIN', 'ORG']
  },
  children: [
    {
      path: 'list',
      name: 'MchtManagement',
      component: () => import('@/views/contents/management/mcht/index'),
      meta: {
        icon: 'user',
        title: 'mchtManagement'
      }
    },
    {
      path: 'notice',
      name: 'MchtManagement',
      component: () => import('@/views/contents/management/notice/list'),
      meta: {
        icon: 'user',
        title: 'mchtManagement'
      }
    },
    {
      path: 'excel',
      name: 'MchtExcel',
      component: () => import('@/views/contents/management/mcht/mchtExcel'),
      hidden: true,
      meta: {
        title: 'mchtExcel'
      }
    }
  ]
}

export default mcht
