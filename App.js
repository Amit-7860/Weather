const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const API_key = "af2a308a4b979c7e1b169168cfc052f4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("error");
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "clouds.jpeg";
                break;
            case 'Clear':
                weather_img.src = "clear.jpeg";
                break;
            case 'Rain':
                weather_img.src = "rain.jpeg";
                break;
            case 'Mist':
                weather_img.src = "mist.jpg";
                break;
            case 'Snow':
                weather_img.src = "snow.jpeg";
                break;
        }

        console.log(weather_data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
