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
        const {
            ...weatherData
        } = data
        const temp = Object.entries(weatherData.properties.periods).map(([weather, data]) => {
            return {
                currentCond: data.shortForecast,
                timeWindow: data.name,
                tempNum: data.temperature,
                tempstring: `${data.temperature}°${data.temperatureUnit}`,
                windDir: data.windDirection,
                windSpd: data.windSpeed,
                forecastSum: data.detailedForecast,
            }
        })
        console.log(weatherData.properties.periods)
        console.log(weatherData.properties.periods[4].name)
        console.log(`${weatherData.properties.periods[4].temperature}°${weatherData.properties.periods[4].temperatureUnit}`) 
        console.log(weatherData.properties.periods[4].icon)
        console.log(weatherData.properties.periods[4].windDirection)
        console.log(weatherData.properties.periods[4].windSpeed)
        console.log(weatherData.properties.periods[4].detailedForecast)
        console.log(temp)
    })
}
