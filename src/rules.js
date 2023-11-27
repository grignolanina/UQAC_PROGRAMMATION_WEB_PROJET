export function getDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    return `${day}/${month}/${year}`;
}

export async function getSunsetTime() {
    try {
        const response = await fetch('https://api.sunrise-sunset.org/json?lat=45.504814179128&lng=-73.58723572207455&date=today');
        const data = await response.json();
        const sunsetTime = data.results.sunset; 
        const sunsetTimeArray = sunsetTime.split(':');
        const sunsetHours = parseInt(sunsetTimeArray[0], 10);
        const sunsetMinutes = parseInt(sunsetTimeArray[1], 10);
        return [sunsetHours, sunsetMinutes];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function checkSunsetTime(userInput) {
    const userInputArray = userInput.split(':').map(part => parseInt(part, 10));
    const [userHours, userMinutes] = userInputArray;
    console.log(`L'heure saisie par l'utilisateur est ${userHours}:${userMinutes}`);

    // Attendre que la promesse de getSunsetTime soit résolue
    const sunsetTime = await getSunsetTime();
    const [sunsetHours, sunsetMinutes] = sunsetTime;
    console.log(`L'heure du coucher du soleil est ${sunsetHours}:${sunsetMinutes}`);

    // Calculer la différence en minutes entre l'heure saisie par l'utilisateur et l'heure réelle du coucher du soleil
    const timeDifference = Math.abs((userHours - sunsetHours) * 60 + (userMinutes - sunsetMinutes));
    console.log(`La différence entre l'heure saisie par l'utilisateur et l'heure réelle du coucher du soleil est de ${timeDifference} minutes.`);

    // Autoriser une marge d'erreur de plus ou moins deux minutes
    const isWithinMargin = timeDifference <= 2;

    console.log(`L'heure saisie par l'utilisateur est-elle correcte? ${isWithinMargin}`);
    return isWithinMargin;
}

export function extractSunsetTimeFromPassword(password) {
    // Utilisez une expression régulière pour trouver l'heure dans le mot de passe
    const regex = /(\d{1,2}:\d{2})/;
    const match = password.match(regex);

    // Si une correspondance est trouvée, renvoyez l'heure, sinon renvoyez null
    return match ? match[1] : null;
}

export function isSunsetTimeValid(password, sunsetTime) {
    const sunsetTimeFromPassword = extractSunsetTimeFromPassword(password);

    if (sunsetTimeFromPassword) {
        const isSunsetTimeCorrect = checkSunsetTime(sunsetTimeFromPassword, sunsetTime);
        return isSunsetTimeCorrect;
    } else {
        // Aucune heure n'a été trouvée dans le mot de passe
        return false;
    }
}

