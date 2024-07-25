import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import HomePage from '../views/HomePage.vue';
import RoomsPage from '../views/RoomsPage.vue';
import BookingsPage from '../views/BookingsPage.vue';
import AdminHomePage from '../views/AdminHomePage.vue';

const routes = [
  { path: '/', component: HomePage, meta: { requiresAuth: true, title: 'Home' } },
  { path: '/login', component: LoginPage, meta: { title: 'Login' } },
  { path: '/register', component: RegisterPage, meta: { title: 'Register' } },
  { path: '/rooms', component: RoomsPage, meta: { requiresAuth: true, title: 'Rooms' } },
  { path: '/bookings', component: BookingsPage, meta: { requiresAuth: true, title: 'My Bookings' } },
  { path: '/admin', component: AdminHomePage, meta: { requiresAuth: true, requiresAdmin: true, title: 'Admin Dashboard' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else if (to.matched.some(record => record.meta.requiresAdmin) && userRole !== 'admin') {
    next('/');
  } else {
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  }
});

export default router;