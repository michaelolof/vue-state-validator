import Vue from 'vue'
import VueRouter from 'vue-router'
import FormOne from '../views/FormOne'
import FormTwo from '../views/FormTwo'
import FormThree from '../views/FormThree'
import FormFour from '../views/FormFour'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'one', component: FormOne },
  { path: '/two', name: 'two', component: FormTwo },
  { path: '/three', name: 'three', component: FormThree },
  { path: '/four', name: 'four', component: FormFour },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
