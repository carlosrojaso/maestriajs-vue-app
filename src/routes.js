import Home from './components/Home';
const lazyAbout = () => import('./components/About.vue')

export const routes = [
    {path: '', component: Home},
    {path: '/home', component: Home},
    {path: '/about', component: lazyAbout}
  ];
  