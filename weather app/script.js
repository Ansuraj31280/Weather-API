const apiKey = '6bd9f27ee22b4ec9fbb02695fdd7cbf2';
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const suggestionsList = document.getElementById('suggestions-list');
const cityNameElement = document.getElementById('city-name');
const weatherDescriptionElement = document.getElementById('weather-description');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');

searchInput.addEventListener('input', async ()=> {
    const userInput = searchInput.value.trim();
    if (userInput.length > 2) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/search?q=${userInput}&appid=${apiKey}`);
        const data = await response.json();
        const suggestions = data.list.map((city) => {
            return `<li>${city.name}, ${city.country}</li>`;
        });
        suggestionsList.innerHTML = suggestions.join('');
    } else {
        suggestionsList.innerHTML = '';
    }
});

searchBtn.addEventListener('click', async () => {
    const userInput = searchInput.value.trim();
    if (userInput.length > 2) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}`);
        const data = await response.json();
        cityNameElement.textContent = data.name;
        weatherDescriptionElement.textContent = data.weather[0].description;
        temperatureElement.textContent = `Temperature: ${(data.main.temp.toFixed(1))-273}°C`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    }
});

suggestionsList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const cityName = event.target.textContent;
        searchInput.value = cityName;
        suggestionsList.innerHTML = '';
    }
});