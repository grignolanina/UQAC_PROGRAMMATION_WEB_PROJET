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

export const getSunsetTime = async function() {
    const response = await fetch("https://api.sunrise-sunset.org/json?lat=45.504814179128&lng=-73.58723572207455&date=today");
    if (response.status == 200) {
    return response.json()
    } else {
    new Error(response.statusText)
    }
}

export function compareRealSunsetTimeToUserInput(sunsetTime, userInput) {
    
    const regex = /(\d{1,2}:\d{2})/;
    const match = userInput.match(regex);
    if (match) {
        const userInputArray = match[0].split(':').map(part => parseInt(part, 10));
        const [userHours, userMinutes] = userInputArray;

        let sunsetHours = sunsetTime[0];
        let sunsetMinutes = sunsetTime[1]; 

        const timeDifference = Math.abs((userHours - sunsetHours) * 60 + (userMinutes - sunsetMinutes));
        const isWithinMargin = timeDifference <= 2;
        
        return isWithinMargin;
    }
}




