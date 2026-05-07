"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useT } from "@/lib/use-translations"
import { Store } from "lucide-react"

const samplePrices = [
  { crop: "Tomato", price: 32, market: "Koyambedu Mandi", updated: "Today" },
  { crop: "Potato", price: 24, market: "Koyambedu Mandi", updated: "Today" },
  { crop: "Onion", price: 28, market: "Koyambedu Mandi", updated: "Yesterday" },
  { crop: "Rice", price: 45, market: "Thiruvanmiyur Market", updated: "Today" },
  { crop: "Wheat", price: 38, market: "Thiruvanmiyur Market", updated: "2 days ago" },
  { crop: "Maize", price: 22, market: "Koyambedu Mandi", updated: "Yesterday" },
  { crop: "Groundnut", price: 56, market: "Local Mandi", updated: "Today" },
  { crop: "Cotton", price: 68, market: "Local Mandi", updated: "3 days ago" },
]

export default function MarketPage() {
  const { t } = useT()

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
              {samplePrices.map((item) => (
                <TableRow key={item.crop}>
                  <TableCell className="font-medium">{item.crop}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell className="text-gray-500">{item.market}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{item.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-gray-400 mt-4">
            Prices are indicative. Check local mandi for actual rates.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
