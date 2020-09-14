/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const myInfo = {
  path: '/myInfo',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '',
      name: 'MyInfo',
      component: () => import('@/views/contents/system/manager/myInfo'),
      hidden: true,
      meta: {
        title: 'myInfo'
      }
    }
  ]
}

export default myInfo
