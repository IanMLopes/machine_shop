import Vue from 'vue'
import Router from 'vue-router'
import mainView from '../mainView'
import chartjs from '../views/charts/chartjs'
import mdiIcons from '../views/icons/mdi-icons'
import login from '../views/samples/login'
import register from '../views/samples/register'

import dashboard from '../views/dashboard'
import colaborator from '../views/colaborator'
import machine from '../views/machine'
import project from '../views/project'
import task from '../views/registration-task'
import monitoring from '../views/monitoring'
import profile from '../views/profile-user'


Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
    routes: [
    {
        path: '/dashboard',
        component: mainView,
        redirect: '/dashboard',
        children: [
        {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboard
        },
        {
            path: '/mainView',
            name: 'mainView',
            component: mainView
        },
        {
            path: '/colaborator',
            name: 'colaborator',
            component: colaborator
        },
        {
            path: '/project',
            name: 'project',
            component: project
        },
        {
            path: '/machine',
            name: 'machine',
            component: machine
        },
        {
            path: '/registration-task',
            name: 'registration-task',
            component: task
        },
        {
            path: '/monitoring',
            name: 'monitoring',
            component: monitoring
        },
        {
            path: '/profile-user',
            name: 'profile-user',
            component: profile
        },
        {
            path: '/chartjs',
            component: chartjs
        },
        {
            path: '/mdiIcons',
            component: mdiIcons
        },
        ]
    },
    {
        path: '/',
        name:'login',
        component: login,
        // component: mainView,
        // redirect: '/dashboard',

    }, 
    {
        path: '/register',
        name: 'register',
        component: register
    },  
  ]
})
