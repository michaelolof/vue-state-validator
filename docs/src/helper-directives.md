# Helper Directives

This library also comes with a couple of helper directives to simplify common validation problems


## v-vsv-on 
`v-vsv-on.[validateModifier].[invalidateModifier]="[MutatingValidatorOption]"`

This helper directive allows you directly bind a validation rule to an input element.

```html
<template>
  <input v-model="age.value" v-vsv-on.blur.focus="{ value: age.value, rules: age.rules, err: age }">
  <span v-if="age.$isEmpty">Please enter your age.</span>
  <span v-else-if="age.$isWrong">Please enter a valid age between 18 and 45 years</span>
</template>

<script>
  export default {
    data() {
      return {
        age: { 
          value: undefined, 
          rules: [required, numeric, range(18, 45)] 
        },
      }
    }
  }
</script>
```
In the above example, the validator will **run/validate** against the rules passed when you `blur` out of the input element. And the validation will **clear/invalidate** when you `focus` back on the input element.

Both the `[validateModifier]` and `[invalidateModifier]` are optional. 

When only the `[validateModifier]` is passed, It will validate but not invalidate.
```html
<!-- This will validate as you're typing (i.e on input) -->
<input v-model="age" v-vsv-on.input="{ value: age.value, rules: age.rules, err: age }">
```

When none of the modifiers are passed, It will only validate on `blur`
```html
<!-- This will by default validate on blur but not invalidate -->
<input v-model="age" v-vsv-on="{ value: age.value, rules: age.rules, err: age }">
```

A shortand syntax is also supported where you can use an array instead of an object
```html
<!-- value has to be the first, rules second and err third -->
<input v-model="age" v-vsv-on="[ age.value, age.rules, age ]">
```
The shorthand syntax has the following order.
```html
<input v-model="age" v-vsv-on="[ <value>, <rules>, <err>, <validateIf> ]">
```

<br><br>

## v-vsv-prevent
`v-vsv-prevent.[ruleModifier]`

This helper directive allows you define characters you don't want to allow in an input element.

```html
<input v-vsv-prevent.numeric />
```
The above will prevent all numbers from being entered.

```html
<input v-vsv-prevent.match="/[a-zA-Z]/" />
```
The above will prevent all characters that match this regex expression (i.e all uppercase and lowercase letters) from being entered. \
Allowed modifiers are: **`alpha`**, **`numeric`**, **`alphaNumeric`**, **`integer`**, **`match`**

<br><br>

## v-vsv-allow
`v-vsv-allow.[ruleModifier]`

This directive does the opposite of `v-vsv-prevent` and allows only the characters that fit the modifier being used.
Just like `v-vsv-prevent`, allowed modifiers include **`alpha`**, **`numeric`**, **`alphaNumeric`**, **`integer`**, **`match`**

```html
<input v-vsv-allow.numeric />
```
The above will allow ONLY numbers to be entered.

<br><br>

## v-vsv-max
`v-vsv-max="[max]"`

This directive will place a maximum limit on the value of your input element. Best used for numeric inputs
```html
<input v-model="amount.value" v-vsv-max="100000" />
```

<br><br>

## v-vsv-length
`v-vsv-length="[maxLength]"`
```html
<input v-model="fullname.value" v-vsv-length="20" />
```
This will place a maximum limit on the length of characters of your input element
<br>