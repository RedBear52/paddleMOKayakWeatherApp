const api_key = 'chdQVbRHrZRfQvJNc99qPurfsudtu0WHDp4f7vzJ'
const API_URL = `https://api.weather.gov/gridpoints/LSX/81,26/forecast`

const previousWeatherToggle = document.querySelector('.show-previous-weather-label')
const previousWeather = document.querySelector('.previous-weather')

previousWeatherToggle.addEventListener('click', () => {
    previousWeather.classList.toggle('show-weather')
})

getWeather()
function getWeather() {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}
