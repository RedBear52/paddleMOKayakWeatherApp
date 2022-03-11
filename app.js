const api_key = 'chdQVbRHrZRfQvJNc99qPurfsudtu0WHDp4f7vzJ'
const API_URL = `https://api.weather.gov/gridpoints/LSX/81,26/forecast`

const previousWeatherToggle = document.querySelector('.show-previous-weather-label')
const previousWeather = document.querySelector('.previous-weather')
const currentTimeEle = document.querySelector('[data-current-time]')
const currentDateEle = document.querySelector('[data-current-date]')
const currentTempHighEle = document.querySelector('[data-current-temp-high]')
const forecastSummaryEle = document.querySelector('[data-forecast-summary]')
const windSpeedEle = document.querySelector('[data-wind-speed]')
const windDirectionTextEle = document.querySelector('[data-wind-direction-text]')

previousWeatherToggle.addEventListener('click', () => {
    previousWeather.classList.toggle('show-weather')
})

let featuredWeatherIndex

getWeather().then().then(weather => {
    featuredWeatherIndex = weather[0]
    console.log(weather)
    displayFeaturedWeather(weather)
})

function displayFeaturedWeather(weather) {
    const featuredWeather = featuredWeatherIndex
    currentTimeEle.innerText = featuredWeatherIndex.timeWindow
    currentDateEle.innerText = featuredWeatherIndex.date
    currentTempHighEle.innerText = featuredWeatherIndex.tempString
    forecastSummaryEle.innerText = featuredWeatherIndex.forecastSum
    windSpeedEle.innerText = featuredWeatherIndex.windSpd
    windDirectionTextEle.innerText = featuredWeatherIndex.windDir
} 

function getWeather() {
    return fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const {
            ...weatherData
        } = data
        return Object.entries(weatherData.properties.periods).map(([weather, data]) => {
            return {
                currentCond: data.shortForecast,
                timeWindow: data.name,
                tempNum: data.temperature,
                tempString: `${data.temperature}°${data.temperatureUnit}`,
                windDir: data.windDirection,
                windSpd: data.windSpeed,
                forecastSum: data.detailedForecast,
                date: new Date(data.startTime),
            }
        })
        console.log(temp)
    })
}
