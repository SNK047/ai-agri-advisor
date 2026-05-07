import type { WeatherData } from "@/types"

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,relative_humidity_2m,weather_code&daily=precipitation_probability_max` +
        `&timezone=auto`
    )
    if (!res.ok) return null
    const data = await res.json()
    return {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      condition: weatherCodeToCondition(data.current.weather_code),
      rainForecast: data.daily.precipitation_probability_max[0],
    }
  } catch {
    return null
  }
}

function weatherCodeToCondition(code: number): string {
  if (code === 0) return "Clear"
  if (code <= 3) return "Partly Cloudy"
  if (code <= 48) return "Foggy"
  if (code <= 57) return "Drizzle"
  if (code <= 67) return "Rain"
  if (code <= 77) return "Snow"
  if (code <= 82) return "Rain Showers"
  if (code <= 86) return "Snow Showers"
  return "Thunderstorm"
}
