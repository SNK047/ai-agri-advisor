"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchWeather } from "@/lib/weather"
import type { WeatherData } from "@/types"
import { useT } from "@/lib/use-translations"
import { CloudSun, Thermometer, Droplets } from "lucide-react"

export default function DashboardPage() {
  const { t } = useT()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<{
    disease: string
    confidence: number
    action: string
  } | null>(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const data = await fetchWeather(pos.coords.latitude, pos.coords.longitude)
        if (data) setWeather(data)
      })
    }
  }, [])

  function handleScan() {
    setScanning(true)
    setTimeout(() => {
      setResult({
        disease: "Early Blight",
        confidence: 0.78,
        action: "Remove lower affected leaves. Apply copper-based fungicide. Consult local agri-officer for severe spread.",
      })
      setScanning(false)
    }, 2500)
  }

  return (
    <div>
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3 bg-gradient-to-r from-green-50 to-white">
          <CardContent className="flex items-center justify-between p-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <CloudSun className="h-8 w-8 text-green-700" />
              <div>
                <p className="text-sm text-gray-500">{t("dashboard.currentWeather")}</p>
                {weather ? (
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-3xl font-bold text-green-800">
                      {weather.temperature}°C
                    </span>
                    <span className="text-sm text-gray-600">{weather.condition}</span>
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <Droplets className="h-4 w-4" /> {weather.humidity}%
                    </span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      Rain: {weather.rainForecast}%
                    </Badge>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Loading weather...</p>
                )}
              </div>
            </div>
            <p className="text-sm text-orange-600 font-medium">
              ⚠️ Moderate rain expected tomorrow. Delay pesticide spray.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("dashboard.aiScanner")}</CardTitle>
            <p className="text-sm text-gray-500">{t("dashboard.scannerDesc")}</p>
          </CardHeader>
          <CardContent>
            {!result && !scanning && (
              <div
                onClick={handleScan}
                className="border-2 border-dashed border-green-500 rounded-xl p-12 text-center cursor-pointer hover:bg-green-50 transition-colors"
              >
                <Thermometer className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <p className="text-gray-600">{t("dashboard.clickToUpload")}</p>
              </div>
            )}
            {scanning && (
              <div className="text-center py-8">
                <p className="text-green-700 font-semibold animate-pulse">{t("dashboard.scanning")}</p>
              </div>
            )}
            {result && !scanning && (
              <div className="space-y-3">
                <h4 className="text-orange-600 font-semibold text-lg">Analysis Complete</h4>
                <p><strong>{t("dashboard.disease")}:</strong> {result.disease}</p>
                <p><strong>{t("dashboard.confidence")}:</strong> {(result.confidence * 100).toFixed(0)}%</p>
                <p><strong>{t("dashboard.action")}:</strong> {result.action}</p>
                <p className="text-xs text-gray-400 mt-2">{t("dashboard.disclaimer")}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.recommendations")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="pb-3 border-b">
                <strong>Fertilizer:</strong> Time to add Nitrogen-rich compost based on recent soil data.
              </li>
              <li className="pb-3 border-b">
                <strong>Market:</strong> Tomato prices in nearby Mandi are up by 12% today.
              </li>
              <li>
                <strong>Irrigation:</strong> Soil moisture is optimal. No watering needed for 24 hours.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
