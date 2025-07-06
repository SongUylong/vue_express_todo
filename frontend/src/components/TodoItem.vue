<template>
  <div class="flex items-center bg-gray-50 p-3 rounded shadow-sm">
    <span class="handle cursor-move mr-3">☰</span>
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle', todo)"
      class="mr-2"
    />
    <span
      :class="{ 'line-through text-gray-400': todo.completed }"
      class="flex-1"
    >
      {{ todo.task }}</span
    >
    <button @click="$emit('delete', todo.id)" class="text-red-500">x</button>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: "TodoItem" }); // 👈 Tell TypeScript this is the default export
import type { Todo } from "../types/Todo";

defineProps<{ todo: Todo }>();
defineEmits(["toggle", "delete"]);
</script>
