"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useT } from "@/lib/use-translations"
import { Sprout, Scan, CloudSun, Store, Settings, History } from "lucide-react"

const navItems = [
  { href: "/dashboard", labelKey: "nav.dashboard", icon: Sprout },
  { href: "/scan", labelKey: "nav.scan", icon: Scan },
  { href: "/history", labelKey: "nav.history", icon: History },
  { href: "/weather", labelKey: "nav.weather", icon: CloudSun },
  { href: "/market", labelKey: "nav.market", icon: Store },
  { href: "/settings", labelKey: "nav.settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useT()

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 hidden md:flex flex-col">
      <div className="flex items-center gap-2 mb-10 px-3">
        <Sprout className="h-6 w-6 text-green-700" />
        <h2 className="text-lg font-bold text-green-800">AI Agri-Advisor</h2>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-green-100 text-green-800 font-semibold"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t(item.labelKey)}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
