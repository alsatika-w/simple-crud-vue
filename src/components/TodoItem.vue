<template>
  <li class="flex justify-between items-center border-b border-gray-200 py-2">
    <div class="flex-1">
      <input
        v-if="isEditing"
        v-model="editTitle"
        @keyup.enter="updateTodo"
        type="text"
        class="border border-gray-300 p-2 rounded w-full"
      />
      <span v-else class="text-lg">{{ todo.title }}</span>
    </div>
    <div class="flex space-x-2">
      <button @click="toggleEdit" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
        {{ isEditing ? 'Save' : 'Edit' }}
      </button>
      <button @click="deleteTodo" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['todo'],
  data() {
    return {
      isEditing: false,
      editTitle: this.todo.title,
    };
  },
  methods: {
    toggleEdit() {
      if (this.isEditing) {
        this.updateTodo();
      } else {
        this.isEditing = true;
      }
    },
    async updateTodo() {
      if (this.editTitle.trim() === '') return;
      await this.$emit('edit-todo', { ...this.todo, title: this.editTitle });
      this.isEditing = false;
    },
    async deleteTodo() {
      await this.$emit('delete-todo', this.todo.id);
    },
  },
};
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>


<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  background: #007bff;
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #0056b3;
}

button:disabled {
  background: #ddd;
  cursor: not-allowed;
}
</style>
