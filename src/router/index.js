import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Dashboard from '../views/Dashboard.vue';
import Send from '../views/Send.vue';
import Leaderboard from '../views/Leaderboard.vue';

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/send', name: 'Send', component: Send },
    { path: '/leaderboard', name: "Leaderboard", component: Leaderboard}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;