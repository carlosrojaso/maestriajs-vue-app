<template>
  <v-app id="app" v-if="hydrated">
    <Header/>
    <v-content>
    <router-view></router-view>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'App',
  data: () => ({ hydrated: false }),
  components: {
    Header,
    Footer
  },
  async mounted() {
    await this.$apollo.provider.defaultClient.hydrated()
    this.hydrated = true
  },
};
</script>
