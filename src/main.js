import Vue from 'vue'
import App from './App.vue'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import { routes } from "./routes";

import AWSAppSyncClient from 'aws-appsync'
import VueApollo from 'vue-apollo';
import awsmobile from './aws-exports';

const config = {
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    apiKey: awsmobile.aws_appsync_apiKey,
  }
};
const options = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    }
  }
}

const client = new AWSAppSyncClient(config, options);

const appsyncProvider = new VueApollo({
  defaultClient: client
})

Vue.use(VueApollo)

Vue.use(Vuetify);
Vue.use(VueRouter);

const myRouter = new VueRouter({
  routes: routes
});

new Vue({
  router: myRouter,
  apolloProvider:   appsyncProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')
