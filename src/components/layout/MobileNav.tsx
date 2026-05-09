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

export function MobileNav() {
  const pathname = usePathname()
  const { t } = useT()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs ${
                isActive ? "text-green-700" : "text-gray-500"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{t(item.labelKey)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
