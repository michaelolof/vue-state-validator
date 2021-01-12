<template>
  <div class="demo-section">

    <div class="flex flex--reverse">
      <button @click="toggle" v-if="formIsShown" class="form__clear toggle-btn">Show Code</button>
      <button @click="toggle" v-else class="form__clear toggle-btn">Show Form</button>
    </div>

    <slot v-if="formIsShown" name="form"></slot>
    <div v-else class="language-vue extra-class">
      <pre class="language-vue">
        <slot name="code"></slot>
      </pre>
    </div>

  </div>  
</template>


<script>
export default {
  data() {
    return {
      formIsShown: true,
    }
  },

  methods: {
    toggle() {
      this.formIsShown = !this.formIsShown;
    }
  }
}
</script>