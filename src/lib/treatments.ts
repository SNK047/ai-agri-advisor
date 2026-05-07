import type { Treatment } from "@/types"

type TreatmentMap = Record<string, Record<string, Treatment>>

export const treatments: TreatmentMap = {
  en: {
    "early-blight": {
      organic: "Remove affected leaves. Apply neem oil spray (5ml/L water) weekly.",
      chemical: "Apply copper-based fungicide. Consult local agri-officer for severe cases.",
      prevention: "Crop rotation with non-solanaceous crops. Ensure proper spacing for airflow.",
    },
    "late-blight": {
      organic: "Remove and destroy infected plants immediately. Avoid overhead irrigation.",
      chemical: "Apply chlorothalonil or mancozeb fungicide immediately.",
      prevention: "Plant resistant varieties. Use disease-free seeds.",
    },
    "leaf-rust": {
      organic: "Remove rust-affected leaves. Apply sulfur dust or baking soda solution (1 tsp/L).",
      chemical: "Apply tebuconazole or propiconazole fungicide.",
      prevention: "Plant resistant wheat varieties. Avoid excessive nitrogen fertilizer.",
    },
    "bacterial-spot": {
      organic: "Remove infected leaves. Apply copper spray or streptomycin.",
      chemical: "Use copper-based bactericide. Rotate crops for 2 years.",
      prevention: "Use disease-free seeds. Avoid overhead watering.",
    },
    "nitrogen-deficiency": {
      organic: "Apply compost or manure. Use legume cover crops.",
      chemical: "Apply urea or NPK fertilizer (high N). Follow soil test recommendations.",
      prevention: "Regular soil testing. Balanced fertilizer application.",
    },
    healthy: {
      organic: "Continue good practices. Mulch and compost regularly.",
      chemical: "No chemicals needed. Maintain balanced nutrition.",
      prevention: "Regular monitoring. Crop rotation. Proper irrigation.",
    },
  },
  hi: {
    "early-blight": {
      organic: "प्रभावित पत्तियां हटाएं। नीम का तेल (5ml/लीटर पानी) साप्ताहिक छिड़काव करें।",
      chemical: "कॉपर-आधारित फफूंदनाशक लगाएं। गंभीर मामलों में कृषि अधिकारी से परामर्श करें।",
      prevention: "गैर-सोलेनेसियस फसलों के साथ फसल चक्र अपनाएं। वायु संचार के लिए उचित दूरी रखें।",
    },
    "late-blight": {
      organic: "संक्रमित पौधों को तुरंत हटाएं और नष्ट करें। ऊपरी सिंचाई से बचें।",
      chemical: "तुरंत क्लोरोथालोनिल या मैन्कोज़ेब फफूंदनाशक लगाएं।",
      prevention: "प्रतिरोधी किस्में लगाएं। रोग-मुक्त बीजों का उपयोग करें।",
    },
    "leaf-rust": {
      organic: "जंग-प्रभावित पत्तियां हटाएं। सल्फर डस्ट या बेकिंग सोडा घोल (1 चम्मच/लीटर) लगाएं।",
      chemical: "टेबुकोनाज़ोल या प्रोपिकोनाज़ोल फफूंदनाशक लगाएं।",
      prevention: "प्रतिरोधी गेहूं किस्में लगाएं। अत्यधिक नाइट्रोजन उर्वरक से बचें।",
    },
    "bacterial-spot": {
      organic: "संक्रमित पत्तियां हटाएं। कॉपर स्प्रे या स्ट्रेप्टोमाइसिन लगाएं।",
      chemical: "कॉपर-आधारित जीवाणुनाशक का उपयोग करें। 2 साल तक फसल चक्र अपनाएं।",
      prevention: "रोग-मुक्त बीजों का उपयोग करें। ऊपरी सिंचाई से बचें।",
    },
    "nitrogen-deficiency": {
      organic: "खाद या गोबर की खाद डालें। दलहनी कवर फसलों का उपयोग करें।",
      chemical: "यूरिया या NPK उर्वरक (उच्च N) लगाएं। मिट्टी परीक्षण सिफारिशों का पालन करें।",
      prevention: "नियमित मिट्टी परीक्षण। संतुलित उर्वरक प्रयोग।",
    },
    healthy: {
      organic: "अच्छी प्रथाएं जारी रखें। नियमित रूप से मल्च और खाद डालें।",
      chemical: "किसी रसायन की आवश्यकता नहीं। संतुलित पोषण बनाए रखें।",
      prevention: "नियमित निगरानी। फसल चक्र। उचित सिंचाई।",
    },
  },
  ta: {
    "early-blight": {
      organic: "பாதிக்கப்பட்ட இலைகளை அகற்றவும். வேப்ப எண்ணெய் தெளிப்பு (5ml/லி தண்ணீர்) வாரந்தோறும் செய்யவும்.",
      chemical: "செம்பு அடிப்படையிலான பூஞ்சைக் கொல்லியைப் பயன்படுத்தவும். கடுமையான நிலையில் வேளாண் அலுவலரை அணுகவும்.",
      prevention: "உருளைக்கிழங்கு அல்லாத பயிர்களுடன் பயிர் சுழற்சி. காற்றோட்டத்திற்கு இடைவெளி விடவும்.",
    },
    "late-blight": {
      organic: "பாதிக்கப்பட்ட செடிகளை உடனடியாக அகற்றி அழிக்கவும். மேல் நீர்பாசனம் தவிர்க்கவும்.",
      chemical: "உடனடியாக குளோரோதலோனில் அல்லது மான்கோசெப் பூஞ்சைக் கொல்லியைப் பயன்படுத்தவும்.",
      prevention: "எதிர்ப்பு சக்தி கொண்ட இரகங்களை நடவு செய்யவும். நோயில்லாத விதைகளைப் பயன்படுத்தவும்.",
    },
    "leaf-rust": {
      organic: "துரு பாதித்த இலைகளை அகற்றவும். கந்தக தூள் அல்லது சமையல் சோடா கரைசல் (1 டீஸ்பூன்/லி) பயன்படுத்தவும்.",
      chemical: "டெபுகோனசோல் அல்லது ப்ரோபிகோனசோல் பூஞ்சைக் கொல்லியைப் பயன்படுத்தவும்.",
      prevention: "எதிர்ப்பு சக்தி கொண்ட கோதுமை இரகங்களை நடவு செய்யவும். அதிக நைட்ரஜன் உரத்தைத் தவிர்க்கவும்.",
    },
    "bacterial-spot": {
      organic: "பாதிக்கப்பட்ட இலைகளை அகற்றவும். செம்பு தெளிப்பு அல்லது ஸ்ட்ரெப்டோமைசின் பயன்படுத்தவும்.",
      chemical: "செம்பு அடிப்படையிலான பாக்டீரியா கொல்லியைப் பயன்படுத்தவும். 2 ஆண்டுகள் பயிர் சுழற்சி செய்யவும்.",
      prevention: "நோயில்லாத விதைகளைப் பயன்படுத்தவும். மேல் நீர்பாசனம் தவிர்க்கவும்.",
    },
    "nitrogen-deficiency": {
      organic: "உரம் அல்லது தொழு உரம் இடவும். பயறு வகை மூடிப் பயிர்களைப் பயன்படுத்தவும்.",
      chemical: "யூரியா அல்லது NPK உரம் (அதிக N) இடவும். மண் பரிசோதனை பரிந்துரைகளைப் பின்பற்றவும்.",
      prevention: "வழக்கமான மண் பரிசோதனை. சீரான உர பயன்பாடு.",
    },
    healthy: {
      organic: "நல்ல நடைமுறைகளைத் தொடரவும். தழைக்கூளம் மற்றும் உரம் இடுங்கள்.",
      chemical: "ரசாயனங்கள் தேவையில்லை. சீரான ஊட்டச்சத்தை பராமரிக்கவும்.",
      prevention: "வழக்கமான கண்காணிப்பு. பயிர் சுழற்சி. சரியான நீர்பாசனம்.",
    },
  },
  te: {
    "early-blight": {
      organic: "ప్రభావిత ఆకులను తొలగించండి. వేప నూనె స్ప్రే (5ml/లీ నీరు) వారానికి ఒకసారి చేయండి.",
      chemical: "రాగి ఆధారిత శిలీంద్రనాశకాన్ని వాడండి. తీవ్రమైన సందర్భాల్లో వ్యవసాయ అధికారిని సంప్రదించండి.",
      prevention: "నైట్‌షేడ్ కాని పంటలతో పంట మార్పిడి. గాలి ప్రసరణకు తగిన ఖాళీని ఉంచండి.",
    },
    "late-blight": {
      organic: "సోకిన మొక్కలను వెంటనే తొలగించి నాశనం చేయండి. పై నీటి పారుదలని నివారించండి.",
      chemical: "వెంటనే క్లోరోథలోనిల్ లేదా మాంకోజెబ్ శిలీంద్రనాశకాన్ని వాడండి.",
      prevention: "నిరోధక రకాలను నాటండి. వ్యాధి లేని విత్తనాలను ఉపయోగించండి.",
    },
    "leaf-rust": {
      organic: "తుప్పు సోకిన ఆకులను తొలగించండి. గంధకం పొడి లేదా బేకింగ్ సోడా ద్రావణం (1 టీస్పూన్/లీ) వాడండి.",
      chemical: "టెబుకోనజోల్ లేదా ప్రోపికోనజోల్ శిలీంద్రనాశకాన్ని వాడండి.",
      prevention: "నిరోధక గోధుమ రకాలను నాటండి. అధిక నత్రజని ఎరువును నివారించండి.",
    },
    "bacterial-spot": {
      organic: "సోకిన ఆకులను తొలగించండి. రాగి స్ప్రే లేదా స్ట్రెప్టోమైసిన్ వాడండి.",
      chemical: "రాగి ఆధారిత బాక్టీరియా నాశినిని ఉపయోగించండి. 2 సంవత్సరాలు పంట మార్పిడి చేయండి.",
      prevention: "వ్యాధి లేని విత్తనాలను ఉపయోగించండి. పై నీటి పారుదలని నివారించండి.",
    },
    "nitrogen-deficiency": {
      organic: "ఎరువు లేదా పశువుల ఎరువు వేయండి. పప్పు కవర్ పంటలను ఉపయోగించండి.",
      chemical: "యూరియా లేదా NPK ఎరువు (అధిక N) వేయండి. మట్టి పరీక్ష సిఫార్సులను అనుసరించండి.",
      prevention: "క్రమం తప్పకుండా మట్టి పరీక్ష. సమతుల్య ఎరువు వాడకం.",
    },
    healthy: {
      organic: "మంచి పద్ధతులను కొనసాగించండి. క్రమం తప్పకుండా మల్చ్ మరియు కంపోస్ట్ వేయండి.",
      chemical: "రసాయనాలు అవసరం లేదు. సమతుల్య పోషణను నిర్వహించండి.",
      prevention: "క్రమం తప్పకుండా పర్యవేక్షణ. పంట మార్పిడి. సరైన నీటి పారుదల.",
    },
  },
}

export function getTreatment(diseaseKey: string, language = "en"): Treatment | null {
  const langTreatments = treatments[language] || treatments.en
  return langTreatments[diseaseKey] || null
}
