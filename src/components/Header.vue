<template>
  <header>
    <div class="logo">
      <img src="../assets/images/logo.png" alt="logo" id="logo" />
      <span class="logo-title">My Todo</span>
    </div>
    <div class="add-todo">
      <input
        type="text"
        placeholder="Add new..."
        v-model="todo"
        class="todo-input"
        @keydown.enter="handleClick"
      />
      <button @click="handleClick">Add Todo</button>
    </div>
    <p v-if="isEmpty" class="empty-paragrah">You must add a todo</p>
    <hr />
  </header>
</template>

<script>
import { ref } from "@vue/reactivity";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "@/firebase/config";
export default {
  setup() {
    let isEmpty = ref(false);
    let todo = ref("");
    async function handleClick() {
      if (todo.value.length === 0) {
        isEmpty.value = true;
      } else {
        isEmpty.value = false;
        let value = {
          title: todo.value,
          done: false,
          timestamp: serverTimestamp(),
        };
        todo.value = "";
        const docRef = await addDoc(collection(db, "todos"), value);
      }
    }

    return { todo, handleClick, isEmpty };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;700&display=swap");

/* LOGO */
header #logo {
  width: 60px;
  display: inline-block;
  margin-right: 10px;
}
header .logo-title {
  display: inline-block;
  font-size: 40px;
  font-family: "Karla", sans-serif;
  color: #4c6ef5;
}
header .logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ADD TODO */
header .todo-input {
  display: block;
  margin: auto;
  width: 80%;
  padding: 10px;
  border: none;
  font-size: 17px;
  border-radius: 5px;
}
header .todo-input:focus {
  outline: none;
  box-shadow: 0 0 0.5em rgb(214, 214, 214);
}
header .add-todo {
  margin-top: 20px;
  display: flex;
}
header button {
  display: block;
  color: white;
  background: #4c6ef5;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 17px;
}
header button:hover {
  background: #4e6ad7;
}

hr {
  margin-top: 30px;
  opacity: 0.4;
}
.empty-paragrah {
  color: crimson;
  margin: 0;
  margin-left: 30px;
}
</style>
