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
    "healthy": {
      organic: "Continue good practices. Mulch and compost regularly.",
      chemical: "No chemicals needed. Maintain balanced nutrition.",
      prevention: "Regular monitoring. Crop rotation. Proper irrigation.",
    },
    "leaf-mold": {
      organic: "Improve air circulation. Reduce humidity. Remove lower infected leaves.",
      chemical: "Apply chlorothalonil or copper fungicide.",
      prevention: "Space plants properly. Avoid overhead watering.",
    },
    "septoria-spot": {
      organic: "Remove infected leaves at first sign. Mulch around plants.",
      chemical: "Apply copper fungicide or chlorothalonil.",
      prevention: "Crop rotation. Avoid wetting foliage when watering.",
    },
    "spider-mites": {
      organic: "Spray with neem oil or insecticidal soap. Introduce predatory mites.",
      chemical: "Apply miticide if infestation is severe.",
      prevention: "Keep plants well-watered. Dust leaves regularly.",
    },
    "target-spot": {
      organic: "Remove and destroy infected plant debris. Improve air circulation.",
      chemical: "Apply strobilurin or triazole fungicide.",
      prevention: "Use disease-free seed. Practice crop rotation.",
    },
    "yellow-leaf-curl": {
      organic: "Remove infected plants. Control whitefly with neem oil.",
      chemical: "Use insecticide for whitefly control. No cure once infected.",
      prevention: "Use resistant varieties. Install reflective mulch.",
    },
    "mosaic-virus": {
      organic: "Remove and destroy infected plants. Wash hands after handling.",
      chemical: "No chemical cure. Control aphids that spread the virus.",
      prevention: "Use virus-free seeds. Control weed hosts.",
    },
    "powdery-mildew": {
      organic: "Spray with milk solution (1:9 ratio) or baking soda (1 tsp/L).",
      chemical: "Apply sulfur-based or myclobutanil fungicide.",
      prevention: "Ensure good air circulation. Avoid overhead watering.",
    },
    "black-rot": {
      organic: "Prune infected branches. Remove mummified fruits.",
      chemical: "Apply captan or myclobutanil fungicide.",
      prevention: "Remove plant debris. Prune for good air circulation.",
    },
    "apple-scab": {
      organic: "Rake and destroy fallen leaves. Apply compost tea.",
      chemical: "Apply captan or lime-sulfur fungicide in early spring.",
      prevention: "Plant resistant varieties. Clean up leaf litter.",
    },
    "cedar-rust": {
      organic: "Remove galls from cedar trees. Prune infected branches.",
      chemical: "Apply myclobutanil or chlorothalonil fungicide.",
      prevention: "Remove nearby cedar trees if possible. Plant resistant varieties.",
    },
    "leaf-spot": {
      organic: "Remove infected leaves. Avoid overhead irrigation.",
      chemical: "Apply pyraclostrobin or azoxystrobin fungicide.",
      prevention: "Crop rotation. Use resistant hybrids.",
    },
    "northern-blight": {
      organic: "Rotate with non-host crops. Bury crop residue.",
      chemical: "Apply strobilurin or triazole fungicide.",
      prevention: "Use resistant hybrids. Practice no-till farming.",
    },
    "citrus-greening": {
      organic: "No organic cure. Remove infected trees to prevent spread.",
      chemical: "Control psyllid vectors with insecticides. No cure for infected trees.",
      prevention: "Use certified disease-free nursery stock. Monitor for psyllids.",
    },
    "leaf-scorch": {
      organic: "Remove scorched leaves. Maintain proper watering schedule.",
      chemical: "Apply copper fungicide if fungal. Ensure proper soil nutrition.",
      prevention: "Mulch to retain moisture. Avoid fertilizer burn.",
    },
    "black-measles": {
      organic: "Prune infected wood. Remove affected bark.",
      chemical: "Apply copper fungicide to pruning wounds.",
      prevention: "Avoid wounding vines. Use proper pruning techniques.",
    },
    "leaf-blight": {
      organic: "Remove and destroy infected leaves. Improve drainage.",
      chemical: "Apply mancozeb or copper fungicide.",
      prevention: "Space plants properly. Avoid wet foliage.",
    },
    "unknown": {
      organic: "Consult with local agriculture officer for proper diagnosis.",
      chemical: "Consult with local agriculture officer before applying chemicals.",
      prevention: "Practice general crop hygiene. Monitor plants regularly.",
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
    "healthy": {
      organic: "अच्छी प्रथाएं जारी रखें। नियमित रूप से मल्च और खाद डालें।",
      chemical: "किसी रसायन की आवश्यकता नहीं। संतुलित पोषण बनाए रखें।",
      prevention: "नियमित निगरानी। फसल चक्र। उचित सिंचाई।",
    },
    "unknown": {
      organic: "सटीक निदान के लिए स्थानीय कृषि अधिकारी से परामर्श करें।",
      chemical: "रसायन लगाने से पहले स्थानीय कृषि अधिकारी से परामर्श करें।",
      prevention: "सामान्य फसल स्वच्छता का अभ्यास करें। नियमित रूप से पौधों की निगरानी करें।",
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
    "healthy": {
      organic: "நல்ல நடைமுறைகளைத் தொடரவும். தழைக்கூளம் மற்றும் உரம் இடுங்கள்.",
      chemical: "ரசாயனங்கள் தேவையில்லை. சீரான ஊட்டச்சத்தை பராமரிக்கவும்.",
      prevention: "வழக்கமான கண்காணிப்பு. பயிர் சுழற்சி. சரியான நீர்பாசனம்.",
    },
    "unknown": {
      organic: "சரியான நோயறிதலுக்கு உள்ளூர் வேளாண் அதிகாரியை அணுகவும்.",
      chemical: "ரசாயனங்களைப் பயன்படுத்துவதற்கு முன் உள்ளூர் வேளாண் அதிகாரியை அணுகவும்.",
      prevention: "பொது பயிர் சுகாதாரத்தைப் பயிற்சி செய்யுங்கள். தாவரங்களை தவறாமல் கண்காணிக்கவும்.",
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
    "healthy": {
      organic: "మంచి పద్ధతులను కొనసాగించండి. క్రమం తప్పకుండా మల్చ్ మరియు కంపోస్ట్ వేయండి.",
      chemical: "రసాయనాలు అవసరం లేదు. సమతుల్య పోషణను నిర్వహించండి.",
      prevention: "క్రమం తప్పకుండా పర్యవేక్షణ. పంట మార్పిడి. సరైన నీటి పారుదల.",
    },
    "unknown": {
      organic: "సరైన నిర్ధారణ కోసం స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.",
      chemical: "రసాయనాలను వర్తింపజేయడానికి ముందు స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.",
      prevention: "సాధారణ పంట పరిశుభ్రతను పాటించండి. మొక్కలను క్రమం తప్పకుండా పర్యవేక్షించండి.",
    },
  },
}

export function getTreatment(diseaseKey: string, language = "en"): Treatment | null {
  const langTreatments = treatments[language] || treatments.en
  return langTreatments[diseaseKey] || langTreatments["unknown"] || null
}
