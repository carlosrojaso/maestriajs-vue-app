<template>
  <v-app-bar
      app
      color="primary"
      dark
    >
    <v-toolbar-title>Vue App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
      to="/home"
      color="primary"
      >Home</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn
      to="/about"
      color="primary"
      >About</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>
</style>