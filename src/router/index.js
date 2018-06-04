import Vue from 'vue'
import Router from 'vue-router'
// import home '@/components/home'
import Home from '@/components/Home'
// import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  //   {
  //     path: '/detail',
  //     name:'Detail',
  //     component: Detail
  // }
  ]
})
