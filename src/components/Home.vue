<template>
  <v-container>
    <v-list-item v-for="note in notes" :key="note.id" two-line>
      <v-list-item-content>
        <v-list-item-title>{{note.name}}</v-list-item-title>
        <v-list-item-subtitle>{{note.description}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn @click="newNote()" icon>
          <v-icon color="grey lighten-1">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="grey lighten-1">mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-dialog v-model="dialog">
        <v-card>
        <v-card-title>
            <span class="headline">New Note</span>
        </v-card-title>
        <v-form v-model="valid">
          <v-card-text>
              <v-container grid-list-md>
              <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="newTitle" value="" label="Title*" :rules="nameRules" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-textarea v-model="newContent" value="" :rules="descRules" label="Description*" required></v-textarea>
                  </v-flex>
              </v-layout>
              </v-container>
              <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeModal()">Close</v-btn>
              <v-btn color="blue darken-1" @click="saveNote()">Save</v-btn>
          </v-card-actions>
        </v-form>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {DummyData} from "../data/dummy-data";

export default {
  name: 'Home',
  data: () => ({  
    notes: DummyData,
    dialog: false,
    newTitle: '',
    newContent: '',
    valid: false,
    nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 4 || 'Name must be at least 4 characters',
      ],
    descRules: [
        v => !!v || 'Description is required',
        v => v.length >= 4 || 'Description must be at least 4 characters',
      ],
  }),
  mounted() {
    this.$root.$on('NEW_NOTE', (action) => {if (action) { this.newNote(); }});
  },
  methods: {
    newNote () {
      this.dialog = true;
    },
    closeModal () {
      this.dialog = false;
    },
  }
}
</script>
<style>
</style>