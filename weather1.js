const apiKey = "8799301b44bf8147a9df9663f8d6c38a";        // => Clé API aprés inscription
const currentWeatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;  // => URL pour récupérer APi avec clé api et unité de mesure dans l'url
const geocodingAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?appid=${apiKey}`;  // => Url de l'API pour trouver la localisation d'une ville d'aprés son nom

document.getElementById("searchBtn").addEventListener("click", function() {  // => Evenement click placé sur le bouton Chercher
	afficherMeteo(document.getElementById("nom-localite").value, "weather");  // => L'événement effectue la fonction afficherMeteo avec comme 1er parametre la valeur entrée dans input et comme 2e parametre weather ???
} );

function afficherMeteo(name, elementId) {  // => fonction qui engloble toute la requéte avec 2 paramétres
	
	fetch(geocodingAPIUrl + `&q=${name}`)    // => Fetch qui appel l'url de l'API de geolocalisation selon la querie 'name' entré dans l'input
		.then( response => response.json())    // => "Alors" si la promesse est tenue, on récupére le fichier json avec toutes les données
		.then(data => {                        // => "Alors" si la promesse est tenue et le fichier json récupéré, on récupére les données souhaitées
			const latitude = data[0].lat;        // => On récupére la donnée latitude dans le fichier json et on la stocke dans la variable longitude
			const longitude = data[0].lon;       // => On récupére la donnée longitude dans le fichier json et on la stocke dans la variable longitude
			return fetch(currentWeatherAPIUrl + `&lat=${latitude}&lon=${longitude}`)  // => Si toutes les conditions sont résolues on retourne le Fetch principal qui appel l'API avec la clé, l'unité de mesure, la latitude et la longitude
		})
    
		.then(response => response.json())     // => Toutes les promesses des 2 fetchs sont tenues, "Alors" on peut récupérer le fichier json demandé
		.then(data => {                        // => Toutes les promesses des 2 fetchs sont tenues, "Alors" on peut récupérer toutes les données souhaitées
			const temperature = data.main.temp;  // => On récupére la donnée temp et on la stocke dans la variable temperature
			const description = data.weather[0].description;    // => On récupére la donnée description et on la stocke dans la variable description
			const weatherElement = document.getElementById(elementId); // => On récupére l'élement avec l'id elementId et on le stocke dans la variable weatherElement
			weatherElement.innerHTML = `A  ${name} il fait actuellement ${temperature} 
                             degrés Celsius avec ${description}.`;                // => On injecte du contenu HTML dans la variable weatherElement avec une chaine de caractére concatenée avec les données nom, temp et description
		})
    
		.catch( err => {                                                // => En cas d'erreur si la promesse est rompue, on "attrape" l'erreur
			const weatherElement = document.getElementById(elementId);    // => On récupére alors la variable weatherElement 
			weatherElement.innerHTML = `Erreur ${err.message}`;           // => On stocke un message d'erreur dans la variable weatherElement
		});
}