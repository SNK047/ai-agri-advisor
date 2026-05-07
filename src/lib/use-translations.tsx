"use client"

import { createContext, useContext, useState, useCallback } from "react"
import type { Language } from "@/types"
import en from "../../messages/en.json"
import hi from "../../messages/hi.json"
import ta from "../../messages/ta.json"
import te from "../../messages/te.json"

const messages: Record<string, Record<string, Record<string, string>>> = { en, hi, ta, te }

type TranslationsContext = {
  locale: Language
  setLocale: (locale: Language) => void
  t: (key: string) => string
}

const Context = createContext<TranslationsContext | null>(null)

export function TranslationsProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Language>("en")

  const t = useCallback(
    (key: string) => {
      const parts = key.split(".")
      let value: Record<string, unknown> | string = messages[locale] || messages.en
      for (const part of parts) {
        if (typeof value === "object" && value !== null) {
          value = (value as Record<string, unknown>)[part] as string
        }
      }
      return typeof value === "string" ? value : key
    },
    [locale]
  )

  return <Context value={{ locale, setLocale, t }}>{children}</Context>
}

export function useT() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error("useT must be used within TranslationsProvider")
  return ctx
}
