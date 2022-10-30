<template>
  <div class="home">
    <Header />
    <TodoList />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import TodoList from "../components/TodoList.vue";
export default {
  name: "HomeView",
  components: { Header, TodoList },
};
</script>

<style>
.home {
  max-width: 800px;
  margin: auto;
}
</style>
