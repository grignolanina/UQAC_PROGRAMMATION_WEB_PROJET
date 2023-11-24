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
import {getDate} from "../rules.js";
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
			// const minLength = 8;
			// const hasUppercase = /[A-Z]/.test(password);
			// const hasNumber = /\d/.test(password);
			// const hasSpecialCharacter = /[!@#$%&?]+/.test(password);
			// const hasTwoConsecutiveNumbers = /\d{2}/.test(password);
			// const upperCaseIsFirst = /^[A-Z]/.test(password);
			// const isSumOfNumbers21 = password
			// 							.split("") // Divise la chaîne en un tableau de caractères
			// 							.filter(char => /\d/.test(char)) // Filtre uniquement les chiffres
			// 							.reduce((acc, curr) => acc + parseInt(curr), 0) === 21; // Additionne les chiffres
			//const hasRainbowColors = /rouge|orange|jaune|vert|bleu|violet/.test(password);
			const hasPoutineIngredients = /frites|sauce|fromageSquishSquish/i.test(password);
			const hasPoutineIngredientsWithUppercase = /frites|sauce|fromageSquishSquish/i.test(password) && /[A-Z]/.test(password);
			const meetsRequirementsPoutine = hasPoutineIngredients && hasPoutineIngredientsWithUppercase;
			const containsCurrentDate = new RegExp(getDate()).test(password);
			const numericChars = password.match(/\d/g);
			const secondAndBeforeLastDigitsAreOdd =
				numericChars &&
				numericChars.length >= 2 &&
				parseInt(numericChars[1]) % 2 !== 0 &&
				parseInt(numericChars[numericChars.length - 2]) % 2 !== 0;


				
			return /*password.length >= minLength && hasUppercase && hasNumber && hasSpecialCharacter && hasTwoConsecutiveNumbers && upperCaseIsFirst && isSumOfNumbers21 && hasRainbowColors && */hasPoutineIngredients && meetsRequirementsPoutine && containsCurrentDate && secondAndBeforeLastDigitsAreOdd;
		},

		rulesCheck(password) {
			// const minLength = 8;
			// const hasUppercase = /[A-Z]/.test(password);
			// const hasNumber = /\d/.test(password);
			// const hasSpecialCharacter = /[!@#$%&?]+/.test(password);	
			// const hasTwoConsecutiveNumbers = /\d{2}/.test(password);
			//const upperCaseIsFirst = /^[A-Z]/.test(password);
			// const isSumOfNumbers21 = password
			// 							.split("") // Divise la chaîne en un tableau de caractères
			// 							.filter(char => /\d/.test(char)) // Filtre uniquement les chiffres
			// 							.reduce((acc, curr) => acc + parseInt(curr), 0) === 21; // Additionne les chiffres
			//const hasRainbowColors = /rouge|orange|jaune|vert|bleu|violet/.test(password);
			const hasPoutineIngredients = /frites|sauce|fromageSquishSquish/i.test(password);
			const hasPoutineIngredientsWithUppercase = /frites|sauce|fromageSquishSquish/i.test(password) && /[A-Z]/.test(password);
			const meetsRequirementsPoutine = hasPoutineIngredients && hasPoutineIngredientsWithUppercase;
			const containsCurrentDate = new RegExp(getDate()).test(password);
			const numericChars = password.match(/\d/g);
			const secondAndBeforeLastDigitsAreOdd =
				numericChars &&
				numericChars.length >= 2 &&
				parseInt(numericChars[1]) % 2 !== 0 &&
				parseInt(numericChars[numericChars.length - 2]) % 2 !== 0;
			// if (password.length < minLength) {
			// 	return "Le mot de passe doit avoir une longueur d'au moins 8 caractères.";
			// }

			// if (!hasUppercase) {
			// 	return "Le mot de passe doit contenir au moins une lettre majuscule.";
			// }

			// if (!hasNumber) {
			// 	return "Le mot de passe doit contenir au moins un chiffre.";
			// }
			// if (!hasSpecialCharacter) {
			// 	return "Le mot de passe doit contenir au moins un caractère spécial : !@#$%&?.";
			// }
			// if (!hasTwoConsecutiveNumbers) {
			// 	return "Le mot de passe doit contenir deux chiffres consécutifs.";
			// }
			// if (!upperCaseIsFirst) {
			// 	return "Le mot de passe doit commencer par la lettre majuscule. Une phrase commence toujours par une majuscule !";
			// }
			// if (!isSumOfNumbers21) {
			// 	return "La somme des chiffres du mot de passe doit être égale à 21.";
			// }
			// if (!hasRainbowColors) {
			// 	return "Le mot de passe doit contenir au moins une couleur de l'arc-en-ciel : rouge, orange, jaune, vert, bleu, violet.";
			// }
			if (!hasPoutineIngredients) {
				return "Le mot de passe doit contenir au moins un ingrédient de la poutine : Frites, Sauce, FromageSquishSquish.";
			}
			if (!meetsRequirementsPoutine) {
				return "L'ingrédient de la poutine s'écrit avec une majuscule ! On respecte la poutine !";
			}
			if (!containsCurrentDate) {
				return "Le mot de passe doit contenir la date du jour. (JJ/MM/AAAA))";
			}
			if (!secondAndBeforeLastDigitsAreOdd) {
				return "Le deuxième et l'avant-dernier chiffre du mot de passe doivent être impairs.";
			}


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
