"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useT } from "@/lib/use-translations"
import { getTreatment } from "@/lib/treatments"
import { predictDisease } from "@/lib/ai"
import { getSupabase } from "@/lib/supabase"
import { Upload, Camera, AlertTriangle, Leaf, Loader2 } from "lucide-react"

export default function ScanPage() {
  const { t, locale } = useT()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<{
    label: string
    cropType: string
    confidence: number
    treatment: { organic: string; chemical: string; prevention: string } | null
  } | null>(null)

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError("")
    setResult(null)
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  async function runScan() {
    if (!imgRef.current) return
    setScanning(true)
    setError("")
    try {
      const pred = await predictDisease(imgRef.current)
      if (!pred) {
        setError("AI model not loaded. Using offline mode.")
        return
      }
      const treatment = getTreatment(pred.label, locale)
      setResult({ ...pred, treatment })
      try {
        const { data: { user } } = await getSupabase().auth.getUser()
        if (user) {
          const treat = treatment || { organic: "", chemical: "", prevention: "" }
          await (getSupabase().from("scan_history") as any).insert({
            user_id: user.id,
            image_url: preview?.slice(0, 5000) || null,
            prediction: pred.label,
            confidence: pred.confidence,
            treatment_organic: treat.organic,
            treatment_chemical: treat.chemical,
            treatment_prevention: treat.prevention,
          })
        }
      } catch {
        // Save skipped – user may not be authenticated
      }
    } catch {
      setError("Prediction failed. Try again.")
    }
    setScanning(false)
  }

  function reset() {
    setPreview(null)
    setResult(null)
    setScanning(false)
    setError("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-700" />
            {t("dashboard.aiScanner")}
          </CardTitle>
          <p className="text-sm text-gray-500">{t("dashboard.scannerDesc")}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelected}
            hidden
          />

          {!preview && !scanning && !result && (
            <div className="space-y-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-green-500 rounded-xl p-12 text-center cursor-pointer hover:bg-green-50 transition-colors"
              >
                <Upload className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <p className="text-gray-600">{t("dashboard.clickToUpload")}</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4 mr-2" />
                {t("dashboard.selectImage")}
              </Button>
            </div>
          )}

          {preview && !scanning && !result && (
            <div className="space-y-4">
              <img
                ref={imgRef}
                src={preview}
                alt="Crop"
                className="max-h-64 mx-auto rounded-lg object-contain"
                onLoad={runScan}
              />
              <p className="text-sm text-gray-400 text-center">Image loaded — starting analysis...</p>
            </div>
          )}

          {preview && scanning && (
            <div className="text-center space-y-4">
              <img src={preview} alt="Crop" className="max-h-64 mx-auto rounded-lg object-contain opacity-60" />
              <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                <Loader2 className="h-5 w-5 animate-spin" />
                {t("dashboard.scanning")}
              </div>
            </div>
          )}

          {preview && !scanning && result && (
            <div className="space-y-4">
              <img src={preview} alt="Crop" className="max-h-64 mx-auto rounded-lg object-contain" />
              <div className="bg-gray-50 rounded-xl p-5 space-y-3 border">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <h4 className="font-semibold text-lg text-gray-800">Analysis Complete</h4>
                </div>
                <p>
                  <strong>Crop:</strong> {result.cropType}
                </p>
                <p>
                  <strong>{t("dashboard.disease")}:</strong> {result.label.replace(/-/g, " ")}
                </p>
                <p>
                  <strong>{t("dashboard.confidence")}:</strong>{" "}
                  <Badge variant={result.confidence > 0.7 ? "default" : "secondary"}>
                    {(result.confidence * 100).toFixed(0)}%
                  </Badge>
                </p>
                {result.treatment && (
                  <div className="space-y-2 text-sm">
                    <p><strong>Organic:</strong> {result.treatment.organic}</p>
                    <p><strong>Chemical:</strong> {result.treatment.chemical}</p>
                    <p><strong>Prevention:</strong> {result.treatment.prevention}</p>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-2">{t("dashboard.disclaimer")}</p>
              </div>
              <Button onClick={reset} variant="outline" className="w-full">
                {t("dashboard.scanAnother")}
              </Button>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
              <Button onClick={reset} variant="outline" size="sm" className="ml-2">
                Try again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
