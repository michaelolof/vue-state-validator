<template>
  <div class="home">

    <form @submit.prevent="submit" class="form">

      <div class="form__group">
        <div v-if="status === 'success'" class="notification notification__success">You have successfully filled your form</div>
        <div v-else-if="status === 'error'" class="notification notification__error">You did not pass validation</div>
      </div>      

      <div class="form__group">
        <label for="fullname" class="form__label">Enter your fullname</label>
        <input v-model="fullname.value" name="fullname" v-vsv-length="20" v-vsv-allow.alpha class="form__input" type="text" placeholder="Firstname Lastname" autocomplete="off" />
        <span v-if="fullname.$isEmpty" class="text-error">Please enter a full name</span>
        <span v-else-if="fullname.$isWrong" class="text-error">Please enter a first name and last name</span>
      </div>

      <div class="form__group">
        <label for="age" class="form__label">Enter your age</label>
        <input v-model="age.value" v-vsv-on.blur.input="{ target: age, rules: age.rules }"  v-vsv-allow.numeric v-vsv-max="45" name="age" class="form__input" type="tel" autocomplete="off" />
        <span v-if="age.$isEmpty" class="text-error">Please enter your age</span>
        <span v-else-if="age.$isWrong && age.$rule === 'min'" class="text-error">The age entered is too small</span>      
        <span v-else-if="age.$isWrong && age.$rule === 'max'" class="text-error">The age entered is too much</span>      
        <span v-else-if="age.$isWrong" class="text-error">Please enter a valid age</span>      
      </div>

      <div class="form__group">
        <label for="amount" class="form__label">Amount</label>
        <input v-model="amount.value" v-vsv-on.blur.input="{ target: amount, rules: amount.rules }" name="amount" class="form__input" type="tel" autocomplete="off" />
        <span v-if="amount.$isEmpty" class="text-error">Please enter an amount</span>
        <span v-else-if="amount.$isWrong && amount.$rule === 'range'" class="text-error">Please enter an amount between 100 and 100,000</span>      
        <span v-else-if="amount.$isWrong" class="text-error">Please enter a valid amount</span>      
      </div>

      <div class="form__group">
        <button class="form__submit">Submit</button>
      </div>
    
    </form>
  </div>
</template>

<script>
//@ts-ignore
import { charRange, max, min, required, wordRange, validateAndMutate, range, numeric } from '../../../../dist';

export default {

  data() {
    return {
      fullname: { 
        value: undefined, 
        rules: [required, charRange(3, 20), wordRange(2,2)] 
      },
      age: { 
        value: undefined, 
        rules: [required, numeric, min(12), max(45)] 
      },
      amount: { 
        value: undefined, 
        rules: [required, numeric, range(100,100_000)] 
      },
      status: undefined,
    }
  },

  methods: {

    submit() {
      const options = [
        { target: this.fullname, rules: this.fullname.rules },
        { target: this.age, rules: this.age.rules },
        { target: this.amount, rules: this.amount.rules }
      ]

      const isValid = validateAndMutate(options);

      this.status = isValid ? "success" : "error";

    }

  }

}
</script>
