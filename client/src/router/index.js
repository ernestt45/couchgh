import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Verify from '@/components/Verify'
import Trips from '@/components/Trips'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home},
    {path: '/register',name: 'register',component: Register},
    {path: '/login',name: 'login',component: Login},
    {path: '/trips/:from/:to/:date', name: 'trips', component: Trips },
    {path: '/trips/:date', name: 'trips', component: Trips },
    {path: '/trips/', component: Trips},
    {path: '/verify/:token',component: Verify,name: 'verify'},

// Redirects
     {
      path: '/verify',
      redirect: '/login'
    },
  ],
  mode: 'history'
})
