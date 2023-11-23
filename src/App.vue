<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

  <PasswordGame :correctPassword="correctPassword" :hint="hint" />

  <!-- <div class="container">
    <h1>Password Game</h1>
    <p id="hint">Hint: Some Hint Text</p>
    <input type="text" id="passwordInput" placeholder="Enter your guess">
    <button onclick="checkPassword()">Submit</button>
    <p id="result"></p>
  </div> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import PasswordGame from './components/PasswordGame.vue';


export default {
  name: 'App',
  components: {
    // HelloWorld
    PasswordGame
  },
  data() {
    return {
      correctPassword: "secret",
      hint: "Some Hint Text"
    }
  }
}

//CODE CHAT GPT 
//const correctPassword = "secret";
// const hint = "Some Hint Text";

// function checkPassword() {
//   const userInput = document.getElementById("passwordInput").value;
//   const resultMessage = document.getElementById("result");

//   if (userInput.toLowerCase() === correctPassword) {
//     resultMessage.textContent = "Congratulations! You guessed the password!";
//   } else {
//     resultMessage.textContent = "Incorrect password. Try again.";
//   }
// }

// document.getElementById("hint").textContent = "Hint: " + hint;

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
