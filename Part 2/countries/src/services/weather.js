import axios from 'axios'

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (city, apiKey) =>
  axios.get(`${WEATHER_URL}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)

export default getWeather