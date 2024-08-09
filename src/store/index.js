import { createStore } from 'vuex';
import axios from '../axios';

const store = createStore({
  state() {
    return {
      todos: [],
      user: null,
    };
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      const response = await axios.get('/todos', { params: { _limit: 10 } });
      commit('setTodos', response.data);
    },
    async loginUser({ commit }, user) {
      commit('setUser', user);
    },
  },
  getters: {
    todos(state) {
      return state.todos;
    },
    user(state) {
      return state.user;
    },
  },
});

export default store;
