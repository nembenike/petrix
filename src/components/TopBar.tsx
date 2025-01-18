import { useState, useEffect } from 'react'
import { fetchExchangeRates, fetchWeather } from '../utils/api'
import { getFormattedDate } from '../utils/date'

export default function TopBar() {
  const [rates, setRates] = useState<{ EUR: number; USD: number } | null>(null)
  const [weather, setWeather] = useState<{ temp: number; icon: string } | null>(null)
  
  useEffect(() => {
    const updateData = async () => {
      try {
        const [ratesData, weatherData] = await Promise.all([
          fetchExchangeRates(),
          fetchWeather()
        ])
        setRates(ratesData)
        setWeather(weatherData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    updateData()
    const ratesInterval = setInterval(updateData, 3600000)
    return () => clearInterval(ratesInterval)
  }, [])

  return (
    <div className="flex justify-between bg-black px-8 py-2 text-white text-sm">
      <p>{getFormattedDate()}</p>
      <div className="flex gap-4">
        <p>EUR {rates?.EUR.toLocaleString('hu-HU')} Ft</p>
        <p>USD {rates?.USD.toLocaleString('hu-HU')} Ft</p>
        {weather && (
          <p className="flex items-center">
            {weather.temp}°C
            <img 
              src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
              alt="Weather icon"
              className="w-6 h-6 ml-1"
            />
          </p>
        )}
      </div>
    </div>
  )
} 