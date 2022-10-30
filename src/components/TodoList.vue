<template>
  <div class="todo-list" v-if="todos.length">
    <h2>My Tasks</h2>
    <div v-for="todo in newTodos" :key="todo.id">
      <SingleTodo :todo="todo" />
    </div>
    <h2>Completed</h2>
    <div v-for="todo in completedTodos" :key="todo.id">
      <SingleTodo :todo="todo" />
    </div>
  </div>
  <div v-else>Loading ...</div>
</template>

<script>
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { db } from "@/firebase/config";
import { ref } from "@vue/reactivity";
import SingleTodo from "../components/SingleTodo.vue";
import { computed } from "@vue/runtime-core";
export default {
  components: { SingleTodo },
  setup() {
    let todos = ref([]);
    async function getTodos() {
      const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
      onSnapshot(q, (querySnapshot) => {
        todos.value = [];
        querySnapshot.forEach((doc) => {
          todos.value.push({ ...doc.data(), id: doc.id });
        });
      });
    }
    getTodos();

    let completedTodos = computed(() => {
      return todos.value.filter((todo) => todo.done);
    });
    let newTodos = computed(() => {
      return todos.value.filter((todo) => !todo.done);
    });

    return { todos, completedTodos, newTodos };
  },
};
</script>

<style></style>
