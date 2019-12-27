export const notesDataApi = {
    data() {
        return {
            apiUrl: 'https://jsonplaceholder.typicode.com'
        }
      },
    methods: {
    createTask(task) {
        return fetch(`${this.apiUrl}/posts/`, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });
        },
    deleteTask(id) {
        return fetch(`${this.apiUrl}/posts/${id}`, {method: 'DELETE'});
        },
    getTasks(id) {
        return fetch(`${this.apiUrl}/users/${id}/posts`);
        },
    putTask(task) {
        const taskToEdit = {
            id: task.id,
            title: task.name,
            body: task.description,
            userId: 1
        };
        return fetch(`${this.apiUrl}/posts/${task.id}`, {
            method: 'PUT',
            body: JSON.stringify(taskToEdit),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });
        },
    }
  };
