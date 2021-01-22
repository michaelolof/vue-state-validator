<template>
  <div class="home">

    <form @submit.prevent="submit" class="form">

      <div class="form__group">
        <div v-if="status === 'success'" class="notification notification__success">You have successfully filled your form</div>
        <div v-else-if="status === 'error'" class="notification notification__error">You did not pass validation</div>
      </div>      

      <div class="form__group">
        <label for="fullname" class="form__label">Account number</label>
        <input v-model="accountNo.value" name="accountNo" v-vsv-length="10" v-vsv-allow.numeric class="form__input" type="text" placeholder="2033911100" autocomplete="off" />
        <span v-if="vsv.accountNo && vsv.accountNo.$isEmpty" class="text-error">Please an account number</span>
        <span v-else-if="vsv.accountNo && vsv.accountNo.$isWrong" class="text-error">Please enter a valid account number</span>
      </div>

      <div class="form__group">
        <label for="age" class="form__label">Bank</label>
        <select v-model="bank.value" v-vsv-on.change.change="{ target: bank, rules: bank.rules }" class="form__input">
          <option :value="undefined">Select a bank</option>
          <option v-for="(bank, n) in banks" :key="n" :value="bank">{{ bank.name }}</option>
        </select>
        <span v-if="vsv.bank && vsv.bank.$isEmpty" class="text-error">Please select a bank</span>
      </div>

      <div class="form__group">
        <label for="amount" class="form__label">Amount</label>
        <input v-model="amount.value" v-vsv-on.blur.input="{ target: amount, rules: amount.rules }" name="amount" class="form__input" type="tel" autocomplete="off" />
        <span v-if="vsv.amount && vsv.amount.$isEmpty" class="text-error">Please enter an amount</span>
        <span v-else-if="vsv.amount && vsv.amount.$isWrong && amount.$rule === 'range'" class="text-error">Please enter an amount between 100 and 100,000</span>      
        <span v-else-if="vsv.amount && vsv.amount.$isWrong" class="text-error">Please enter a valid amount</span>      
      </div>

      <div class="form__group">
        <button class="form__submit">Submit</button>
      </div>
    
    </form>
  </div>
</template>

<script>
//@ts-ignore
import { charRange, max, min, required, wordRange, validateAndMutate, range, numeric, alpha, getErrors, isEmpty } from '../../../../dist';

export default {

  data() {
    return {
      accountNo: { 
        value: undefined, 
        rules: [required, charRange(10,10)] 
      },
      bank: { 
        value: undefined, 
        rules: [required ] 
      },
      amount: { 
        value: undefined, 
        rules: [required, numeric, range(100,100_000)] 
      },
      status: undefined,
      banks: [
        { code: "044", name: "Bank O01" },
        { code: "144", name: "Bank of Sathern" },
        { code: "204", name: "Luvancci Banker" },
        { code: "124", name: "Moon Bank" },
        { code: "406", name: "Rewrite Bank" },
      ],
      vsv: {},
    }
  },

  methods: {

    submit() {
      const options = {
        accountNo: { value: this.accountNo.value, rules: this.accountNo.rules },
        bank: { value: this.bank.value, rules: this.bank.rules },
        amount: { value: this.amount.value, rules: this.amount.rules },
      }

      this.vsv = getErrors(options);

      this.status = isEmpty(this.vsv) ? "success" : "error";

    }

  }

}
</script>
