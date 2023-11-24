<template>
	<div class="password-game">
		<h1>Password Game</h1>
		<input v-model="userInput" @input="handleInput" placeholder="Enter your guess">
		<ErrorMessage v-if="userInput" :result="result" :isResolved="isResolved" />
		<SuccesMessage v-for="resolvedMessage in newResolvedMessage" :key="resolvedMessage" :message="resolvedMessage" />
	</div>
</template>
  
<script>
import ErrorMessage from "./ErrorMessage.vue";
import SuccesMessage from "./SuccesMessage.vue";

export default {
	components: {
		ErrorMessage,
		SuccesMessage
	},
	props: {
		hint: String
	},
	data() {
		return {
			userInput: "",
			result: "",
			isResolved: false,
			resolvedMessages: [],
		};
	},
	computed: {
		newResolvedMessage: function () {
			return this.resolvedMessages.filter(message => !message.includes("echec"));
		}
	},

	methods: {
		handleInput() {
			if (this.isValidPassword(this.userInput)) {
				alert("Vous avez gagné !");
				this.isResolved = true;
				this.userInput = "";
			} else {
				this.result = this.rulesCheck(this.userInput);
				this.isResolved = false;
			}
		},
		isValidPassword(password) {
			const minLength = 8;
			const hasUppercase = /[A-Z]/.test(password);
			const hasNumber = /\d/.test(password);

			return password.length >= minLength && hasUppercase && hasNumber;
		},

		rulesCheck(password) {
			const minLength = 8;
			const hasUppercase = /[A-Z]/.test(password);
			const hasNumber = /\d/.test(password);

			// const rules = ["Résolu : Le mot de passe doit avoir une longueur d'au moins 8 caractères.", "Résolu : Le mot de passe doit contenir au moins une lettre majuscule.", "Résolu : Le mot de passe doit contenir au moins un chiffre."]

			// for (let i = 0; i < rules.length; i++) {
			// 	if (password.length > minLength && !this.resolvedMessages.includes(rules[i])) {
			// 		this.resolvedMessages.push(rules[i]);
			// 	}
			// 	if (password.length < minLength && this.resolvedMessages.includes(rules[i])) {
			// 		const index = this.resolvedMessages.indexOf(rules[i]);
			// 		this.resolvedMessages[index] += " echec";
			// 	}

			// 	if (hasUppercase && !this.resolvedMessages.includes(rules[i])) {
			// 		this.resolvedMessages.push(rules[i]);
			// 	}
			// 	if (!hasUppercase && this.resolvedMessages.includes(rules[i])) {
			// 		const index = this.resolvedMessages.indexOf(rules[i]);
			// 		this.resolvedMessages[index] += " echec";
			// 	}

			// 	if (hasNumber && !this.resolvedMessages.includes(rules[i])) {
			// 		this.resolvedMessages.push(rules[i]);
			// 	}
			// 	if (!hasNumber && this.resolvedMessages.includes(rules[i])) {
			// 		const index = this.resolvedMessages.indexOf(rules[i]);
			// 		this.resolvedMessages[index] += " echec";
			// 	}
			// }

			// //pour pas ajouter 2 fois
			if (password.length > minLength && !this.resolvedMessages.includes("Résolu : Le mot de passe doit avoir une longueur d'au moins 8 caractères.")) {
				this.resolvedMessages.push("Résolu : Le mot de passe doit avoir une longueur d'au moins 8 caractères.");
			}

			if (password.length < minLength) {

				if (this.resolvedMessages.includes("Résolu : Le mot de passe doit avoir une longueur d'au moins 8 caractères.")) {
					const index = this.resolvedMessages.indexOf("Résolu : Le mot de passe doit avoir une longueur d'au moins 8 caractères.");
					this.resolvedMessages[index] += " echec";
				}

				return "Le mot de passe doit avoir une longueur d'au moins 8 caractères.";
			}

			if (hasUppercase && !this.resolvedMessages.includes("Résolu : Le mot de passe doit contenir au moins une lettre majuscule.")) {
				this.resolvedMessages.push("Résolu : Le mot de passe doit contenir au moins une lettre majuscule.");
			}


			if (!hasUppercase) {

				if (this.resolvedMessages.includes("Résolu : Le mot de passe doit contenir au moins une lettre majuscule.")) {
					const index = this.resolvedMessages.indexOf("Résolu : Le mot de passe doit contenir au moins une lettre majuscule.");
					this.resolvedMessages[index] += " echec";
				}

				return "Le mot de passe doit contenir au moins une lettre majuscule.";
			}


			if (hasNumber && !this.resolvedMessages.includes("Résolu : Le mot de passe doit contenir au moins un chiffre.")) {
				this.resolvedMessages.push("Résolu : Le mot de passe doit contenir au moins un chiffre.");
			}

			if (!hasNumber) {

				if (this.resolvedMessages.includes("Résolu : Le mot de passe doit contenir au moins un chiffre.")) {
					const index = this.resolvedMessages.indexOf("Résolu : Le mot de passe doit contenir au moins un chiffre.");
					this.resolvedMessages[index] += " echec";
				}

				return "Le mot de passe doit contenir au moins un chiffre.";
			}







			return "ok";
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

input {
	width: 80%;
	padding: 2% 2%;
	border-radius: 15px;
	cursor: pointer;
}
</style>
  