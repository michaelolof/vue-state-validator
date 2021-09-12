
# Overview

VueStateValidator is a **simple** yet **flexible** validation and forms library with minimal assumptions and powerful extendable capabilities.

```vue
<template>
  <form>
    <label for="name">Enter your name</label>
    <input name="name" v-model="fullname.value" />
    <span v-if="fullname.$isEmpty">Please enter your fullname.</span>
    <span v-else-if="fullname.$isWrong && fullname.$rule === 'charRange'">Please enter a name between 3 to 20 characters.</span>
    <span v-else-if="fullname.$isWrong">Please enter a valid fullname.</span>

    <button @click="submit" type="submit">Save</button>
  </form>
<template>


<script>
import { required, wordRange, charRange, validateAndMutate } from "vue-state-validator";

export default {
  data() {
    return {
      fullname: { 
        value: undefined,
        rules: [required, wordRange(2,2), charRange(3, 20)] 
      }
    }
  },

  methods: {
    submit() {
      const options = [
        { value: this.fullname.value, rules: this.fullname.rules, err: this.fullname }
      ]

      const isValid = validateAndMutate(options);
    }    
  }
}
</script>
```

Here we've declared that fullname must be **required, just 2 words and between 3 to 20 characters.** We do this by passing an array of rules that define how the `value` is to be validated.
<br><br>
When the Save button is clicked, we run our validation in the `submit` method by calling `validateAndMutate` function with the validation `options`. \
<br>
The validator will apply the defined `rules` to the `value` defined for each option. \
The function will return `true` if validation passes. \
The function will return `false` and attach 2 of the three special fields `$isEmpty`, `$isWrong` and `$rule` on the `err` object (in this case `fullname`) if validation fails. This is the mutating part of the `valideAndMutate` functionality.