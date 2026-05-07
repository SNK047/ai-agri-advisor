"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useT } from "@/lib/use-translations"
import { getSupabase } from "@/lib/supabase"
import { Store } from "lucide-react"

const fallbackPrices = [
  { crop: "Tomato", price: 32, market: "Koyambedu Mandi", updated: "Today" },
  { crop: "Potato", price: 24, market: "Koyambedu Mandi", updated: "Today" },
  { crop: "Onion", price: 28, market: "Koyambedu Mandi", updated: "Yesterday" },
  { crop: "Rice", price: 45, market: "Thiruvanmiyur Market", updated: "Today" },
  { crop: "Wheat", price: 38, market: "Thiruvanmiyur Market", updated: "2 days ago" },
  { crop: "Maize", price: 22, market: "Koyambedu Mandi", updated: "Yesterday" },
  { crop: "Groundnut", price: 56, market: "Local Mandi", updated: "Today" },
  { crop: "Cotton", price: 68, market: "Local Mandi", updated: "3 days ago" },
]

type Price = { crop_name: string; price: number; market_name: string; updated_at: string }

export default function MarketPage() {
  const { t } = useT()
  const [prices, setPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await getSupabase()
          .from("market_prices")
          .select("*")
          .order("crop_name")
        if (data && data.length > 0) {
          setPrices(data)
        } else {
          setPrices([])
        }
      } catch {
        setPrices([])
      }
      setLoading(false)
    }
    load()
  }, [])

  const displayPrices = prices.length > 0
    ? prices.map((p) => ({
        crop: p.crop_name,
        price: p.price,
        market: p.market_name,
        updated: new Date(p.updated_at).toLocaleDateString(),
      }))
    : fallbackPrices

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-green-700" />
            {t("market.title")}
          </CardTitle>
          <p className="text-sm text-gray-500">Nearby mandi prices — updated daily</p>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-400 animate-pulse py-8">Loading prices...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("market.crop")}</TableHead>
                  <TableHead>{t("market.price")} (₹/kg)</TableHead>
                  <TableHead>{t("market.market")}</TableHead>
                  <TableHead>{t("market.updated")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayPrices.map((item) => (
                  <TableRow key={item.crop}>
                    <TableCell className="font-medium">{item.crop}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell className="text-gray-500">{item.market}</TableCell>
                    <TableCell className="text-gray-500 text-sm">{item.updated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <p className="text-xs text-gray-400 mt-4">
            Prices are indicative. Check local mandi for actual rates.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
