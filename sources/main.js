const formInput = document.querySelector(".formInput");
const submitButton = document.querySelector(".formButton");
const weatherForm = document.querySelector(".weatherForm");
const card = document.querySelector(".card");
const apiKey = "2c1e03bae79552b6e05a1e42c81d64ea";


weatherForm.addEventListener("submit", event => {
event.preventDefault();
const city = formInput.value;
let message = "";

if (city) {
    try {
        getWeatherData(city);
    } catch (error) {
        message = error;
        displayError(message);
    }
} else {
    message = "Please enter a city";
    displayError(message);
}
});

async function getWeatherData(city){
    const cityAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(cityAPI);
    const data = await response.json();
    let message = "";

    if (!response.ok) {
        message = "Couldn't find any resource.";
        displayError(message);
        return
    }
    return displayInfo(data);
}

function displayError(message){
    card.textContent = "";
    card.style.display = "flex";
    
    let errorValue = message;

    let errorDisplay = document.createElement("p");
    errorDisplay.textContent = errorValue;
    errorDisplay.classList.add("desc");

    card.appendChild(errorDisplay);
}

function displayInfo(data){
    card.textContent = "";
    card.style.display = "flex";
    
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `humidity: ${humidity}%`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = displayEmoji(id);

    cityDisplay.classList.add("city");
    tempDisplay.classList.add("temp");
    humidityDisplay.classList.add("humidity");
    descDisplay.classList.add("desc");
    emojiDisplay.classList.add("emoji");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
}

function displayEmoji(id){
    switch (true) {
        case (id >= 200 && id < 300):
            return "⛈️";
        case (id >= 300 && id < 600):
            return "🌧️";
        case (id >= 600 && id < 700):
            return "❄️";   
        case (id >= 700 && id < 800):
            return "🌫️";
        case (id >= 801 && id < 810):
            return "⛅";  
        case (id === 800):
            return "☀️";   
        default:
            return "❓";
    }
}