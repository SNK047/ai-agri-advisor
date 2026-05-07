"use client"

import { useT } from "@/lib/use-translations"
import type { Language } from "@/types"
import { User } from "lucide-react"

export function Header({ userName = "Farmer" }: { userName?: string }) {
  const { t, locale, setLocale } = useT()

  return (
    <header className="flex justify-between items-center mb-8 flex-wrap gap-4">
      <div>
        <h1 className="text-2xl font-bold text-green-800">
          {t("dashboard.greeting").replace("{name}", userName)}
        </h1>
        <p className="text-sm text-gray-500">{t("dashboard.subtitle")}</p>
      </div>
      <div className="flex items-center gap-3">
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Language)}
          className="border rounded-lg px-3 py-1.5 text-sm bg-white"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
        </select>
        <div className="bg-green-100 p-2 rounded-full">
          <User className="h-5 w-5 text-green-700" />
        </div>
      </div>
    </header>
  )
}
