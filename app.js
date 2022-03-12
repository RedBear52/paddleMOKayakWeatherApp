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

const upcomingDaysTemplate = document.querySelector('[data-upcoming-days-template]')
const upcomingDaysContainer = document.querySelector('[data-upcoming-days]')

let featuredWeatherIndex

getWeather().then().then(weather => {
    featuredWeatherIndex = weather[0]
    displayFeaturedWeather(weather)
    displayUpcomingDays(weather)
})

function displayFeaturedWeather(weather) {
    const featuredWeather = weather[0]
    currentTimeEle.innerText = featuredWeather.timeWindow
    currentDateEle.innerText = displayDate(featuredWeather.date)
    currentTempHighEle.innerText = featuredWeather.tempString
    forecastSummaryEle.innerText = featuredWeather.forecastSum
    windSpeedEle.innerText = featuredWeather.windSpd
    windDirectionTextEle.innerText = featuredWeather.windDir
} 

function displayUpcomingDays(weather) {
    upcomingDaysContainer.innerHTML = ''
    weather.forEach((weatherData, index) => {
        const dayContainer = upcomingDaysTemplate.content.cloneNode(true)
        dayContainer.querySelector('[data-time]').innerText = weatherData.timeWindow
        dayContainer.querySelector('[data-date]').innerText = displayDate(weatherData.date)
        dayContainer.querySelector('[data-temp]').innerText = weatherData.tempString
        dayContainer.querySelector('[data-wind-speed]').innerText = weatherData.windSpd
        dayContainer.querySelector('[data-more-info-button]').addEventListener('click', () => {
            featuredWeatherIndex = weather[featuredWeatherIndex]
            displayFeaturedWeather(weather)
        })
        upcomingDaysContainer.appendChild(dayContainer)
    })
}

function displayDate(date) {
    return date.toLocaleDateString(
        undefined,
        { day: 'numeric', month: 'long'}
    )
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
        // console.log(temp)
    })
}
