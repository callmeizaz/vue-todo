<template>
  <div class="modal" v-if="isModalOpen">
    <div class="modal-overlay" @click="closeModal"></div>

    <div class="modal-content">
      <button class="close-button" @click="closeModal">X</button>

      <h2>Add To-do</h2>
      <form @submit.prevent="submitForm">
        <div class="input-field">
          <label for="description">Description:</label>
          <input
            v-focus
            type="text"
            id="description"
            v-model="form.description"
            required
          />
        </div>

        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTodoModal",
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  directives: {
    focus: {
      // focus on el when inserted inside the node
      inserted(e) {
        e.focus();
      },
    },
  },
  data() {
    return {
      form: {
        description: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:isModalOpen", false);
    },
    submitForm() {
      // Handle form submission here
      console.log("Form submitted: ", this.form);
      this.$emit("formSubmitted", this.form); // Emitting the form data to parent
      this.form.description = "";
      this.closeModal();
    },
  },
};
</script>

<!-- existing CSS... -->

<style scoped>
.modal {
  /* Ensures the modal is above everything else on the page */
  position: fixed;
  /* Covers the entire screen */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* Enables a click outside the modal area to close it */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Semi-transparent background */
  background-color: rgba(0, 0, 0, 0.5);
  transition: visibility 0s, opacity 0.5s linear;
}

/* When the modal state is open, it becomes visible and occupies space */
.modal-content {
  background: #fff;
  padding: 20px;
  position: relative;
  border-radius: 5px;
  /* Give a max width and allow it to be responsive */
  max-width: 500px;
  width: 100%;
  overflow: hidden;
}

/* This class should be added based on the v-if condition for modal's visibility */
.modal[style*="visibilty: visible"] {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s linear 0s, opacity 0.5s linear;
}

/* Add styles for your form, close button, etc., as needed */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.input-field label {
  margin-bottom: 5px;
  display: block;
}

.input-field input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.submit-button {
  background-color: blue;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
