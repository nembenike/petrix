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
    <div className="flex justify-between bg-ctp-crust px-8 py-2 text-ctp-subtext1 text-sm border-b border-ctp-surface0">
      <p>{getFormattedDate()}</p>
      <div className="flex gap-6">
        <p className="flex items-center gap-1">
          <span className="text-ctp-green">EUR</span>
          <span>{rates?.EUR.toLocaleString('hu-HU')} Ft</span>
        </p>
        <p className="flex items-center gap-1">
          <span className="text-ctp-green">USD</span>
          <span>{rates?.USD.toLocaleString('hu-HU')} Ft</span>
        </p>
        {weather && (
          <p className="flex items-center">
            <span className="text-ctp-sky">{weather.temp}°C</span>
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