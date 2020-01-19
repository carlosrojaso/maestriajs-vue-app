import Vue from 'vue'
import App from './App.vue'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import { routes } from "./routes"

Vue.use(Vuetify);
Vue.use(VueRouter);

const myRouter = new VueRouter({
  routes: routes
});

new Vue({
  router: myRouter,
  vuetify,
  render: h => h(App)
}).$mount('#app')
