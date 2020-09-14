/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const pointCard = {
  path: '/pointCard',
  component: Layout,
  redirect: '/pointCard/list',
  name: 'PointCard',
  meta: {
    icon: 'star',
    title: 'pointCard',
    roles: ['ADMIN', 'ORG', 'MCHT']
  },
  children: [
    {
      path: 'list',
      name: 'PointCardList',
      component: () => import('@/views/contents/management/pointCard/base/index'),
      meta: {
        icon: 'edit',
        title: 'pointCardList',
        roles: ['ADMIN', 'ORG']
      }
    },
    {
      path: 'create',
      name: 'PointCardCreate',
      component: () => import('@/views/contents/management/pointCard/base/baseCreate'),
      hidden: true,
      meta: {
        title: 'pointCardCreate',
        roles: ['ADMIN', 'ORG']
      }
    },
    {
      path: 'edit',
      name: 'PointCardEdit',
      component: () => import('@/views/contents/management/pointCard/base/baseEdit'),
      hidden: true,
      meta: {
        title: 'pointCardEdit',
        roles: ['ADMIN', 'ORG']
      }
    },
    {
      path: 'isu',
      name: 'PointCardIsu',
      component: () => import('@/views/contents/management/pointCard/isu/index'),
      meta: {
        icon: 'email',
        title: 'pointCardIsu',
        roles: ['ADMIN', 'ORG']
      }
    },
    {
      path: 'trx',
      name: 'PointCardTrx',
      component: () => import('@/views/contents/management/pointCard/trx/index'),
      meta: {
        icon: 'skill',
        title: 'pointCardTrx'
      }
    },
    {
      path: 'trx/detail',
      name: 'PointCardTrxDtl',
      component: () => import('@/views/contents/management/pointCard/trx/detail'),
      hidden: true,
      meta: {
        title: 'pointCardTrxDtl',
        roles: ['ADMIN', 'ORG']
      }
    }
  ]
}

export default pointCard
