<template>
  <v-container>
    <v-list-item v-for="note in notes" :key="note.id" two-line>
      <v-list-item-content>
        <v-list-item-title>{{note.name}}</v-list-item-title>
        <v-list-item-subtitle>{{note.description}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon>
          <v-icon color="grey lighten-1">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="grey lighten-1">mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-container>
</template>

<script>
import {DummyData} from "../data/dummy-data";

export default {
  name: 'Home',
  data: () => ({  
    notes: DummyData
  }),
  mounted() {
  }
}
</script>
<style>
</style>