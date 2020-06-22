import { lazy } from 'react'

const config = [
  { path: '/', exact: true, redirect: '/home' },
  {
    path: '/login', // 路由路径
    name: '登录页', // 菜单名称 (不设置,则不展示在菜单栏中）
    icon: 'setting', // 菜单图标
    component: lazy(() => import('@/views/Login')) // 懒加载 路由组件
  },
  {
    path: '/home', // 路由路径
    name: '首页', // 菜单名称 (不设置,则不展示在菜单栏中）
    icon: 'setting', // 菜单图标
    component: lazy(() => import('@/views/Home')), // 懒加载 路由组件
    auth: false,
    childRoutes: [
      {
        path: '/home/',
        exact: true,
        redirect: '/home'
      },
      {
        path: '/home/welcome',
        name: '欢迎页',
        icon: 'smile',
        component: lazy(() => import('@/views/Welcome'))
      },
      { path: '*', exact: true, redirect: '/404' }
    ]
  },
  {
    path: '/mail',
    name: '阁中信',
    icon: 'setting',
    component: lazy(() => import('@/views/Mail'))
  },
  {
    path: '/friends',
    name: '阁中友',
    icon: 'setting',
    component: lazy(() => import('@/views/Friends'))
  },
  {
    path: '/user',
    name: '阁中你',
    icon: 'setting',
    component: lazy(() => import('@/views/User'))
  },
  {
    path: '/404',
    name: '404',
    icon: 'setting',
    component: lazy(() => import('@/components/NotFound'))
  },
  {
    name: '404', //不给path属性也可以匹配404页面
    redirect: '/404'
  }
]

export default config