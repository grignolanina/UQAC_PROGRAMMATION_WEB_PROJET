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
			result: "",
		};
	},
	methods: {
		checkPassword() {
			if (this.isValidPassword(this.userInput)) {
				this.result = "Félicitations ! Tu as entré un mot de passe correct !";
			} else {
				this.result = this.rulesCheck(this.userInput);
			}
		},
		isValidPassword(password) {
			const minLength = 8;
			const hasUppercase = /[A-Z]/.test(password);
			const hasNumber = /\d/.test(password);
			// const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

			return password.length >= minLength && hasUppercase && hasNumber; //&& hasSpecialCharacter;
		},

		rulesCheck(password) {
			const minLength = 8;
			const hasUppercase = /[A-Z]/.test(password);
			const hasNumber = /\d/.test(password);
			// const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);	

			if (password.length < minLength) {
				return "Le mot de passe doit avoir une longueur d'au moins 8 caractères.";
			}

			if (!hasUppercase) {
				return "Le mot de passe doit contenir au moins une lettre majuscule.";
			}

			if (!hasNumber) {
				return "Le mot de passe doit contenir au moins un chiffre.";
			}
			// if (!hasSpecialCharacter) {
			// 	return "Le mot de passe doit contenir au moins un caractère spécial.";
			// }

			return "error";
		}


	}
};
</script>
  
<style scoped></style>
  