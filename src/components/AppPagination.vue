<template>
  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">Next</button>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: ['currentPage', 'totalPages'],
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

button {
  background: #007bff;
  border: none;
  color: #fff;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin: 0 5px;
}

button:hover {
  background: #0056b3;
}

button:disabled {
  background: #ddd;
  cursor: not-allowed;
}

span {
  font-size: 16px;
}
</style>
