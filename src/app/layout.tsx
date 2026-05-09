import type { Metadata } from "next"
import "./globals.css"
import { TranslationsProvider } from "@/lib/use-translations"
import { Sidebar } from "@/components/layout/Sidebar"
import { MobileNav } from "@/components/layout/MobileNav"
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister"

export const metadata: Metadata = {
  title: "AI Agri-Advisor — Smart Farming Assistant",
  description: "AI-powered crop disease detection, weather forecasts, and market prices for Indian farmers",
  manifest: "/manifest.json",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex">
        <ServiceWorkerRegister />
        <TranslationsProvider>
          <Sidebar />
          <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8 overflow-y-auto">
            {children}
          </main>
          <MobileNav />
        </TranslationsProvider>
      </body>
    </html>
  )
}
