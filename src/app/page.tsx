import Link from "next/link"
import { Sprout, Scan, CloudSun, Store, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Scan,
    title: "AI Disease Detection",
    desc: "Upload a crop photo and get instant disease diagnosis with treatment advice.",
  },
  {
    icon: CloudSun,
    title: "Weather Forecasts",
    desc: "Local weather updates and rain predictions to plan your farming activities.",
  },
  {
    icon: Store,
    title: "Market Prices",
    desc: "Nearby mandi prices for your crops to help you get the best value.",
  },
  {
    icon: Sprout,
    title: "Smart Recommendations",
    desc: "Personalized fertilizer, irrigation, and pest control advice.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="h-10 w-10 text-green-700" />
            <h1 className="text-4xl font-bold text-green-900">AI Agri-Advisor</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Smart farming assistant for small farmers — detect crop diseases, check weather,
            and find market prices in your language.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-2"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="border border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Dashboard Demo
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                <Icon className="h-8 w-8 text-green-700 mb-3" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Supported languages: English | हिंदी | தமிழ் | తెలుగు</p>
          <p className="mt-1">Built for Indian smallholder farmers</p>
        </div>
      </div>
    </div>
  )
}
