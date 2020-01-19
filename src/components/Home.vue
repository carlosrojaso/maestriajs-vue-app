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
import {notesDataApi} from "../data/notes-data-api";

export default {
  name: 'Home',
  mixins: [notesDataApi],
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
  mounted() {
    this.$root.$on('NEW_NOTE', (action) => {if (action) { this.newNote(); }});
    this.getTasks(1)
      .then((res) => res.json())
      .then((items) => {
        this.notes = items.map((item) => ({id: item.id, name: item.title, description: item.body}));
        });
  },
  methods: {
    deleteNote(id) {
      const noteToDelete = this.notes.findIndex((item) => (item.id === id));
      this.deleteTask(id)
        .then(res => res.json())
        .then(
          () => {
            this.notes.splice(noteToDelete, 1);
          }
        );
    },
    saveNote() {
      if (!this.isEditing) { 
        const noteToSave = {
          id: uuidv4(),
          name: this.newTitle,
          description: this.newContent
          };

      this.createTask(noteToSave)
        .then(res => res.json())
        .then(
          () => {
            this.notes.push(noteToSave);
          }
        );
      } else {
        const originalNote = this.notes.findIndex((item) => (item.id === this.idToEdit));
        const noteToEdit = {
          id: this.idToEdit,
          name: this.newTitle,
          description: this.newContent
          };
        this.putTask(noteToEdit)
          .then(res => res.json())
          .then(
            () => {
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