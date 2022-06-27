import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Task from '../views/Task.vue'
import Token from '../views/Token.vue'
import NewTask from '../views/NewTask.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/task/:id',
      name: 'task',
      component: Task
    },
    {
      path: '/token',
      name: 'token',
      component: Token
    },
    {
      path: '/new',
      name: 'new',
      component: NewTask
    },
  ]
})

export default router
