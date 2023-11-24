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
			rules: [
				{ message: "Le mot de passe doit contenir au moins un chiffre.", test: password => /\d/.test(password) },
				{ message: "Le mot de passe doit contenir au moins une lettre majuscule.", test: password => /[A-Z]/.test(password) },
				{ message: "Le mot de passe doit avoir une longueur d'au moins 8 caractères.", test: password => password.length >= 8 },
			],
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
			return this.rules.every(rule => rule.test(password));
		},

		rulesCheck(password) {
			let failingRule = null;
			this.resolvedMessages = [];

			for (const rule of this.rules) {
				const { message, test } = rule;

				if (!test(password)) {
					failingRule = rule;
					this.resolvedMessages.push(`${message} echec`);
				} else {
					this.resolvedMessages.push(`Résolu : ${message}`);
				}
			}

			return failingRule ? `Échec : ${failingRule.message}` : "ok";
		},

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
  