<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
      <h1 class="text-2xl font-bold mb-4">To-Do List</h1>
      <form @submit.prevent="addTask" class="flex mb-4">
        <input
          v-model="newTask"
          class="flex-1 border border-gray-300 rounded-l px-3 py-2"
          placeholder="Add a new task..."
        />
        <button class="bg-blue-500 text-white px-4 rounded-r">Add</button>
      </form>
      <draggable v-model="tasks" handle=".handle" item-key="id">
        <template #item="{ element }">
          <TodoItem :todo="element" @toggle="updateTask" @delete="deleteTask" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import TodoItem from "../components/TodoItem.vue";
import type { Todo } from "../types/Todo";
import { onMounted, ref } from "vue";
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../services/todoService";

const tasks = ref<Todo[]>([]);
const newTask = ref("");
onMounted(async () => {
  tasks.value = await fetchTodos();
});
const addTask = async () => {
  if (!newTask.value.trim()) return;
  const todo = await createTodo(newTask.value.trim());
  tasks.value.push(todo);
  newTask.value = "";
};
const deleteTask = async (id: number) => {
  await deleteTodo(id);
  tasks.value = tasks.value.filter((t) => t.id !== id);
};
const updateTask = async (task: Todo) => {
  const updated = await updateTodo(task.id);
  task.completed = updated.completed;
};
</script>
