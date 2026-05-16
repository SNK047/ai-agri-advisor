"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useT } from "@/lib/use-translations"
import { getTreatment } from "@/lib/treatments"
import { predictDisease } from "@/lib/ai"
import type { TopPrediction } from "@/lib/ai"
import { getSupabase } from "@/lib/supabase"
import { crops, getCropInfo } from "@/lib/crops"
import type { CropInfo } from "@/lib/crops"
import { Upload, Camera, AlertTriangle, Leaf, Loader2, CheckCircle2, BookOpen } from "lucide-react"

export default function ScanPage() {
  const { t, locale } = useT()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<{
    top1: TopPrediction
    top5: TopPrediction[]
    treatment: NonNullable<ReturnType<typeof getTreatment>>
  } | null>(null)
  const [selectedCrop, setSelectedCrop] = useState("")
  const [selectedDisease, setSelectedDisease] = useState("")
  const [manualTreatment, setManualTreatment] = useState<ReturnType<typeof getTreatment> | null>(null)

  const cropNames = Object.keys(crops).sort()

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError("")
    setResult(null)
    setManualTreatment(null)
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
        setError("AI model not loaded. Try refreshing the page.")
        setScanning(false)
        return
      }
      const treatment = getTreatment(pred.top1.label, locale)
      setResult({ ...pred, treatment: treatment || getTreatment("unknown", locale)! })
      try {
        const { data: { user } } = await getSupabase().auth.getUser()
        if (user) {
          const treat = treatment || getTreatment("unknown", locale)!
          await (getSupabase().from("scan_history") as any).insert({
            user_id: user.id,
            image_url: preview?.slice(0, 5000) || null,
            prediction: pred.top1.label,
            confidence: pred.top1.confidence,
            treatment_organic: treat.organic,
            treatment_chemical: treat.chemical,
            treatment_prevention: treat.prevention,
          })
        }
      } catch {
        // Save skipped
      }
    } catch (e) {
      console.error("Scan error:", e)
      setError("Prediction failed. Try again.")
    }
    setScanning(false)
  }

  function handleManualLookup() {
    if (selectedCrop && selectedDisease) {
      const t = getTreatment(selectedDisease, locale)
      setManualTreatment(t || getTreatment("unknown", locale))
    }
  }

  function reset() {
    setPreview(null)
    setResult(null)
    setManualTreatment(null)
    setSelectedCrop("")
    setSelectedDisease("")
    setScanning(false)
    setError("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function CropInfoCard({ cropName }: { cropName: string }) {
    const info = getCropInfo(cropName)
    if (!info) return null
    return (
      <div className="text-xs text-gray-600 bg-green-50 rounded-lg p-3 space-y-1.5 border border-green-200 mt-2">
        <p><span className="font-medium">{info.scientificName}</span> — {info.type}</p>
        <p><strong>Season:</strong> {info.growingSeason}</p>
        <p><strong>Soil:</strong> {info.soilType}</p>
        <p><strong>Water:</strong> {info.waterRequirement} | <strong>Harvest:</strong> {info.harvestingPeriod}</p>
        <p><strong>Grown in:</strong> {info.growingStates.slice(0, 5).join(", ")}{info.growingStates.length > 5 ? "..." : ""}</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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
                  <strong>Crop:</strong> {result.top1.cropType}
                </p>
                {getCropInfo(result.top1.cropType) && (
                  <CropInfoCard cropName={result.top1.cropType} />
                )}
                <p>
                  <strong>{t("dashboard.disease")}:</strong>{" "}
                  {result.top1.label === "healthy" ? (
                    <span className="text-green-700 font-semibold">Healthy ✓</span>
                  ) : (
                    result.top1.label.replace(/-/g, " ")
                  )}
                </p>
                <p>
                  <strong>{t("dashboard.confidence")}:</strong>{" "}
                  <Badge variant={result.top1.confidence > 0.7 ? "default" : "secondary"}>
                    {(result.top1.confidence * 100).toFixed(0)}%
                  </Badge>
                </p>

                {result.top1.confidence < 0.5 && (
                  <p className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                    Low confidence — results may not be accurate for this crop.
                  </p>
                )}

                {/* Top 5 predictions */}
                <div className="text-sm space-y-1.5">
                  <p className="font-medium text-gray-700">Top predictions:</p>
                  {result.top5.map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-4 text-right text-gray-400 text-xs">{i + 1}.</span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(p.confidence * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <span className="w-24 text-right text-xs text-gray-600 truncate">
                          {p.cropType} — {p.label === "healthy" ? "Healthy" : p.label.replace(/-/g, " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

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

      {/* Indian crop manual lookup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-green-700" />
            Indian Crop Database — Look up treatment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-gray-500">
            Select your crop and disease from the database of {cropNames.length} Indian crops.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedCrop}
              onChange={(e) => { setSelectedCrop(e.target.value); setSelectedDisease(""); setManualTreatment(null) }}
              className="border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="">Select crop</option>
              {cropNames.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
            <select
              value={selectedDisease}
              onChange={(e) => { setSelectedDisease(e.target.value); setManualTreatment(null) }}
              className="border rounded-lg px-3 py-2 text-sm bg-white"
              disabled={!selectedCrop}
            >
              <option value="">Select disease</option>
              {(selectedCrop ? getCropInfo(selectedCrop)?.commonDiseases || [] : []).map((key) => (
                <option key={key} value={key}>{key.replace(/-/g, " ")}</option>
              ))}
            </select>
          </div>

          {selectedCrop && getCropInfo(selectedCrop) && (
            <CropInfoCard cropName={selectedCrop} />
          )}

          <Button
            onClick={handleManualLookup}
            disabled={!selectedCrop || !selectedDisease}
            className="w-full bg-green-700 hover:bg-green-800"
            size="sm"
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Get Treatment
          </Button>
          {manualTreatment && (
            <div className="bg-green-50 rounded-lg p-3 text-sm space-y-1.5 border border-green-200">
              <p><strong>Organic:</strong> {manualTreatment.organic}</p>
              <p><strong>Chemical:</strong> {manualTreatment.chemical}</p>
              <p><strong>Prevention:</strong> {manualTreatment.prevention}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
