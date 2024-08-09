<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="mb-4">
      <input
        v-model="newTodoTitle"
        @keyup.enter="addTodo"
        type="text"
        placeholder="Add a new todo"
        class="border border-gray-300 p-2 rounded w-full"
      />
      <button @click="addTodo" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Todo</button>
    </div>
    <ul class="space-y-4">
      <todo-item
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @delete-todo="handleDeleteTodo"
        @edit-todo="handleEditTodo"
      />
    </ul>
    <app-pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script>
import axios from '../axios';
import TodoItem from './TodoItem.vue';
import AppPagination from './AppPagination.vue';

export default {
  components: { TodoItem, AppPagination },
  data() {
    return {
      todos: [],
      currentPage: 1,
      totalPages: 1,
      newTodoTitle: '',  // State for new todo input
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get('/todos', {
          params: {
            _limit: 10,
            _page: this.currentPage,
          },
        });
        this.todos = response.data;
        this.totalPages = Math.ceil(response.headers['x-total-count'] / 10);
      } catch (error) {
        console.error('Error fetching todos:', error);
        // Optionally, show an error message to the user
      }
    },
    async addTodo() {
      if (this.newTodoTitle.trim() === '') return;

      try {
        await axios.post('/todos', { title: this.newTodoTitle, completed: false });
        this.newTodoTitle = '';  // Clear the input field
        this.fetchTodos();       // Refresh the todo list
      } catch (error) {
        console.error('Error adding todo:', error);
        // Optionally, show an error message to the user
      }
    },
    async handleDeleteTodo(id) {
      try {
        await axios.delete(`/todos/${id}`);
        this.fetchTodos();
      } catch (error) {
        console.error('Error deleting todo:', error);
        // Optionally, show an error message to the user
      }
    },
    async handleEditTodo(todo) {
      try {
        await axios.put(`/todos/${todo.id}`, todo);
        this.fetchTodos();
      } catch (error) {
        console.error('Error updating todo:', error);
        // Optionally, show an error message to the user
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchTodos();
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>



<style scoped>
.todo-list-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list span {
  font-size: 16px;
}

button {
  background: #007bff;
  border: none;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 5px;
}

button:hover {
  background: #0056b3;
}

button:disabled {
  background: #ddd;
  cursor: not-allowed;
}
</style>
