import * as tf from "@tensorflow/tfjs"

let model: tf.GraphModel | null = null

export async function loadModel() {
  if (model) return model
  try {
    model = await tf.loadGraphModel("/models/plant-disease/model.json")
    return model
  } catch {
    console.warn("AI model not found. Run in fallback mode.")
    return null
  }
}

export async function predictDisease(
  imageElement: HTMLImageElement
): Promise<{ label: string; confidence: number } | null> {
  const loadedModel = await loadModel()
  if (!loadedModel) return null

  const tensor = tf.browser
    .fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims(0)

  const prediction = loadedModel.predict(tensor) as tf.Tensor
  const probabilities = await prediction.data()
  const maxIndex = probabilities.indexOf(Math.max(...Array.from(probabilities)))

  const classes = [
    "early-blight",
    "late-blight",
    "leaf-rust",
    "bacterial-spot",
    "nitrogen-deficiency",
    "healthy",
  ]

  tensor.dispose()
  prediction.dispose()

  return {
    label: classes[maxIndex] || "unknown",
    confidence: probabilities[maxIndex],
  }
}

// Simulated prediction for development without model
export function simulatePrediction(): { label: string; confidence: number } {
  const classes = [
    "early-blight",
    "late-blight",
    "leaf-rust",
    "bacterial-spot",
    "nitrogen-deficiency",
    "healthy",
  ]
  const idx = Math.floor(Math.random() * classes.length)
  return {
    label: classes[idx],
    confidence: 0.6 + Math.random() * 0.35,
  }
}
