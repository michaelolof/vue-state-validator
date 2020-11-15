<template>
  <div class="home">

    <form @submit.prevent="submit" class="form">

      <div class="form__group">
        <div v-if="status === 'success'" class="notification notification__success">You have successfully filled your form</div>
        <div v-else-if="status === 'error'" class="notification notification__error">You did not pass validation</div>
      </div>      

      <div class="form__group">
        <label for="fullname" class="form__label">Enter your fullname</label>
        <input v-model="fullname.value" name="fullname" v-validate-length="20" v-validate-prevent.numeric class="form__input" type="text" placeholder="Firstname Lastname" autocomplete="off" />
        <span v-if="fullname.$isEmpty" class="text-error">Please enter a full name</span>
        <span v-else-if="fullname.$isInvalid" class="text-error">Please enter a first name and last name</span>
      </div>

      <div class="form__group">
        <label for="age" class="form__label">Enter your age</label>
        <input v-model="age.value" v-validate-on.blur.input="{ field: age, rules: age.rules }"  v-validate-allow.numeric v-validate-max="45" name="age" class="form__input" type="tel" autocomplete="off" />
        <span v-if="age.$isEmpty" class="text-error">Please enter your age</span>
        <span v-else-if="age.$isInvalid && age.validator === 'min'" class="text-error">The age entered is too small</span>      
        <span v-else-if="age.$isInvalid && age.validator === 'max'" class="text-error">The age entered is too much</span>      
        <span v-else-if="age.$isInvalid" class="text-error">Please enter a valid age</span>      
      </div>

      <div class="form__group">
        <label for="amount" class="form__label">Amount</label>
        <input v-model="amount.value" v-validate-on.blur.input="{ field: amount, rules: amount.rules }" name="amount" class="form__input" type="tel" autocomplete="off" />
        <span v-if="amount.$isEmpty" class="text-error">Please enter an amount</span>
        <span v-else-if="amount.$isInvalid && amount.validator === 'range'" class="text-error">Please enter an amount between 100 and 100,000</span>      
        <span v-else-if="amount.$isInvalid" class="text-error">Please enter a valid amount</span>      
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
        { field: this.fullname, rules: this.fullname.rules },
        { field: this.age, rules: this.age.rules },
        { field: this.amount, rules: this.amount.rules }
      ]

      const isValid = validateAndMutate(options);

      this.status = isValid ? "success" : "error";

    }

  }

}
</script>
