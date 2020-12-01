import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin.vue'
import Articles from '@/components/Articles.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles
    }
  ]
})
