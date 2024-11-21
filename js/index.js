const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "1d935c7b20e5c7121814f87a5dde963f";

weatherForm.addEventListener('submit',async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter A City Name");
    }

});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could Not Fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city, 
           main: {temp, humidity},
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = city;
    card.appendChild(cityDisplay);
    cityDisplay.classList.add('cityDisplay');

    tempDisplay.textContent = `${((temp -273.15) * 9/5 + 32).toFixed(1)}°F`;
    card.appendChild(tempDisplay);
    tempDisplay.classList.add('tempDisplay');

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    card.appendChild(humidityDisplay);
    humidityDisplay.classList.add('humidityDisplay');

    descDisplay.textContent = description;
    card.appendChild(descDisplay);
    descDisplay.classList.add('descDisplay');


    weatherEmoji.textContent = getWeatherEmoji(id);
    card.appendChild(weatherEmoji);
    weatherEmoji.classList.add('weatherEmoji');



}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
            
        case (weatherId >= 300 && weatherId < 400):
                return "🌧️";
               
        case (weatherId >= 400 && weatherId < 500):
                    return "🌧️";
                    
        case (weatherId >= 600 && weatherId < 700):
                    return "❄️";
                    
         case (weatherId >= 700 && weatherId < 800):
                    return "🌫️";
                    
        case (weatherId === 800):
                    return "🔆";

        case (weatherId >= 801 && weatherId < 810):
                    return "☁️";
        default: return "?";
                    
    }
}

function displayError(Message){
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = Message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}
