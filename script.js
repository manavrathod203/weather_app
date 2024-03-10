const API_KEY = "4f1aa96e471132195cf2938c3c3f1623";

function getWeather() {
    // const API_KEY = "4f1aa96e471132195cf2938c3c3f1623";
    const city = document.querySelector('#city').value;

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(currentWeatherURL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayWeather(data)
        })
        .catch(err => {
            console.log('Error handling current weather data: ', err);
            alert('Error fetching current weather data')
        })

    fetch(forecastURL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayForecast(data.list)
        })
        .catch(err => {
            console.log('Error handling forecast data: ', err);
            alert('Error fetching forecast data')
        })

}

function displayWeather(data) {
    const weatherIcon = document.querySelector('#weatherIcon');
    const temp = document.querySelector('#temp');
    const location = document.querySelector('#location');
    const des = document.querySelector('#des');
    const humidity = document.querySelector('#humidity');
    const wind = document.querySelector('#wind');
    const sunrisePlaceholder = document.querySelector('#sunrise');
    const sunsetPlaceholder = document.querySelector('#sunset');

    const sunriseTime = new Date(data.sys.sunrise * 1000); // Convert timestamp to milliseconds
    const sunrise = sunriseTime.getHours();

    const sunsetTime = new Date(data.sys.sunset * 1000); // Convert timestamp to milliseconds
    const sunset = sunsetTime.getHours();

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    temp.textContent = `${Math.round(data.main.temp)} °c`;
    location.textContent = `${data.name}, ${data.sys.country}`;
    des.textContent = `${data.weather[0].description}`;
    humidity.textContent = `${data.main.humidity} %`;
    wind.textContent = `${data.wind.speed} km/h`;
    sunrisePlaceholder.textContent = `${sunrise}:00 AM`;
    sunsetPlaceholder.textContent = `${sunset}:00 PM`;

}

function displayForecast(data) {
    const forecastDiv = document.querySelector('#forecastDiv');
    const next24Hours = data.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    forecastDiv.innerHTML = '';
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;


        const hourlyItemHtml = `<div class="bg-[#61876E] p-5 rounded-md flex flex-col items-center justify-center">
                        <p class="whitespace-nowrap">${hour}:00</p>
                        <img src="${iconUrl}" alt="" class="w-16">
                        <p class="whitespace-nowrap">${temperature} °C</p>
                    </div>`;

        forecastDiv.innerHTML += hourlyItemHtml;
    });
}

getWeather();