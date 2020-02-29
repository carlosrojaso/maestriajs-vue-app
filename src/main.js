import Vue from 'vue'
import App from './App.vue'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import { routes } from "./routes"

import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(AmplifyPlugin, AmplifyModules);

const myRouter = new VueRouter({
  routes: routes
});

new Vue({
  router: myRouter,
  vuetify,
  render: h => h(App)
}).$mount('#app')
