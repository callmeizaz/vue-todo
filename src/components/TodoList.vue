<template>
  <div class="root">
    <div class="title">
      <h3>To-do</h3>
    </div>

    <div class="btn">
      <div class="add-todo">
        <button class="common-btn" @click="isModalOpen = true">
          +Add Todo
        </button>
      </div>
      <div class="filter-todo">
        <button class="common-btn">Filter</button>
      </div>
    </div>
    <!-- render todo -->
    <div class="todo-card">
      <todo-card
        @handleEditModal="openEditModal"
        @completeTodo="markCompleted"
        v-for="todo in todos"
        :todo="todo"
        :key="todo.id"
      ></todo-card>

      <p v-if="!todos.length">No todo available</p>
    </div>

    <!-- Add TO-DO -->
    <TodoModal
      :todo="selectedTodo"
      :isEditModal.sync="isEditModal"
      :isModalOpen.sync="isModalOpen"
      @form-submitted="handleFormSubmission"
    >
      <h2 v-if="!isEditModal">Add To-do</h2>
      <h2 v-else>Edit To-do</h2>
      <template v-slot:button>
        <span v-if="!selectedTodoId">Submit</span>
        <span v-else>Edit</span>
        <!-- Change 'Edit' to whatever you want the alternate text to be -->
      </template>
    </TodoModal>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoCard from "@/components/TodoCard.vue";
// Add todo Modal
import TodoModal from "./TodoModal.vue";

export default {
  name: "todo-list",
  components: {
    TodoCard,
    TodoModal,
  },
  data() {
    return {
      todos: [],
      isModalOpen: false,
      isEditModal: false,
      selectedTodoId: null,
    };
  },

  methods: {
    handleFormSubmission(formData) {
      if (this.isEditModal) {
        this.updateTodo(formData);
      } else {
        this.addTodo(formData);
      }
    },
    addTodo(formData) {
      console.log("Form data received in parent: ", formData);
      const uniqueId = `${new Date().toISOString()}`;

      const newTodo = {
        id: uniqueId,
        description: formData.description,
        isCompleted: false,
      };

      this.todos.push(newTodo);
      this.todos.sort((a, b) => {
        // Convert the date strings to Date objects and then to their corresponding numeric timestamp
        const dateA = new Date(a.id).getTime();
        const dateB = new Date(b.id).getTime();

        // Now you can subtract the timestamps as they are numbers
        return dateB - dateA;
      });
      // Here you can perform any logic or make an API call with the form data
    },

    updateTodo(formData) {
      console.log("form", formData);
    },
    openEditModal(id) {
      console.log("edit is workin");
      this.selectedTodoId = id;
      this.isEditModal = true;
    },

    markCompleted(id) {
      const index = this.todos.findIndex((todo) => todo.id === id);

      if (index === -1) return;
      const updatedTodo = {
        ...this.todos[index],
        isCompleted: !this.todos[index].isCompleted,
      };

      this.$set(this.todos, index, updatedTodo);
    },
  },
  computed: {
    selectedTodo() {
      const todoById = this.todos.find(
        (todo) => todo.id === this.selectedTodoId
      );

      console.log("todo id", todoById);

      return todoById || null;
    },
  },
};
</script>

<style>
.title {
  border: 1px solid #000000;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.title h3 {
  font-size: 2em;
}

.btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.todo-card {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
/* Common styles for both buttons */
.common-btn {
  color: #000000;
  padding: 10px 22px;
  border: 1px solid #000000;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
}

/* Unique style for the "+Add Todo" button */
.add-todo .common-btn {
  background-color: #3a41d4;
  color: #fff;
}
</style>
