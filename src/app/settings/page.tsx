"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useT } from "@/lib/use-translations"
import type { Language } from "@/types"
import { Settings, LogOut } from "lucide-react"

export default function SettingsPage() {
  const { t, locale, setLocale } = useT()

  const languages: { code: Language; name: string; native: string }[] = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "ta", name: "Tamil", native: "தமிழ்" },
    { code: "te", name: "Telugu", native: "తెలుగు" },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-green-700" />
            {t("settings.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">{t("settings.language")}</h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={locale === lang.code ? "default" : "outline"}
                  className={locale === lang.code ? "bg-green-700" : ""}
                  onClick={() => setLocale(lang.code)}
                >
                  {lang.native}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-2">{t("settings.profile")}</h3>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Name: Farmer</p>
              <p>Village: —</p>
              <p>Language: {languages.find((l) => l.code === locale)?.name}</p>
            </div>
          </div>

          <Separator />

          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            {t("settings.logout")}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
