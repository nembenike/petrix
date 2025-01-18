const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export const fetchExchangeRates = async () => {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/HUF')
  const data = await response.json()
  
  return {
    EUR: Math.round(1 / data.rates.EUR * 100) / 100,
    USD: Math.round(1 / data.rates.USD * 100) / 100
  }
}

export const fetchWeather = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Budapest&units=metric&appid=${WEATHER_API_KEY}`
  )
  const data = await response.json()
  
  return {
    temp: Math.round(data.main.temp),
    icon: data.weather[0].icon
  }
} 