<template>
	<div class="password-game">
		<h1>Password Game</h1>
		<div class="form-password">
			<p :text="'Hint: ' + hint"></p>
			<input v-model="userInput" @input="handleInput" placeholder="Enter your guess">
		</div>

		<ErrorMessage :result="result" />
	</div>
</template>

<script>
import ErrorMessage from "./ErrorMessage.vue";

export default {
	components: {
		ErrorMessage
	},
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
		handleInput() {
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

<style scoped>
.password-game {
	width: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: auto;
}

.form-password {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
}

input {
	width: 50%;
	height: 30px;
	border-radius: 5px;
	border: 1px solid #ccc;
	margin: auto;
}
</style>
