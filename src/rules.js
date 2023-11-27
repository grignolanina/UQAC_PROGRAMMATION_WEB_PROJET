export function isIngredientPoutineWithUppercase(hasPoutineIngredients, password) {
    const ingredientsRegex = /(frites|sauce|fromageSquishSquish)/i;
    const hasPoutineIngredientsWithUppercase = ingredientsRegex.test(password) && /[A-Z]/.test(password.match(ingredientsRegex)[0][0]);
    const meetsRequirementsPoutine = hasPoutineIngredients && hasPoutineIngredientsWithUppercase;
    return meetsRequirementsPoutine;
}


export function getDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    return `${day}/${month}/${year}`;
}

export function checkOdsNumbersRule(password) {
    const numericChars = password.match(/\d/g);
    const secondAndBeforeLastDigitsAreOdd =
        numericChars &&
        numericChars.length >= 2 &&
        parseInt(numericChars[1]) % 2 !== 0 &&
        parseInt(numericChars[numericChars.length - 2]) % 2 !== 0;
    return secondAndBeforeLastDigitsAreOdd;
}


