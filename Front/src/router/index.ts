import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// falls du Redirects /A -> /letters/A willst:
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/buch/:id', name: 'Buch', component: () => import('../views/BuchView.vue') },
    { path: '/new-book', name: 'new-book', component: () => import('../views/NewBookView.vue') },
    { path: '/search', name: 'search', component: () => import('../views/SearchView.vue') },
    { path: '/listen', name: 'BuchListe', component: () => import('../views/BooklistsView.vue') },
    { path: '/genre', name: 'Genres', component: () => import('../views/GenrelistsView.vue') },
    { path: '/charts', name: 'Buchcharts', component: () => import('../views/BookChartsView.vue') },

    // -- A–Z dynamisch: eine Route für alle Buchstaben --
    {
      path: '/letters/:letter([A-Za-zÄÖÜ])',
      name: 'Letters',
      // Falls Letters.vue unter /views/Alphlist/ liegt, nimm diesen Pfad:
      component: () => import('../components/Letters.vue'),
      // Wenn deine Letters.vue unter /components/ liegt, nimm:
      // component: () => import('../components/Letters.vue'),
      props: route => ({ letter: String(route.params.letter || 'A').toUpperCase() }),
    },
    { path: '/letters', redirect: { name: 'Letters', params: { letter: 'A' } } },

    // (Optional) Legacy-Redirects: /A -> /letters/A usw.
    ...LETTERS.map(L => ({
      path: `/${L}`,
      redirect: { name: 'Letters', params: { letter: L } },
    })),

    // -- Genre-Routen (dedupliziert, eindeutige Namen) --
    { path: '/fan',  name: 'fantasy',       component: () => import('../views/genrelist/FantasyView.vue') },
    { path: '/sci',  name: 'scifi',         component: () => import('../views/genrelist/SciView.vue') },
    { path: '/love', name: 'love',          component: () => import('../views/genrelist/LoveView.vue') },
    { path: '/fami', name: 'family',        component: () => import('../views/genrelist/FamView.vue') },
    { path: '/aben', name: 'Abenteuer',     component: () => import('../views/genrelist/AbenView.vue') },
    { path: '/fremd',name: 'Fremd',         component: () => import('../views/genrelist/FremdView.vue') },
    { path: '/hist', name: 'Historisch',    component: () => import('../views/genrelist/HistView.vue') },
    { path: '/hor',  name: 'Horror',        component: () => import('../views/genrelist/HorView.vue') },
    { path: '/psy',  name: 'Psychologisch', component: () => import('../views/genrelist/PsyView.vue') },
    { path: '/sach', name: 'Sachbücher',    component: () => import('../views/genrelist/SachView.vue') },
    { path: '/thri', name: 'Thriller',      component: () => import('../views/genrelist/ThriView.vue') },
  ],
})

export default router
