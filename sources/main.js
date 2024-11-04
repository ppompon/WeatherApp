const formInput = document.querySelector(".formInput");
const submitButton = document.querySelector(".formButton");
const weatherForm = document.querySelector(".weatherForm");
const apiKey = "2c1e03bae79552b6e05a1e42c81d64ea";


weatherForm.addEventListener("submit", event => {
// Try -> call getWeatherData(city);
// Catch -> call displayError();

event.preventDefault();
const city = formInput.value;

 try {
     getWeatherData(city);
 } catch (error) {
    console.log(error);
 }
});

async function getWeatherData(city){
    const cityAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(cityAPI);
    console.log(response);

    if(!response.ok) {
        displayError();
    }

    const cityData = await response.json();
    console.log(cityData);
}

function displayInfo(){
 // Display weather info;
 // Create html elements (cityData values);
}

function displayError(){
// Display errors (undefined/uncaught cities);

console.log("Found an Error!!!");
}