"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useT } from "@/lib/use-translations"
import { fetchWeather } from "@/lib/weather"
import { MapView } from "@/components/MapView"
import type { WeatherData } from "@/types"
import { CloudSun, Thermometer, Droplets, CloudRain, MapPin, Map } from "lucide-react"

export default function WeatherPage() {
  const { t } = useT()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState("Fetching location...")
  const [coords, setCoords] = useState<[number, number] | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude
          setCoords([lat, lng])
          setLocation(`${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E`)
          const data = await fetchWeather(lat, lng)
          if (data) setWeather(data)
          else setError("Could not fetch weather data")
        },
        () => {
          setLocation("Location access denied")
          setError("Enable location to get weather and map")
        }
      )
    } else {
      setLocation("Geolocation not supported")
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudSun className="h-5 w-5 text-green-700" />
            {t("weather.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" /> {location}
          </div>

          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
              {error}
            </div>
          )}

          {weather && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-xl p-5 text-center">
                <Thermometer className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-800">{weather.temperature}°C</p>
                <p className="text-sm text-gray-500">{t("weather.today")}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 text-center">
                <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-800">{weather.humidity}%</p>
                <p className="text-sm text-gray-500">{t("weather.humidity")}</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-5 text-center">
                <CloudRain className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-800">{weather.rainForecast}%</p>
                <p className="text-sm text-gray-500">{t("weather.rain")}</p>
              </div>
            </div>
          )}

          {!weather && !error && (
            <div className="text-center py-8 text-gray-400 animate-pulse">
              Loading weather data...
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
            <p className="font-semibold text-amber-800 mb-1">Farming Tip</p>
            <p className="text-amber-700">
              {weather?.rainForecast && weather.rainForecast > 50
                ? "High rain probability. Avoid fertilizer spraying today."
                : weather?.temperature && weather.temperature > 35
                ? "High temperature. Ensure adequate irrigation for your crops."
                : "Weather conditions are favorable for farming activities."}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-green-700" />
            Your Farm Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          {coords ? (
            <MapView center={coords} zoom={14} />
          ) : (
            <div className="h-[300px] rounded-xl bg-gray-100 flex items-center justify-center text-sm text-gray-400">
              {error ? "Enable location to see map" : "Loading map..."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
