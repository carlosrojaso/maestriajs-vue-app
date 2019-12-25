<template>
  <v-app>
    <Header/>  
    <v-content>
      <Home/>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    Header,
    Home,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
