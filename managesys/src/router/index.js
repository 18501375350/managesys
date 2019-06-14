import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import login from '../components/pages/login'
import home from '../components/pages/home'
import manage from '../components/pages/manage'
import manageInfo from '../components/pages/manageInfo'
import addManage from '../components/pages/addManage'
import user from '../components/pages/user'
import userInfo from '../components/pages/userInfo'
import addUser from '../components/pages/addUser'
import notice from '../components/pages/notice'
import noticeInfo from '../components/pages/noticeInfo'
import addNotice from '../components/pages/addNotice'
import device from '../components/pages/device'
import deviceInfo from '../components/pages/deviceInfo'
import addDevice from '../components/pages/addDevice'
import welcome from '../components/pages/welcome'
export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: 'manage',
          component: manage,

          children: [
            {
              path: '',
              component: manageInfo,
              name: '管理员列表页'
            },
            {
              path: 'addManage/:id',
              component: addManage,
              name: '添加/修改管理员'
            }
          ]
        },
        {
          path: 'user',
          component: user,
          children: [
            {
              path: '',
              component: userInfo,
              name: '用户列表页'
            },
            {
              path: 'addUser/:id',
              component: addUser,
              name: '添加/修改用户'
            }
          ]
        },
        {
          path: 'notice',
          component: notice,
          children: [
            {
              path: '',
              component: noticeInfo,
              name: '通知列表页'
            },
            {
              path: 'addNotice/:id',
              component: addNotice,
              name: '添加/修改通知'
            }
          ]
        },
        {
          path: 'device',
          component: device,
          children: [
            {
              path: '',
              component: deviceInfo,
              name: '设备列表页'
            },
            {
              path: 'addDevice/:id',
              component: addDevice,
              name: '添加/修改设备'
            }
          ]
        },
        {
          path: '',
          component: welcome
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
