import { lazy } from 'react'
import AppLayout from '../components/AppLayout'
const config = [
  { path: '/', exact: true, redirect: '/home' },
  {
    path: '/login', // 路由路径
    name: '登录页', // 菜单名称 (不设置,则不展示在菜单栏中）
    icon: 'setting', // 菜单图标
    component: lazy(() => import('@/views/Login')) // 懒加载 路由组件
  },
  {
    path: '/404',
    name: '404',
    icon: 'setting',
    component: lazy(() => import('@/components/NotFound'))
  },
  {
    path: '/',
    component: AppLayout,
    childRoutes: [
      {
        path: '/home',
        name: '首页',
        icon: 'setting',
        component: lazy(() => import('@/views/Home')),
        auth: true,
        childRoutes: [
          {
            path: '/home/',
            exact: true,
            redirect: '/home'
          },
          { path: '*', exact: true, redirect: '/404' }
        ]
      },
      {
        path: '/mails',
        name: '阁中信',
        icon: 'setting',
        component: lazy(() => import('@/views/Mails'))
      },
      {
        path: '/dynamic_detail/:dynamicId',
        name: '动态详情',
        icon: 'setting',
        component: lazy(() => import('@/views/DynamicDetail'))
      },
      {
        path: '/friends',
        name: '阁中友',
        icon: 'setting',
        component: lazy(() => import('@/views/Friends'))
      },
      {
        path: '/friend_detail/:userId',
        name: '好友详情',
        icon: 'setting',
        component: lazy(() => import('@/views/FriendDetail'))
      },
      {
        path: '/user',
        name: '个人中心',
        icon: 'setting',
        component: lazy(() => import('@/views/User'))
      },
      {
        path: '/user_info',
        name: '修改个人信息',
        icon: 'setting',
        component: lazy(() => import('@/views/UserInfo'))
      },
      {
        path: '/improve_profile',
        name: '完善个人信息',
        icon: 'setting',
        auth: true,
        component: lazy(() => import('@/views/ImproveProfile'))
      },
      {
        path: '/letter_paper',
        name: '信纸',
        icon: 'setting',
        component: lazy(() => import('@/views/LetterPaper'))
      },
      {
        path: '/inbox',
        name: '收件箱',
        icon: 'setting',
        component: lazy(() => import('@/views/Inbox'))
      },
      {
        path: '/outbox',
        name: '发件箱',
        icon: 'setting',
        component: lazy(() => import('@/views/Outbox'))
      },
      {
        path: '/draftbox',
        name: '草稿箱',
        icon: 'setting',
        component: lazy(() => import('@/views/Draftbox'))
      },
      {
        path: '/follow_list',
        name: '关注列表',
        icon: 'setting',
        component: lazy(() => import('@/views/FollowList'))
      },
      {
        path: '/write_letter',
        name: '写信',
        icon: 'setting',
        component: lazy(() => import('@/views/WriteLetter'))
      },
      {
        path: '/post_confirm',
        name: '信件选择',
        icon: 'setting',
        component: lazy(() => import('@/views/PostConfirm'))
      },
      {
        path: '/my_dynamic',
        name: '我的动态',
        icon: 'setting',
        component: lazy(() => import('@/views/MyDynamic'))
      },
      {
        path: '/dynamic_edit',
        name: '发表动态',
        icon: 'setting',
        component: lazy(() => import('@/views/DynamicEdit'))
      },
      {
        path: '/preview',
        name: '信件查看',
        icon: 'setting',
        component: lazy(() => import('@/views/Preview'))
      },
      {
        name: '404', //不给path属性也可以匹配404页面
        redirect: '/404'
      }
    ]
  }
]

export default config
