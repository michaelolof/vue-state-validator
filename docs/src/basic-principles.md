# Basic Principles

VueStateValidator reports validation errors on 2 guiding principles. It believes your forms can only fail validation because they are **empty** or **wrong**.

These 2 simple rules allow the library to be unassuming and minimalistic in its approach.


We represent emptiness with the `$isEmpty` field. \
We represent wrongness with the `$isWrong` field. \
These 2 fields will be attached if validation fails when you call the `validateAndMutate` function. \
Only 1 of `$isEmpty` or `$isWrong` field will be attached at a time.
<br><br>
The last field which will always be attached if validation fails is the `$rule` field. \
The `$rule` field simply says which rule failed validation.
This allows us narrow down where our validation failed for more streamlined reporting.

<br><br>
Take a look. Our ealier example can be extended to look like this:

```vue
<template>
  <form>
    <label for="name">Enter your name</label>
    <input name="name" v-model="fullname.value" placeholder="Firstname Lastname" />
    <span v-if="fullname.$isEmpty">Please enter your fullname.</span>
    <span v-else-if="fullname.$isWrong && fullname.$rule === 'wordRange'">Your fullname can only be your firstname and lastname</span>
    <span v-else-if="fullname.$isWrong && fullname.$rule === 'charRange'">Your name must be between 3 and 20 characters</span>
    <span v-else-if="fullname.$isWrong">Please enter a valid fullname.</span>

    <button @click="submit" type="submit">Save</button>
  </form>
<template>
```

This way, we can inform our users exactly why and where their validation failed.