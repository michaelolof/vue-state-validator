<template>
  <form class="form" @submit.prevent="save">

    <div v-if="formStatus === 'pass'" class="form__section form__notification form__notification--pass">Validation successful!!</div>
    <div v-else-if="formStatus === 'fail'" class="form__section form__notification form__notification--fail">Failed validation :(</div>


    <div class="form__section">
      <label for="username" class="form__label">Enter your username*</label>
      <input v-model="username.value" name="username" class="form__input" placeholder="Enter an alphanumeric username" />
      <span v-if="username.$isEmpty" class="form__error">Please enter a username</span>
      <span v-else-if="username.$isWrong" class="form__error">Please enter a valid username</span>
    </div>

    <div class="form__section">
      <label for="fullname" class="form__label">Enter your fullname*</label>
      <input v-model="fullname.value" name="fullname" class="form__input" placeholder="Firstname Lastname" />
      <span v-if="fullname.$isEmpty" class="form__error">Please enter a username</span>
      <span v-else-if="fullname.$isWrong && fullname.$rule === 'wordRange'" class="form__error">Please enter a first name and last name</span>
      <span v-else-if="fullname.$isWrong" class="form__error">Please enter a valid username</span>
    </div>

    <div class="form__section">
      <label for="bio" class="form__label">Enter a short bio</label>
      <textarea v-model="bio.value" name="bio" class="form__input" placeholder="describe yourself in 3 to 20 words" rows="5" />
      <span v-if="bio.$isEmpty" class="form__error">Please enter a bio</span>
      <span v-if="bio.$isWrong" class="form__error">Please enter a description between 3 to 20 words</span>
    </div>

    <div class="form__section flex flex--between">
      <button @click="clear" class="form__clear" type="button">Clear</button>
      <button class="form__submit" type="submit">Save</button>
    </div>

  </form>
</template>


<script>
// import { alphaNumeric, required, min, max, validateAndMutate, match, wordRange } from "vue-state-validator";
import { alphaNumeric, required, min, max, validateAndMutate, match, wordRange } from "../../../../dist";

export default {
  
  data() {
    return {
      username: {
        value: undefined,
        rules: [required, alphaNumeric, min(4), max(12)],
      },
      fullname: {
        value: undefined,
        rules: [required, match(/^[a-zA-Z\s\-\']*$/gi), wordRange(2,2) ]
      },
      bio: {
        value: undefined,
        rules: [wordRange(3,20) ]
      },
      formStatus: undefined,
      defaultState: undefined,
    }
  },

  methods: {

    save() {

      this.formStatus = undefined;

      const options = [
        { target: this.username, rules: this.username.rules },
        { target: this.fullname, rules: this.fullname.rules },
        { target: this.bio, rules: this.bio.rules },
      ]

      const isValid = validateAndMutate(options);

      this.formStatus = isValid ? "pass" : "fail";

    },

    clear() {
      this.username.value = this.defaultState.username.value;
      this.fullname.value = this.defaultState.fullname.value;
      this.bio.value = this.defaultState.bio.value;
    },


  },

  mounted() {
    this.defaultState = JSON.parse(JSON.stringify(this.$data));
  }
}
</script>