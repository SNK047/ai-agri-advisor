export interface User {
  id: string
  email?: string
  name?: string
  village?: string
  language: string
}

export interface ScanResult {
  id: string
  userId: string
  imageUrl: string
  prediction: string
  confidence: number
  treatment?: Treatment
  createdAt: string
}

export interface Treatment {
  organic: string
  chemical: string
  prevention: string
}

export interface WeatherData {
  temperature: number
  humidity: number
  condition: string
  rainForecast: number
}

export interface MarketPrice {
  id: string
  cropName: string
  price: number
  unit: string
  marketName: string
  updatedAt: string
}

export type Language = "en" | "hi" | "ta" | "te"
