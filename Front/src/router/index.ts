import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path : '/new-book',
      name :'new-book',
      component :() => import('../views/NewBookView.vue')
    },
    {
      path : '/search',
      name :'search',
      component :() => import('../views/SearchView.vue')
    },
    {
      path : '/listen',
      name :'BuchListe',
      component :() => import('../views/BooklistsView.vue')
    },
    {
      path : '/genre',
      name :'Genres',
      component :() => import('../views/GenrelistsView.vue')
    },
    {
      path : '/charts',
      name :'Buchcharts',
      component :() => import('../views/BookChartsView.vue')
    },
    {
      path : '/A',
      name :'A',
      component :() => import('../views/Alphlist/AView.vue')
    },
    {
      path : '/B',
      name :'B',
      component :() => import('../views/Alphlist/BView.vue')
    },
    {
      path : '/C',
      name :'C',
      component :() => import('../views/Alphlist/CView.vue')
    },
    {
      path : '/D',
      name :'D',
      component :() => import('../views/Alphlist/DView.vue')
    },
    {
      path : '/E',
      name :'E',
      component :() => import('../views/Alphlist/EView.vue')
    },
    {
      path : '/F',
      name :'F',
      component :() => import('../views/Alphlist/FView.vue')
    },
    {
      path : '/G',
      name :'G',
      component :() => import('../views/Alphlist/GView.vue')
    },
    {
      path : '/H',
      name :'H',
      component :() => import('../views/Alphlist/HView.vue')
    },
    {
      path : '/I',
      name :'I',
      component :() => import('../views/Alphlist/IView.vue')
    },
    {
      path : '/J',
      name :'J',
      component :() => import('../views/Alphlist/JView.vue')
    },
    {
      path : '/K',
      name :'K',
      component :() => import('../views/Alphlist/KView.vue')
    },
    {
      path : '/L',
      name :'L',
      component :() => import('../views/Alphlist/LView.vue')
    },
    {
      path : '/M',
      name :'M',
      component :() => import('../views/Alphlist/MView.vue')
    },
    {
      path : '/N',
      name :'N',
      component :() => import('../views/Alphlist/NView.vue')
    },
    {
      path : '/O',
      name :'O',
      component :() => import('../views/Alphlist/OView.vue')
    },
    {
      path : '/P',
      name :'P',
      component :() => import('../views/Alphlist/PView.vue')
    },
    {
      path : '/Q',
      name :'Q',
      component :() => import('../views/Alphlist/QView.vue')
    },
    {
      path : '/R',
      name :'R',
      component :() => import('../views/Alphlist/RView.vue')
    },
    {
      path : '/S',
      name :'S',
      component :() => import('../views/Alphlist/SView.vue')
    },
    {
      path : '/T',
      name :'T',
      component :() => import('../views/Alphlist/TView.vue')
    },
    {
      path : '/U',
      name :'U',
      component :() => import('../views/Alphlist/UView.vue')
    },
    {
      path : '/V',
      name :'V',
      component :() => import('../views/Alphlist/VView.vue')
    },
    {
      path : '/W',
      name :'W',
      component :() => import('../views/Alphlist/WView.vue')
    },
    {
      path : '/X',
      name :'X',
      component :() => import('../views/Alphlist/XView.vue')
    },
    {
      path : '/Y',
      name :'Y',
      component :() => import('../views/Alphlist/YView.vue')
    },
    {
      path : '/Z',
      name :'Z',
      component :() => import('../views/Alphlist/ZView.vue')
    },
    {
      path : '/fan',
      name :'fantasy',
      component :() => import('../views/genrelist/FantasyView.vue')
    },
    {
      path : '/sci',
      name :'Scifi',
      component :() => import('../views/genrelist/SciView.vue')
    },
    {
      path : '/love',
      name :'love',
      component :() => import('../views/genrelist/LoveView.vue')
    },
    {
      path : '/sci',
      name :'Scifi',
      component :() => import('../views/genrelist/SciView.vue')
    },
    {
      path : '/fami',
      name :'family',
      component :() => import('../views/genrelist/FamView.vue')
    },
    {
      path : '/sci',
      name :'Scifi',
      component :() => import('../views/genrelist/SciView.vue')
    },
    {
      path : '/aben',
      name :'Abenteuer',
      component :() => import('../views/genrelist/AbenView.vue')
    },
    {
      path : '/fremd',
      name :'Fremd',
      component :() => import('../views/genrelist/FremdView.vue')
    },
    {
      path : '/hist',
      name :'Historisch',
      component :() => import('../views/genrelist/HistView.vue')
    },
    {
      path : '/hor',
      name :'Horror',
      component :() => import('../views/genrelist/HorView.vue')
    },
    {
      path : '/psy',
      name :'Psychologisch',
      component :() => import('../views/genrelist/PsyView.vue')
    },
    {
      path : '/sach',
      name :'Sachbücher',
      component :() => import('../views/genrelist/SachView.vue')
    },
    {
      path : '/thri',
      name :'Thriller',
      component :() => import('../views/genrelist/ThriView.vue')
    },
  ],
})

export default router
