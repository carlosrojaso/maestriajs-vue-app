<template>
  <v-footer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
    <v-spacer></v-spacer>
    <v-btn 
      fab
      dark
      absolute
      right
      color="indigo"
      class="floatButton"
      @click="newNote()">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>

</style>