<template>
  <v-container>
    <v-list-item v-for="note in notes" :key="note.id" two-line>
      <v-list-item-content>
        <v-list-item-title>{{note.name}}</v-list-item-title>
        <v-list-item-subtitle>{{note.description}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn @click="getNote(note)" icon>
          <v-icon color="grey lighten-1">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon @click="deleteNote(note.id)" color="grey lighten-1">mdi-delete</v-icon>
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
              <v-btn color="blue darken-1" :disabled="!valid" @click="saveNote()">{{(isEditing ? 'Edit': 'Save')}}</v-btn>
          </v-card-actions>
        </v-form>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import uuidv4 from 'uuid/v4';

import { components } from 'aws-amplify-vue'
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from '../models';

export default {
  name: 'Home',
  components: {
    ...components
  },
  data: () => ({  
    notes: [],
    dialog: false,
    isEditing: false,
    idToEdit: -1,
    newTitle: '',
    newContent: '',
    valid: true,
    nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 4 || 'Name must be at least 4 characters',
      ],
    descRules: [
        v => !!v || 'Description is required',
        v => v.length >= 4 || 'Description must be at least 4 characters',
      ],
  }),
  async mounted() {
    this.$root.$on('NEW_NOTE', (action) => {if (action) { this.newNote(); }});

    this.notes = await this.getTasks();
  },
  methods: {
    async deleteNote(id) {
      const todelete = await DataStore.query(Todo, id);

      DataStore.delete(todelete).then(
        () => {
          const taskToDelete = this.notes.findIndex((item) => (item.id === id));
          this.notes.splice(taskToDelete, 1);
        }
      );
    },
    async saveNote() {
      if (!this.isEditing) { 
        const noteToSave = {
          id: uuidv4(),
          name: this.newTitle,
          description: this.newContent
          };
      
        await DataStore.save(new Todo(
          noteToSave
        )).then(
          () => {
            this.notes.push(noteToSave);
          }
        );
      } else {
        const original = await DataStore.query(Todo, this.idToEdit);

        await DataStore.save(
          Todo.copyOf(original, updated => {
            updated.name = this.newTitle;
            updated.description = this.newContent;
          })
        ).then(
          () => {
            const originalNote = this.notes.findIndex((item) => (item.id === this.idToEdit));
            const noteToEdit = {
              id: this.idToEdit,
              name: this.newTitle,
              description: this.newContent
              };
            this.notes[originalNote] = noteToEdit;
          }
        );
      }

      this.closeModal();
    },
    getNote(note) {
      this.idToEdit = note.id;
      this.newTitle = note.name;
      this.newContent = note.description;
      this.isEditing = true;
      this.dialog = true;
    },
    async getTasks() {
      const todos = await DataStore.query(Todo);
      return todos.map((elem) => ({...elem}));
    },
    newNote () {
      this.dialog = true;
    },
    closeModal () {
      this.dialog = false;
      this.reset();
    },
    reset() {
      this.isEditing = false;
      this.newTitle = '';
      this.newContent = '';
      this.idToEdit = -1;
    }
  }
}
</script>
<style>
</style>