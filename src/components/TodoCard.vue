<template>
  <div class="todo-item">
    <div class="todo-container">
      <div
        class="complete"
        @click="markComplete(todo.id)"
        v-show="!todo.isCompleted"
        @mouseover="showToolTip = true"
        @mouseout="showToolTip = false"
      >
        <input type="checkbox" />
        <span v-if="showToolTip" class="tooltip">Mark Complete</span>
      </div>
      <div class="todo-details">
        <div class="task">
          <p :class="{ strike: todo.isCompleted }">
            {{ todo.description }}
          </p>
        </div>
        <div class="todo-action">
          <div class="todo-status" :class="{ incomplete: !todo.isCompleted }">
            <p v-if="todo.isCompleted">completed</p>
            <p v-else>Incomplete</p>
          </div>
          <div class="edit">
            <button class="edit-btn">Edit Todo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-card",
  props: {
    todo: {
      type: Object,
      default: () => ({}), // define a default value as an empty object
    },
  },
  data() {
    return {
      showToolTip: false,
    };
  },

  methods: {
    markComplete(id) {
      this.$emit("completeTodo", id);
    },
  },
};
</script>
<style scoped src="@/components/styles/todoCard.css"></style>
