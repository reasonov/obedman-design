import VueRouter from 'vue-router';
import home from './pages/home.vue';
import projectsPage from './pages/projects.vue';
import projectsInfo from './pages/project-info.vue';

export default new VueRouter({
  routes: [
    {
      path: '',
      component: home
    },
    {
      path: '/projects',
      component: projectsPage
    },
    {
      path: '/project-info/:id',
      component: projectsInfo
    }
  ],
  mode: 'history',
  base: '/reasonov.github.io/',
  scrollBehavior() {
    return { x: 0, y: 0, behavior: 'smooth'}
  }
})
