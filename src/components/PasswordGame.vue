<template>
	<div class="password-game">
		<h1>Password Game</h1>
		<p :text="'Hint: ' + hint"></p>
		<input v-model="userInput" placeholder="Enter your guess">
		<button @click="checkPassword">Submit</button>
		<p>{{ result }}</p>
	</div>
</template>
  
<script>
export default {
	props: {
		hint: String
	},
	data() {
		return {
			userInput: "",
			result: ""
		};
	},
	methods: {
		checkPassword() {
			if (this.isValidPassword(this.userInput)) {
				this.result = "Congratulations! You entered a valid password!";
			} else {
				this.result = "Invalid password. Please check the rules and try again.";
			}
		},
		isValidPassword(password) {
			// Définissez vos règles de validation ici
			// Exemple de règles : longueur minimale de 8 caractères, au moins une lettre majuscule et un chiffre
			const minLength = 8;
			const hasUppercase = /[A-Z]/.test(password);
			const hasNumber = /\d/.test(password);

			return password.length >= minLength && hasUppercase && hasNumber;
		}
	}
};
</script>
  
<style scoped></style>
  