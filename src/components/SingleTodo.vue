<template>
  <div class="single-todo">
    <div class="todo-checkbox">
      <input type="checkbox" @click="handleClick" v-model="todoDone" />
      <label :class="{ todoDone: todoDone }">{{ todo.title }}</label>
    </div>
    <span @click="deleteTodo" class="material-symbols-outlined"> delete </span>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "@/firebase/config";
export default {
  props: ["todo"],
  setup(props) {
    let todoDone = ref(props.todo.done);
    async function handleClick() {
      todoDone.value = !props.todo.done;
      const ref = doc(db, "todos", props.todo.id);
      await updateDoc(ref, {
        done: todoDone.value,
      });
    }

    async function deleteTodo() {
      await deleteDoc(doc(db, "todos", props.todo.id));
    }
    return { handleClick, deleteTodo, todoDone };
  },
};
</script>

<style>
.single-todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-checkbox {
  display: flex;
}
.single-todo label {
  font-size: 17px;
  margin-left: 10px;
}
.single-todo label,
.single-todo input {
  display: block;
}
label.todoDone {
  text-decoration: line-through;
  color: #4c6ef5;
}
.single-todo span {
  display: block;
  color: rgb(243, 68, 103);
  cursor: pointer;
  padding: 5px;
}
</style>
