"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getSupabase } from "@/lib/supabase"
import { useT } from "@/lib/use-translations"
import { History, Clock, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

type ScanRecord = {
  id: string
  prediction: string
  confidence: number
  treatment_organic: string | null
  treatment_chemical: string | null
  treatment_prevention: string | null
  created_at: string
  image_url: string | null
}

export default function HistoryPage() {
  const { t } = useT()
  const [scans, setScans] = useState<ScanRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    getSupabase()
      .auth.getUser()
      .then(({ data: { user } }) => {
        if (!user) {
          setLoading(false)
          return
        }
        setAuthed(true)
        getSupabase()
          .from("scan_history")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .then(({ data }) => {
            if (data) setScans(data as ScanRecord[])
            setLoading(false)
          })
      })
  }, [])

  if (!authed) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="text-center py-12 space-y-4">
            <Clock className="h-12 w-12 text-gray-300 mx-auto" />
            <p className="text-gray-500">Sign in to view your scan history</p>
            <Link href="/login">
              <Button className="bg-green-700 hover:bg-green-800">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-green-800 flex items-center gap-2">
            <History className="h-5 w-5" /> Scan History
          </h1>
          <p className="text-sm text-gray-500">Your past disease scans</p>
        </div>
      </div>

      {loading && <p className="text-gray-400 text-center py-8">Loading...</p>}

      {!loading && scans.length === 0 && (
        <Card>
          <CardContent className="text-center py-12 space-y-4">
            <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto" />
            <p className="text-gray-500">No scans yet</p>
            <Link href="/scan">
              <Button className="bg-green-700 hover:bg-green-800">Scan Your First Crop</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {scans.map((scan) => (
          <Card key={scan.id}>
            <CardContent className="p-4 flex gap-4">
              {scan.image_url && (
                <img
                  src={scan.image_url}
                  alt="Scan"
                  className="w-20 h-20 rounded-lg object-cover shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm capitalize">
                    {scan.prediction.replace(/-/g, " ")}
                  </h3>
                  <Badge variant={scan.confidence > 0.7 ? "default" : "secondary"}>
                    {(scan.confidence * 100).toFixed(0)}%
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(scan.created_at).toLocaleDateString(undefined, {
                    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
                {(scan.treatment_organic || scan.treatment_chemical) && (
                  <div className="mt-2 text-xs text-gray-600 space-y-0.5 line-clamp-2">
                    {scan.treatment_organic && <p><strong>Organic:</strong> {scan.treatment_organic}</p>}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
