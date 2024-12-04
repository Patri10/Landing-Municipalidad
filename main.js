// Weather API configuration
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const LATITUDE = -31.324;
const LONGITUDE = -62.088;
const TIMEZONE = 'America/Argentina/Cordoba';

// DOM Elements
const maxTemp = document.querySelector('.temperature-max');
const minTemp = document.querySelector('.temperature-min');
const updateTime = document.getElementById('update-time');

// Fetch weather data
async function fetchWeather() {
    try {
        const response = await fetch(
            `${WEATHER_API_URL}?latitude=${LATITUDE}&longitude=${LONGITUDE}&daily=temperature_2m_max,temperature_2m_min&timezone=${TIMEZONE}`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not available');
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        updateWeatherError();
    }
}

// Update weather UI
function updateWeatherUI(data) {
    // Get first day's temperatures
    const maxTemperature = data.daily.temperature_2m_max[0];
    const minTemperature = data.daily.temperature_2m_min[0];
    
    // Update temperature displays
    maxTemp.textContent = `Max: ${maxTemperature}°C`;
    minTemp.textContent = `Min: ${minTemperature}°C`;
    
    // Update last updated time
    const now = new Date();
    updateTime.textContent = now.toLocaleTimeString();
}

// Handle weather fetch error
function updateWeatherError() {
    maxTemp.textContent = 'Max: N/A';
    minTemp.textContent = 'Min: N/A';
    updateTime.textContent = 'N/A';
}

// Initialize weather data
fetchWeather();

// Refresh weather data every 30 minutes
setInterval(fetchWeather, 30 * 60 * 1000);

// Form submission handler
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Clear form
    this.reset();
    
    // Show success message (you can enhance this)
    alert('Thank you for your message. We will get back to you soon.');
});
// Agregar un evento de clic al botón de búsqueda
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.querySelector('.search-input').value;
    // Lógica para buscar en las secciones
    navigateToSection(query);
});

