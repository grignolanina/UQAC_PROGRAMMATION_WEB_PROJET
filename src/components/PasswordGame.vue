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
import { isIngredientPoutineWithUppercase, getDate, checkOdsNumbersRule} from "@/rules";

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
				{message : "Le deuxième et l'avant-dernier chiffre du mot de passe doivent être impairs.", test: password=> checkOdsNumbersRule(password)},
				{ message:"Le mot de passe doit contenir la date du jour. (JJ/MM/AAAA))", test: password => new RegExp(getDate()).test(password)},
				{ message: "L'ingrédient de la poutine s'écrit avec une majuscule ! On respecte la poutine !", 
				test: password => {
					const hasPoutineIngredients = /frites|sauce|fromageSquishSquish/i.test(password);
					return isIngredientPoutineWithUppercase(hasPoutineIngredients, password);
				}},
				{ message: "Le mot de passe doit contenir au moins un ingrédient de la poutine : Frites, Sauce, FromageSquishSquish.", test: password => /frites|sauce|fromageSquishSquish/i.test(password) },
				{message : "Le mot de passe doit contenir au moins une couleur de l'arc-en-ciel : rouge, orange, jaune, vert, bleu, violet.", test: password=> /rouge|orange|jaune|vert|bleu|violet/.test(password)},
				{message : "La somme des chiffres du mot de passe doit être égale à 21.", 			test:password=>password
									.split("") // Divise la chaîne en un tableau de caractères
									.filter(char => /\d/.test(char)) // Filtre uniquement les chiffres
									.reduce((acc, curr) => acc + parseInt(curr), 0) === 21},
				{message : "Le mot de passe doit commencer par la lettre majuscule. Une phrase commence toujours par une majuscule !", test: password=> /^[A-Z]/.test(password)},
				{message : "Le mot de passe doit contenir deux chiffres consécutifs.", test: password=> /\d{2}/.test(password)},
				{message : "Le mot de passe doit contenir au moins un caractère spécial : !@#$%&?.", test: password=> /[!@#$%&?]+/.test(password)},
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
			//console.log("Règles résolues :", this.resolvedMessages);
			return failingRule ? `Échec : ${failingRule.message}` : "ok";
		},
	},
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
  