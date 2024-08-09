<template>
  <div>
    <todo-list />
  </div>
</template>

<script>
import TodoList from '../components/TodoList.vue';

export default {
  name: 'TodoPage',
  components: { TodoList },
};
</script>
