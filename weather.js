async function getWeather() {
    const cityName = document.getElementById('cityInput').value;
    const apiKey = 'c64a139a2fc5ae653037a11204975a3f'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const weatherData = await response.json();
        const temperature = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const weatherCondition = weatherData.weather[0].main.toLowerCase(); // Normalize to lowercase

        // Update text content
        document.getElementById('temperature').textContent = `${temperature}°C`;
        document.getElementById('cityName').textContent = weatherData.name;
        document.getElementById('humidity').textContent = `${humidity}%`;
        document.getElementById('windSpeed').textContent = `${windSpeed} m/s`;

        // Set weather icon dynamically
        const weatherIcon = document.getElementById('weatherIcon');
        
        // Remove all size-related classes before adding the new one
        weatherIcon.classList.remove('clear-icon', 'clouds-icon', 'rain-icon', 'mist-icon', 'drizzle-icon', 'default-icon');

        switch (weatherCondition) {
            case 'clear':
                weatherIcon.src = 'clear.jpeg'; // Replace with your sunny icon path
                weatherIcon.classList.add('clear-icon');
                break;
            case 'clouds':
                weatherIcon.src = 'cloud.jpeg'; // Replace with your cloudy icon path
                weatherIcon.classList.add('clouds-icon');
                break;
            case 'rain':
                weatherIcon.src = 'rain.jpeg'; // Replace with your rainy icon path
                weatherIcon.classList.add('rain-icon');
                break;
            case 'mist':
                weatherIcon.src = 'mist.jpeg'; // Replace with your misty icon path
                weatherIcon.classList.add('mist-icon');
                break;
            case 'drizzle':
                weatherIcon.src = 'humidity.jpeg'; // Replace with your drizzle icon path
                weatherIcon.classList.add('drizzle-icon');
                break;
            default:
                weatherIcon.src = 'default.jpeg'; // Replace with your default icon path
                weatherIcon.classList.add('default-icon');
                break;
        }
    } catch (error) {
        alert(error.message);
    }
}
