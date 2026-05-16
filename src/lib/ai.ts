import * as tf from "@tensorflow/tfjs"

export type TopPrediction = {
  label: string
  confidence: number
  cropType: string
  rawClass: string
}

const classToDisease: Record<string, string> = {
  "Tomato___Bacterial_spot": "bacterial-spot",
  "Tomato___Early_blight": "early-blight",
  "Tomato___Late_blight": "late-blight",
  "Tomato___Leaf_Mold": "leaf-mold",
  "Tomato___Septoria_leaf_spot": "septoria-spot",
  "Tomato___Spider_mites Two-spotted_spider_mite": "spider-mites",
  "Tomato___Target_Spot": "target-spot",
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "yellow-leaf-curl",
  "Tomato___Tomato_mosaic_virus": "mosaic-virus",
  "Tomato___healthy": "healthy",
  "Potato___Early_blight": "early-blight",
  "Potato___Late_blight": "late-blight",
  "Potato___healthy": "healthy",
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "leaf-spot",
  "Corn_(maize)___Common_rust_": "leaf-rust",
  "Corn_(maize)___Northern_Leaf_Blight": "northern-blight",
  "Corn_(maize)___healthy": "healthy",
  "Grape___Black_rot": "black-rot",
  "Grape___Esca_(Black_Measles)": "black-measles",
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "leaf-blight",
  "Grape___healthy": "healthy",
  "Apple___Apple_scab": "apple-scab",
  "Apple___Black_rot": "black-rot",
  "Apple___Cedar_apple_rust": "cedar-rust",
  "Apple___healthy": "healthy",
  "Pepper_bell___Bacterial_spot": "bacterial-spot",
  "Pepper_bell___healthy": "healthy",
  "Blueberry___healthy": "healthy",
  "Cherry_(including_sour)___Powdery_mildew": "powdery-mildew",
  "Cherry_(including_sour)___healthy": "healthy",
  "Orange___Haunglongbing_(Citrus_greening)": "citrus-greening",
  "Peach___Bacterial_spot": "bacterial-spot",
  "Peach___healthy": "healthy",
  "Raspberry___healthy": "healthy",
  "Soybean___healthy": "healthy",
  "Squash___Powdery_mildew": "powdery-mildew",
  "Strawberry___Leaf_scorch": "leaf-scorch",
  "Strawberry___healthy": "healthy",
}

let model: tf.LayersModel | null = null
let classIndices: string[] = []

export async function loadModel() {
  if (model) return model
  try {
    model = await tf.loadLayersModel("/models/plant-disease/model.json")
    const dummy = tf.zeros([1, 224, 224, 3])
    model.predict(dummy)
    tf.dispose(dummy)
    return model
  } catch (err) {
    console.warn("Failed to load TF model:", err)
    return null
  }
}

export async function loadClassIndices(): Promise<string[]> {
  if (classIndices.length > 0) return classIndices
  try {
    const res = await fetch("/models/plant-disease/class_indices.json")
    const data = await res.json()
    classIndices = Object.values(data) as string[]
    return classIndices
  } catch {
    return []
  }
}

export async function predictDisease(
  imageElement: HTMLImageElement
): Promise<{ top1: TopPrediction; top5: TopPrediction[] } | null> {
  const loadedModel = await loadModel()
  if (!loadedModel) return null

  const classes = await loadClassIndices()
  if (classes.length === 0) return null

  let baseTensor: tf.Tensor3D
  try {
    baseTensor = tf.browser.fromPixels(imageElement)
  } catch (err) {
    console.error("fromPixels failed:", err)
    return null
  }

  // Try all 3 preprocessing methods, pick the one with highest confidence
  const methods = [
    { name: "raw", fn: (t: tf.Tensor3D) => t.toFloat() },
    { name: "[0,1]", fn: (t: tf.Tensor3D) => t.toFloat().div(tf.scalar(255)) },
    { name: "[-1,1]", fn: (t: tf.Tensor3D) => t.toFloat().div(tf.scalar(127.5)).sub(tf.scalar(1)) },
  ]

  let bestProbs: Float32Array | Uint8Array | Int32Array | null = null
  let bestConfidence = 0
  let bestMethod = ""

  const resized = tf.image.resizeBilinear(baseTensor, [224, 224])

  for (const method of methods) {
    const tensor = method.fn(resized).expandDims(0)
    let prediction: tf.Tensor
    try {
      prediction = loadedModel.predict(tensor) as tf.Tensor
    } catch {
      tensor.dispose()
      continue
    }
    const probs = await prediction.data()
    let maxProb = 0
    for (let i = 0; i < probs.length; i++) {
      if (probs[i] > maxProb) maxProb = probs[i]
    }
    if (maxProb > bestConfidence) {
      bestConfidence = maxProb
      bestProbs = probs
      bestMethod = method.name
    }
    tensor.dispose()
    prediction.dispose()
  }

  tf.dispose(resized)
  tf.dispose(baseTensor)

  if (!bestProbs) return null

  const indices = Array.from({ length: bestProbs.length }, (_, i) => i)
  indices.sort((a, b) => bestProbs[b] - bestProbs[a])

  const top5 = indices.slice(0, 5).map((i) => {
    const rawClass = classes[i] || "unknown"
    return {
      rawClass,
      label: classToDisease[rawClass] || "unknown",
      cropType: rawClass.split("___")[0] || "unknown",
      confidence: bestProbs[i],
    }
  })

  console.log(`AI: using method "${bestMethod}", top1=${top5[0].cropType} ${top5[0].label} @ ${(top5[0].confidence * 100).toFixed(1)}%`)

  return { top1: top5[0], top5 }
}
