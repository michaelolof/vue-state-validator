<template>
  <div class="home">

    <form @submit.prevent="submit" class="form">

      <div class="form__group">
        <div v-if="status === 'success'" class="notification notification__success">You have successfully filled your form</div>
        <div v-else-if="status === 'error'" class="notification notification__error">You did not pass validation</div>
      </div>      

      <div class="form__group">
        <label for="fullname" class="form__label">Enter your fullname</label>
        <input v-model="fullname.value" name="fullname" class="form__input" type="text" placeholder="Firstname Lastname" />
        <span v-if="fullname.$isEmpty" class="text-error">Please enter a full name</span>
        <span v-else-if="fullname.$isWrong" class="text-error">Please enter a first name and last name</span>
      </div>

      <div class="form__group">
        <label for="age" class="form__label">Enter your age</label>
        <input v-model="age.value" name="age" class="form__input" type="tel" v-vsv-allow.match="/[0-9]/i" />
        <span v-if="age.$isEmpty" class="text-error">Please enter your age</span>
        <span v-else-if="age.$rule === 'min'" class="text-error">The age entered is too small</span>      
        <span v-else-if="age.$rule === 'max'" class="text-error">The age entered is too much</span>      
      </div>

      <div class="form__group">
        <label for="amount" class="form__label">Amount</label>
        <input v-model="amount.value" name="amount" class="form__input" type="tel" />
        <span v-if="amount.$isEmpty" class="text-error">Please enter an amount</span>
        <span v-else-if="amount.$isWrong && amount.$rule === 'range'" class="text-error">Please enter an amount between 100 and 100,000</span>      
      </div>

      <div class="form__group">
        <label for="amount" class="form__label">Notes</label>
        <textarea v-model="note.value" name="amount" class="form__input" rows="4"></textarea>
        <span v-if="note.$isWrong" class="text-error">Your notes should be between 3 to 20 words</span>      
      </div>

      <div class="form__group">
        <button class="form__submit">Submit</button>
      </div>
    
    </form>
  </div>
</template>

<script>
//@ts-ignore
import { charRange, max, min, required, wordRange, validateAndMutate, range } from '../../../../dist';

export default {

  data() {
    return {
      fullname: { value: undefined },
      age: { value: undefined },
      amount: { value: undefined },
      note: { value: undefined },
      status: undefined,
    }
  },

  methods: {

    submit() {
      const options = [
        { value: this.fullname.value, rules: [required, charRange(3, 20), wordRange(2,2)], err: this.fullname },
        { value: this.age.value, rules: [required, min(12), max(45)], err: this.age },
        { value: this.amount.value, rules: [required, range(100,100_000)], err: this.amount },
        { value: this.note.value, rules: [wordRange(3, 20)], err: this.note }
      ]

      const isValid = validateAndMutate(options);

      this.status = isValid ? "success" : "error";

    }

  }

}
</script>
