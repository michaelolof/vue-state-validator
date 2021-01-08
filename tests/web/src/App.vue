<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">One</router-link> |
      <router-link to="/two">Two</router-link> |
      <router-link to="/three">Three</router-link> |
      <router-link to="/four">Four</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style>
.form {
  text-align: left;
  width: 350px;
  margin: 2% auto;
}

.form__group {
  margin-bottom: 25px;
}

.form__label {
  display: block;
  margin-bottom: 5px;
}

.form__input {
  padding: 8px 10px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}

.form__submit {
  display: block;
  padding: 8px 0;
  width: 100%;
  cursor: pointer;
}

.notification {
  background-color: papayawhip;
  color: black;
  padding: 10px;
}

.notification__success {
  background-color: #4BB543;
  color: white;
}

.notification__error {
  background-color: #ED4337;
  color: white;
}

.text-error {
  color: #cc0000;
  font-size: 12px;
  display: inline-block;
  margin-top: 4px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
