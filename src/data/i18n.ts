/**
 * Interface translation layer. Keys are looked up per language; missing keys fall
 * back to English. Extend by adding keys — never hardcode UI strings in new
 * components.
 */

export type LangId = "en" | "hi" | "mr";
export const languageOptions: Array<{
  id: LangId;
  label: string;
}> = [{
  id: "en",
  label: "English"
}, {
  id: "hi",
  label: "हिन्दी"
}, {
  id: "mr",
  label: "मराठी"
}];
const dict: Record<string, Record<LangId, string>> = {
  /* ------------------------------- navigation ------------------------------ */
  "nav.home": {
    en: "Home",
    hi: "मुखपृष्ठ",
    mr: "मुख्यपृष्ठ"
  },
  "nav.assistant": {
    en: "AI Assistant",
    hi: "एआई सहायक",
    mr: "एआय सहाय्यक"
  },
  "nav.patents": {
    en: "Patent Intelligence",
    hi: "पेटेंट इंटेलिजेंस",
    mr: "पेटंट इंटेलिजेन्स"
  },
  "nav.priorArt": {
    en: "Prior Art",
    hi: "पूर्व-कला (Prior Art)",
    mr: "पूर्व-कला (Prior Art)"
  },
  "nav.formulation": {
    en: "Formulation",
    hi: "फॉर्मूलेशन",
    mr: "फॉर्म्युलेशन"
  },
  "nav.abs": {
    en: "ABS Check",
    hi: "एबीएस जाँच",
    mr: "एबीएस तपासणी"
  },
  "nav.cost": {
    en: "Cost Planner",
    hi: "लागत योजनाकार",
    mr: "खर्च नियोजक"
  },
  "nav.knowledge": {
    en: "Knowledge Explorer",
    hi: "ज्ञान अन्वेषक",
    mr: "ज्ञान अन्वेषक"
  },
  "nav.international": {
    en: "International",
    hi: "अंतरराष्ट्रीय",
    mr: "आंतरराष्ट्रीय"
  },
  "nav.reports": {
    en: "Reports",
    hi: "रिपोर्ट",
    mr: "अहवाल"
  },
  "nav.expert": {
    en: "Expert Help",
    hi: "विशेषज्ञ सहायता",
    mr: "तज्ज्ञ मदत"
  },
  /* --------------------------------- shell --------------------------------- */
  "shell.search": {
    en: "Search everything",
    hi: "सब कुछ खोजें",
    mr: "सर्व शोधा"
  },
  "shell.interfaceLanguage": {
    en: "Interface language",
    hi: "इंटरफ़ेस भाषा",
    mr: "इंटरफेस भाषा"
  },
  "shell.commandMenu": {
    en: "Command menu",
    hi: "कमांड मेनू",
    mr: "कमांड मेनू"
  },
  "shell.menu": {
    en: "Menu",
    hi: "मेनू",
    mr: "मेनू"
  },
  "shell.tagline": {
    en: "Multilingual, citation-grounded decision support for Ayurveda intellectual property and regulatory questions across Indian and international jurisdictions.",
    hi: "भारतीय और अंतरराष्ट्रीय क्षेत्राधिकारों में आयुर्वेद बौद्धिक संपदा और नियामक प्रश्नों के लिए बहुभाषी, उद्धरण-आधारित निर्णय सहायता।",
    mr: "भारतीय आणि आंतरराष्ट्रीय क्षेत्राधिकारांमध्ये आयुर्वेद बौद्धिक संपदा व नियामक प्रश्नांसाठी बहुभाषिक, उद्धरण-आधारित निर्णय सहाय्य."
  },
  "shell.colWorkspaces": {
    en: "Workspaces",
    hi: "कार्यक्षेत्र",
    mr: "कार्यक्षेत्रे"
  },
  "shell.colCompliance": {
    en: "Compliance",
    hi: "अनुपालन",
    mr: "अनुपालन"
  },
  "shell.colTransparency": {
    en: "Transparency",
    hi: "पारदर्शकता",
    mr: "पारदर्शकता"
  },
  "shell.disclaimer": {
    en: "Information, not legal advice. Verify with official sources and consult a qualified IP professional before acting.",
    hi: "जानकारी मात्र — कानूनी सलाह नहीं। कार्रवाई से पहले आधिकारिक स्रोतों से सत्यापित करें और योग्य आईपी विशेषज्ञ से परामर्श लें।",
    mr: "फक्त माहिती — कायदेशीर सल्ला नाही. कारवाईपूर्वी अधिकृत स्रोतांकडून पडताळणी करा आणि पात्र आयपी तज्ज्ञांचा सल्ला घ्या."
  },
  "shell.sourceRegistry": {
    en: "Source registry",
    hi: "स्रोत रजिस्ट्री",
    mr: "स्रोत नोंदवही"
  },
  "shell.humanReview": {
    en: "Human IP review",
    hi: "मानवी आईपी समीक्षा",
    mr: "मानवी आयपी आढावा"
  },
  "shell.reportsHistory": {
    en: "Reports & history",
    hi: "रिपोर्ट व इतिहास",
    mr: "अहवाल व इतिहास"
  },
  "shell.knowledgeExplorer": {
    en: "Knowledge Explorer",
    hi: "ज्ञान अन्वेषक",
    mr: "ज्ञान अन्वेषक"
  },
  "shell.groupResearch": {
    en: "Research",
    hi: "अनुसंधान",
    mr: "संशोधन"
  },
  "shell.groupCompliance": {
    en: "Formulation & Compliance",
    hi: "फॉर्मूलेशन व अनुपालन",
    mr: "फॉर्म्युलेशन व अनुपालन"
  },
  "shell.groupKnowledge": {
    en: "Knowledge & Evidence",
    hi: "ज्ञान व साक्ष्य",
    mr: "ज्ञान व पुरावे"
  },
  "shell.groupGlobal": {
    en: "Global IP",
    hi: "वैश्विक आईपी",
    mr: "जागतिक आयपी"
  },
  "shell.groupSupport": {
    en: "Reports & Support",
    hi: "रिपोर्ट व सहायता",
    mr: "अहवाल व सहाय्य"
  },
  /* ------------------------------ page headers ----------------------------- */
  "pg.assistant.eyebrow": {
    en: "AI workspace",
    hi: "एआई कार्यक्षेत्र",
    mr: "एआय कार्यक्षेत्र"
  },
  "pg.assistant.title": {
    en: "Ask about protection, classification or compliance",
    hi: "संरक्षण, वर्गीकरण या अनुपालन के बारे में पूछें",
    mr: "संरक्षण, वर्गीकरण किंवा अनुपालनाबद्दल विचारा"
  },
  "pg.assistant.subtitle": {
    en: "Answers are assembled from official records and always carry jurisdiction, evidence and limitations. Information, not legal advice.",
    hi: "उत्तर आधिकारिक अभिलेखों से बनाए जाते हैं और हमेशा क्षेत्राधिकार, साक्ष्य और सीमाएँ दर्शाते हैं। जानकारी मात्र — कानूनी सलाह नहीं।",
    mr: "उत्तरे अधिकृत नोंदींवरून तयार होतात आणि नेहमी क्षेत्राधिकार, पुरावे व मर्यादा दर्शवतात. फक्त माहिती — कायदेशीर सल्ला नाही."
  },
  "pg.patents.eyebrow": {
    en: "Concept retrieval",
    hi: "अवधारणा खोज",
    mr: "संकल्पना शोध"
  },
  "pg.patents.title": {
    en: "Patent Intelligence",
    hi: "पेटेंट इंटेलिजेंस",
    mr: "पेटंट इंटेलिजेन्स"
  },
  "pg.patents.subtitle": {
    en: "Find patents and prior art by concept, not just keywords.",
    hi: "केवल कीवर्ड से नहीं, अवधारणा के आधार पर पेटेंट और पूर्व-कला खोजें।",
    mr: "केवळ कीवर्डने नव्हे, तर संकल्पनेनुसार पेटंट व पूर्व-कला शोधा."
  },
  "pg.priorArt.eyebrow": {
    en: "Evidence explorer",
    hi: "साक्ष्य अन्वेषक",
    mr: "पुरावा अन्वेषक"
  },
  "pg.priorArt.title": {
    en: "Prior-art trace",
    hi: "पूर्व-कला अनुरेखण",
    mr: "पूर्व-कला मागोवा"
  },
  "pg.priorArt.subtitle": {
    en: "Formulation → detected ingredients → TKDL records → patent cases → international records. Select any node to inspect the underlying record.",
    hi: "फॉर्मूलेशन → पहचानी गई सामग्री → टीकेडीएल अभिलेख → पेटेंट मामले → अंतरराष्ट्रीय अभिलेख। किसी भी नोड को चुनकर अंतर्निहित अभिलेख देखें।",
    mr: "फॉर्म्युलेशन → ओळखलेली घटकद्रव्ये → टीकेडीएल नोंदी → पेटंट प्रकरणे → आंतरराष्ट्रीय नोंदी. कोणताही नोड निवडून मूलभूत नोंद पाहा."
  },
  "pg.formulation.eyebrow": {
    en: "Guided wizard",
    hi: "मार्गदर्शित विज़ार्ड",
    mr: "मार्गदर्शित विझार्ड"
  },
  "pg.formulation.title": {
    en: "What are you developing?",
    hi: "आप क्या विकसित कर रहे हैं?",
    mr: "तुम्ही काय विकसित करत आहात?"
  },
  "pg.formulation.subtitle": {
    en: "Four short questions produce a preliminary regulatory classification with reasoning, authorities and cited sources.",
    hi: "चार छोटे प्रश्नों से तर्क, अधिकारियों और उद्धृत स्रोतों सहित प्रारंभिक नियामक वर्गीकरण मिलता है।",
    mr: "चार छोट्या प्रश्नांतून कारणे, अधिकारी व उद्धृत स्रोतांसह प्राथमिक नियामक वर्गीकरण मिळते."
  },
  "pg.abs.eyebrow": {
    en: "Compliance workflow",
    hi: "अनुपालन कार्यप्रवाह",
    mr: "अनुपालन कार्यप्रवाह"
  },
  "pg.abs.title": {
    en: "Biodiversity & ABS Check",
    hi: "जैव विविधता व एबीएस जाँच",
    mr: "जैवविविधता व एबीएस तपासणी"
  },
  "pg.abs.subtitle": {
    en: "Access and benefit-sharing signals for the biological resource, its origin and any associated traditional knowledge.",
    hi: "जैव संसाधन, उसकी उत्पत्ति और संबद्ध पारंपरिक ज्ञान के लिए एक्सेस और लाभ-साझाकरण संकेत।",
    mr: "जैव संसाधन, त्याची उत्पत्ती व संबंधित पारंपरिक ज्ञानासाठी प्रवेश व लाभ-वाटप संकेत."
  },
  "pg.cost.eyebrow": {
    en: "Estimator",
    hi: "अनुमानक",
    mr: "अंदाजक"
  },
  "pg.cost.title": {
    en: "IP Cost Planner",
    hi: "आईपी लागत योजनाकार",
    mr: "आयपी खर्च नियोजक"
  },
  "pg.cost.subtitle": {
    en: "Official government fees and professional/service estimates are always shown separately, each with a source and an effective date.",
    hi: "सरकारी शुल्क और पेशेवर/सेवा अनुमान हमेशा अलग-अलग दिखाए जाते हैं — प्रत्येक के साथ स्रोत और प्रभावी तिथि।",
    mr: "सरकारी शुल्क व व्यावसायिक/सेवा अंदाज नेहमी स्वतंत्र दाखवले जातात — प्रत्येकासह स्रोत व प्रभावी तारीख."
  },
  "pg.knowledge.eyebrow": {
    en: "Botanical intelligence",
    hi: "वानस्पतिक इंटेलिजेंस",
    mr: "वानस्पतिक इंटेलिजेन्स"
  },
  "pg.knowledge.title": {
    en: "Traditional Knowledge Family Explorer",
    hi: "पारंपरिक ज्ञान परिवार अन्वेषक",
    mr: "पारंपरिक ज्ञान कुटुंब अन्वेषक"
  },
  "pg.knowledge.subtitle": {
    en: "Botanical family, genus, documented traditional use and related research candidates — with the official record behind each claim.",
    hi: "वानस्पतिक कुल, वंश, प्रलेखित पारंपरिक उपयोग और संबंधित शोध उम्मीदवार — हर दावे के पीछे आधिकारिक अभिलेख।",
    mr: "वानस्पतिक कुल, वंश, नोंदवलेला पारंपरिक वापर व संबंधित संशोधन उमेदवार — प्रत्येक दाव्यामागे अधिकृत नोंद."
  },
  "pg.international.eyebrow": {
    en: "Jurisdiction map",
    hi: "क्षेत्राधिकार मानचित्र",
    mr: "क्षेत्राधिकार नकाशा"
  },
  "pg.international.title": {
    en: "International IP intelligence",
    hi: "अंतरराष्ट्रीय आईपी इंटेलिजेंस",
    mr: "आंतरराष्ट्रीय आयपी इंटेलिजेन्स"
  },
  "pg.international.subtitle": {
    en: "Select a jurisdiction to see its patent and trade mark framework, traditional knowledge treatment, ABS regime and disclosure requirements.",
    hi: "किसी क्षेत्राधिकार का पेटेंट व ट्रेडमार्क ढाँचा, पारंपरिक ज्ञान व्यवहार, एबीएस व्यवस्था और प्रकटीकरण आवश्यकताएँ देखने के लिए उसे चुनें।",
    mr: "क्षेत्राधिकार निवडून त्याचे पेटंट व ट्रेडमार्क ढांचे, पारंपरिक ज्ञान वागणूक, एबीएस व्यवस्था व प्रकटीकरण आवश्यकता पाहा."
  },
  "pg.reports.eyebrow": {
    en: "Workspace",
    hi: "कार्यक्षेत्र",
    mr: "कार्यक्षेत्र"
  },
  "pg.reports.title": {
    en: "Reports & history",
    hi: "रिपोर्ट व इतिहास",
    mr: "अहवाल व इतिहास"
  },
  "pg.reports.subtitle": {
    en: "Generate an IP intelligence report where every source stays attached to the finding it supports, and revisit earlier work.",
    hi: "ऐसी आईपी इंटेलिजेंस रिपोर्ट बनाएँ जिसमें हर स्रोत उस निष्कर्ष से जुड़ा रहता है जिसे वह समर्थन देता है, और पुराने कार्यों पर लौटें।",
    mr: "असा आयपी इंटेलिजेन्स अहवाल तयार करा ज्यात प्रत्येक स्रोत संबंधित निष्कर्षाशी जोडलेला राहतो, आणि पूर्वीच्या कामाकडे परत या."
  },
  "pg.expert.eyebrow": {
    en: "Expert escalation",
    hi: "विशेषज्ञ एस्केलेशन",
    mr: "तज्ज्ञ एस्केलेशन"
  },
  "pg.expert.title": {
    en: "When the evidence ends, a professional begins.",
    hi: "जहाँ साक्ष्य समाप्त होता है, वहाँ विशेषज्ञ शुरू होता है।",
    mr: "पुरावा जिथे संपतो, तिथे तज्ज्ञ सुरू होतो."
  },
  "pg.expert.subtitle": {
    en: "IP-SAKTI provides information, not legal advice. For binding decisions, escalate to a qualified IP professional — with your analysis context attached.",
    hi: "IP-SAKTI जानकारी देता है, कानूनी सलाह नहीं। बाध्यकारी निर्णयों के लिए योग्य आईपी विशेषज्ञ को भेजें — आपके विश्लेषण संदर्भ सहित।",
    mr: "IP-SAKTI माहिती देते, कायदेशीर सल्ला नाही. बंधनकारक निर्णयांसाठी पात्र आयपी तज्ज्ञाकडे पाठवा — तुमच्या विश्लेषणाच्या संदर्भासह."
  },
  "pg.sources.eyebrow": {
    en: "Source transparency",
    hi: "स्रोत पारदर्शकता",
    mr: "स्रोत पारदर्शकता"
  },
  "pg.sources.title": {
    en: "Every answer, anchored to an authority.",
    hi: "हर उत्तर, किसी प्राधिकरण से जुड़ा हुआ।",
    mr: "प्रत्येक उत्तर, कोणत्यातरी अधिकार्याशी बांधलेले."
  },
  "pg.sources.subtitle": {
    en: "IP-SAKTI never answers from model memory alone. Each claim cites an official registry, statute, or treaty body listed here — with its last verification date.",
    hi: "IP-SAKTI कभी केवल मॉडल स्मृति से उत्तर नहीं देता। हर दावा यहाँ सूचीबद्ध आधिकारिक रजिस्ट्री, क़ानून या संधि निकाय को उद्धृत करता है — अंतिम सत्यापन तिथि सहित।",
    mr: "IP-SAKTI कधीही केवळ मॉडेल मेमरीवरून उत्तर देत नाही. प्रत्येक दावा येथे सूचीबद्ध अधिकृत नोंदवही, कायदा किंवा तह संस्थेचा उल्लेख करतो — शेवटच्या पडताळणी तारखेसह."
  },
  /* ------------------------------ page guides ------------------------------ */
  "guide.home.title": {
    en: "What is IP-SAKTI Sahayak?",
    hi: "IP-SAKTI सहायक क्या है?",
    mr: "IP-SAKTI सहायक म्हणजे काय?"
  },
  "guide.home.body": {
    en: "A decision-support workbench for Ayurveda intellectual property. It screens patents, traces prior art, classifies formulations, checks ABS obligations, estimates filing costs and cites the official record behind every statement.\nUse the navigation above to open a workspace; each page explains itself in a banner like this one.",
    hi: "आयुर्वेद बौद्धिक संपदा के लिए निर्णय-सहायता वर्कबेंच। यह पेटेंट जाँचता है, पूर्व-कला खोजता है, फॉर्मूलेशन वर्गीकृत करता है, एबीएस दायित्व जाँचता है, फाइलिंग लागत का अनुमान देता है और हर कथन के पीछे आधिकारिक अभिलेख दिखाता है।\nऊपर के नेविगेशन से कोई भी कार्यक्षेत्र खोलें; हर पृष्ठ ऐसे बैनर में अपनी व्याख्या करता है।",
    mr: "आयुर्वेद बौद्धिक संपदेसाठी निर्णय-सहायता कार्यपीठ. हे पेटंट तपासते, पूर्व-कला शोधते, फॉर्म्युलेशन वर्गीकृत करते, एबीएस दायित्वे तपासते, फाइलिंग खर्चाचा अंदाज देते आणि प्रत्येक विधानामागील अधिकृत नोंद दाखवते.\nवरील नेव्हिगेशनमधून कार्यक्षेत्र उघडा; प्रत्येक पान अशाच बॅनरमध्ये स्वतःचे स्पष्टीकरण देते."
  },
  "guide.assistant.title": {
    en: "How the AI Assistant works",
    hi: "एआई सहायक कैसे काम करता है",
    mr: "एआय सहाय्यक कसे कार्य करते"
  },
  "guide.assistant.body": {
    en: "Type a question about protecting or classifying an Ayurveda formulation. The assistant retrieves matching official records (TKDL, patent offices, regulators), assembles an answer, and shows its confidence, the sources used, and the limits of the answer.\nIf the question has legal or financial consequences, use the escalation link to hand the same context to a human professional.",
    hi: "आयुर्वेद फॉर्मूलेशन के संरक्षण या वर्गीकरण के बारे में प्रश्न लिखें। सहायक संबंधित आधिकारिक अभिलेख (टीकेडीएल, पेटेंट कार्यालय, नियामक) खोजता है, उत्तर बनाता है और अपना विश्वास-स्कोर, उपयोग किए गए स्रोत और उत्तर की सीमाएँ दिखाता है।\nयदि प्रश्न के कानूनी या आर्थिक परिणाम हैं, तो एस्केलेशन लिंक से वही संदर्भ मानव विशेषज्ञ को भेजें।",
    mr: "आयुर्वेद फॉर्म्युलेशनच्या संरक्षण किंवा वर्गीकरणाबद्दल प्रश्न टाइप करा. सहाय्यक संबंधित अधिकृत नोंदी (टीकेडीएल, पेटंट कार्यालये, नियामक) शोधते, उत्तर तयार करते आणि विश्वास-स्कोअर, वापरलेले स्रोत व उत्तराच्या मर्यादा दाखवते.\nप्रश्नाला कायदेशीर किंवा आर्थिक परिणाम असल्यास, एस्केलेशन लिंकने तोच संदर्भ मानवी तज्ज्ञाकडे पाठवा."
  },
  "guide.patents.title": {
    en: "How Patent Intelligence works",
    hi: "पेटेंट इंटेलिजेंस कैसे काम करता है",
    mr: "पेटंट इंटेलिजेन्स कसे कार्य करते"
  },
  "guide.patents.body": {
    en: "Describe your formulation in plain words. The search matches by concept and ingredient (semantic), not only exact keywords, across Indian and international patent offices.\nFilters narrow by jurisdiction, plant, status and source. Each result shows a similarity score and links to the official register so you can verify it yourself.",
    hi: "अपने फॉर्मूलेशन को सामान्य शब्दों में लिखें। खोज भारतीय और अंतरराष्ट्रीय पेटेंट कार्यालयों में अवधारणा और सामग्री के आधार पर (सिमैंटिक) मेल खाती है, न कि केवल सटीक कीवर्ड से।\nफ़िल्टर से क्षेत्राधिकार, पौधा, स्थिति और स्रोत के अनुसार परिणाम सीमित करें। हर परिणाम समानता स्कोर और आधिकारिक रजिस्टर का लिंक दिखाता है ताकि आप स्वयं सत्यापित कर सकें।",
    mr: "तुमचे फॉर्म्युलेशन साध्या शब्दांत लिहा. शोध भारतीय व आंतरराष्ट्रीय पेटंट कार्यालयांमध्ये संकल्पना व घटकांच्या आधारे (सिमांटिक) जुळणी करतो, केवळ अचूक कीवर्डने नव्हे.\nफिल्टरने क्षेत्राधिकार, वनस्पती, स्थिती व स्रोतानुसार निकाल मर्यादित करा. प्रत्येक निकाल समानता स्कोअर व अधिकृत नोंदवहीचा दुवा दाखवतो जेणेकरून तुम्ही स्वतः पडताळणी करू शकता."
  },
  "guide.priorArt.title": {
    en: "How the prior-art flow works",
    hi: "पूर्व-कला प्रवाह कैसे काम करता है",
    mr: "पूर्व-कला प्रवाह कसा कार्य करतो"
  },
  "guide.priorArt.body": {
    en: "This page answers one question: “Has this already been documented or patented?” The graph reads left to right as a chain of evidence:\n1. Formulation — your product idea is broken down.\n2. Ingredients — each detected plant/mineral component.\n3. TKDL records — matches in India's Traditional Knowledge Digital Library (prior art that can block patents).\n4. Patent cases — existing applications/grants claiming similar subject matter.\n5. International records — corresponding WIPO/EPO/USPTO filings abroad.\nSelect any node to open its underlying record: authority, excerpt, dates and the official source link. Edge thickness reflects strength of the match.",
    hi: "यह पृष्ठ एक प्रश्न का उत्तर देता है: “क्या यह पहले से प्रलेखित या पेटेंट है?” ग्राफ़ बाएँ से दाएँ साक्ष्य-शृंखला के रूप में पढ़ा जाता है:\n1. फॉर्मूलेशन — आपके उत्पाद-विचार का विश्लेषण।\n2. सामग्री — पहचाना गया प्रत्येक पौधा/खनिज घटक।\n3. टीकेडीएल अभिलेख — भारतीय पारंपरिक ज्ञान डिजिटल लाइब्रेरी में मेल (पेटेंट रोक सकने वाली पूर्व-कला)।\n4. पेटेंट मामले — समान विषय पर मौजूदा आवेदन/अनुदान।\n5. अंतरराष्ट्रीय अभिलेख — विदेशों में संबंधित WIPO/EPO/USPTO फाइलिंग।\nकिसी भी नोड को चुनकर उसका अंतर्निहित अभिलेख देखें: प्राधिकरण, उद्धरण, तिथियाँ और आधिकारिक स्रोत लिंक। कड़ी की मोटाई मेल की मज़बूती दर्शाती है।",
    mr: "हे पान एका प्रश्नाचे उत्तर देते: “हे आधीच नोंदवले किंवा पेटंट झाले आहे का?” आलेख डावीकडून उजवीकडे पुराव्याची साखळी म्हणून वाचला जातो:\n1. फॉर्म्युलेशन — तुमच्या उत्पादन कल्पनेचे विश्लेषण.\n2. घटक — ओळखलेला प्रत्येक वनस्पती/खनिज घटक.\n3. टीकेडीएल नोंदी — भारताच्या पारंपरिक ज्ञान डिजिटल लायब्ररीतील जुळण्या (पेटंट रोखू शकणारी पूर्व-कला).\n4. पेटंट प्रकरणे — समान विषयावरील विद्यमान अर्ज/मंजुरी.\n5. आंतरराष्ट्रीय नोंदी — परदेशातील संबंधित WIPO/EPO/USPTO फाइलिंग.\nकोणताही नोड निवडून त्याची मूलभूत नोंद पाहा: अधिकारी, उतारा, तारखा व अधिकृत स्रोत दुवा. जोडणीची जाडी जुळणीची ताकद दर्शवते."
  },
  "guide.formulation.title": {
    en: "How the classification wizard works",
    hi: "वर्गीकरण विज़ार्ड कैसे काम करता है",
    mr: "वर्गीकरण विझार्ड कसे कार्य करते"
  },
  "guide.formulation.body": {
    en: "Answer four short questions (intended use, claims, ingredients, presentation). The wizard produces a preliminary regulatory category — e.g. classical Ayurvedic medicine vs. proprietary medicine vs. supplement — with the reasoning, the responsible authorities and cited sources.\nThis is a triage step: a human professional should confirm the classification before you file anything.",
    hi: "चार छोटे प्रश्नों के उत्तर दें (उद्देश्य, दावे, सामग्री, प्रस्तुति)। विज़ार्ड प्रारंभिक नियामक श्रेणी बताता है — जैसे शास्त्रीय आयुर्वेदिक औषधि बनाम प्रोपराइटरी औषधि बनाम सप्लीमेंट — तर्क, जिम्मेदार अधिकारियों और उद्धृत स्रोतों सहित।\nयह प्रारंभिक छँटाई है: कुछ भी फाइल करने से पहले मानव विशेषज्ञ से वर्गीकरण की पुष्टि कराएँ।",
    mr: "चार छोट्या प्रश्नांची उत्तरे द्या (हेतू, दावे, घटक, सादरीकरण). विझार्ड प्राथमिक नियामक श्रेणी देते — उदा. शास्त्रीय आयुर्वेदिक औषध विरुद्ध प्रोप्रायटरी औषध विरुद्ध सप्लिमेंट — कारणे, जबाबदार अधिकारी व उद्धृत स्रोतांसह.\nही प्राथमिक छाणनी आहे: काहीही फाइल करण्यापूर्वी मानवी तज्ज्ञाकडून वर्गीकरणाची पुष्टी करा."
  },
  "guide.abs.title": {
    en: "How the ABS check works",
    hi: "एबीएस जाँच कैसे काम करती है",
    mr: "एबीएस तपासणी कशी कार्य करते"
  },
  "guide.abs.body": {
    en: "Enter where the biological resource comes from and how you intend to use it. The check weighs traditional-knowledge association, commercial use, patent intent and export to estimate an Access & Benefit-Sharing risk level.\nIt then points to the framework that applies (NBA/SBB in India, Nagoya Protocol abroad) and the documentation you would need — before you commit to filings or trade.",
    hi: "बताएँ कि जैव संसाधन कहाँ से आता है और आप उसे कैसे उपयोग करना चाहते हैं। जाँच पारंपरिक-ज्ञान संबंध, वाणिज्यिक उपयोग, पेटेंट आशय और निर्यात को तौलकर एक्सेस व लाभ-साझाकरण जोखिम-स्तर का अनुमान देती है।\nफिर यह लागू ढाँचा (भारत में NBA/SBB, विदेश में नागोया प्रोटोकॉल) और आवश्यक दस्तावेज़ बताती है — फाइलिंग या व्यापार से पहले।",
    mr: "जैव संसाधन कुठून येते आणि तुम्ही त्याचा वापर कसा करणार आहात हे भरा. तपासणी पारंपरिक-ज्ञान संबंध, व्यावसायिक वापर, पेटंट हेतू व निर्यात यांचे वजन करून प्रवेश व लाभ-वाटप जोखीम-पातळीचा अंदाज देते.\nमग ती लागू होणारी व्यवस्था (भारतात NBA/SBB, परदेशात नागोया प्रोटोकॉल) व आवश्यक कागदपत्रे सांगते — फाइलिंग किंवा व्यापारापूर्वी."
  },
  "guide.cost.title": {
    en: "How the Cost Planner works",
    hi: "लागत योजनाकार कैसे काम करता है",
    mr: "खर्च नियोजक कसा कार्य करतो"
  },
  "guide.cost.body": {
    en: "Pick an IP instrument (patent, trade mark, design, PCT, Madrid) and applicant type. Official government fees and professional/service estimates are always listed separately, each with its source and effective date.\nSliders let you model scale (claims, classes, countries). Numbers update against the fee schedule version shown, so you always know which revision produced the estimate.",
    hi: "आईपी साधन (पेटेंट, ट्रेडमार्क, डिज़ाइन, पीसीटी, मैड्रिड) और आवेदक प्रकार चुनें। सरकारी शुल्क और पेशेवर/सेवा अनुमान हमेशा अलग-अलग, स्रोत और प्रभावी तिथि सहित दिखाए जाते हैं।\nस्लाइडर से पैमाना (दावे, वर्ग, देश) बदलें। आँकड़े दिखाए गए शुल्क-अनुसूची संस्करण के अनुसार अपडेट होते हैं, ताकि आप जानें कि अनुमान किस संशोधन से बना है।",
    mr: "आयपी साधन (पेटंट, ट्रेडमार्क, डिझाइन, पीसीटी, माद्रिद) व अर्जदार प्रकार निवडा. सरकारी शुल्क व व्यावसायिक/सेवा अंदाज नेहमी स्वतंत्र, स्रोत व प्रभावी तारखेसह दाखवले जातात.\nस्लायडरने प्रमाण (दावे, वर्ग, देश) बदला. आकडे दाखवलेल्या शुल्क-सूची आवृत्तीनुसार बदलतात, जेणेकरून अंदाज कोणत्या सुधारणेतून आला हे कळते."
  },
  "guide.knowledge.title": {
    en: "How the Knowledge Explorer works",
    hi: "ज्ञान अन्वेषक कैसे काम करता है",
    mr: "ज्ञान अन्वेषक कसा कार्य करतो"
  },
  "guide.knowledge.body": {
    en: "Choose a medicinal plant to see its botanical family and genus, documented traditional uses, and related plants worth researching next.\nEvery use claim is tied to a TKDL or official record — this is a map of documented knowledge, not a recommendation of efficacy.",
    hi: "कोई औषधीय पौधा चुनकर उसका वानस्पतिक कुल और वंश, प्रलेखित पारंपरिक उपयोग और आगे शोध योग्य संबंधित पौधे देखें।\nहर उपयोग-दावा किसी टीकेडीएल या आधिकारिक अभिलेख से जुड़ा है — यह प्रलेखित ज्ञान का मानचित्र है, प्रभावशीलता की सिफ़ारिश नहीं।",
    mr: "औषधी वनस्पती निवडून तिचे वानस्पतिक कुल व वंश, नोंदवलेले पारंपरिक उपयोग व पुढे संशोधनासाठी योग्य संबंधित वनस्पती पाहा.\nप्रत्येक उपयोग-दावा टीकेडीएल किंवा अधिकृत नोंदीशी बांधलेला आहे — हा नोंदवलेल्या ज्ञानाचा नकाशा आहे, कार्यक्षमतेची शिफारस नव्हे."
  },
  "guide.international.title": {
    en: "How the jurisdiction map works",
    hi: "क्षेत्राधिकार मानचित्र कैसे काम करता है",
    mr: "क्षेत्राधिकार नकाशा कसा कार्य करतो"
  },
  "guide.international.body": {
    en: "Select a country or region to profile its IP system: patent and trade mark framework, how traditional knowledge is treated, the ABS regime, and disclosure-of-origin requirements.\nEach profile links to the official authority so you can confirm the current rules before filing abroad.",
    hi: "किसी देश या क्षेत्र को चुनकर उसकी आईपी प्रणाली देखें: पेटेंट व ट्रेडमार्क ढाँचा, पारंपरिक ज्ञान का व्यवहार, एबीएस व्यवस्था और उत्पत्ति-प्रकटीकरण आवश्यकताएँ।\nहर प्रोफ़ाइल आधिकारिक प्राधिकरण से जुड़ती है ताकि विदेश में फाइल करने से पहले वर्तमान नियमों की पुष्टि कर सकें।",
    mr: "देश किंवा प्रदेश निवडून त्याची आयपी व्यवस्था पाहा: पेटंट व ट्रेडमार्क ढांचा, पारंपरिक ज्ञानाची वागणूक, एबीएस व्यवस्था व उत्पत्ती-प्रकटीकरण आवश्यकता.\nप्रत्येक प्रोफाइल अधिकृत अधिकार्याशी जोडलेली आहे जेणेकरून परदेशात फाइल करण्यापूर्वी सध्याच्या नियमांची पुष्टी करता येते."
  },
  "guide.reports.title": {
    en: "How Reports work",
    hi: "रिपोर्ट कैसे काम करती हैं",
    mr: "अहवाल कसे कार्य करतात"
  },
  "guide.reports.body": {
    en: "Reports bundle findings from the other workspaces into one document where every source stays attached to the finding it supports.\nPreview the structure here, then export or share. The history list lets you reopen earlier sessions and reports.",
    hi: "रिपोर्ट अन्य कार्यक्षेत्रों के निष्कर्षों को एक दस्तावेज़ में बाँधती हैं, जिसमें हर स्रोत उस निष्कर्ष से जुड़ा रहता है जिसे वह समर्थन देता है।\nयहाँ संरचना का पूर्वावलोकन करें, फिर निर्यात या साझा करें। इतिहास सूची से पुराने सत्र और रिपोर्ट फिर से खोलें।",
    mr: "अहवाल इतर कार्यक्षेत्रांतील निष्कर्ष एका दस्तऐवजात एकत्र करतात, जिथे प्रत्येक स्रोत संबंधित निष्कर्षाशी जोडलेला राहतो.\nयेथे रचनेचे पूर्वावलोकन करा, मग निर्यात किंवा शेअर करा. इतिहास सूचीतून जुने सत्रे व अहवाल पुन्हा उघडा."
  },
  "guide.expert.title": {
    en: "How expert escalation works",
    hi: "विशेषज्ञ एस्केलेशन कैसे काम करता है",
    mr: "तज्ज्ञ एस्केलेशन कसे कार्य करते"
  },
  "guide.expert.body": {
    en: "Automated analysis stops where binding decisions begin. Describe your situation, pick a topic, and optionally attach your in-app analysis (assistant session, evidence graph, ABS assessment).\nA qualified IP professional receives the same cited context — so the conversation starts from evidence, not from scratch.",
    hi: "स्वचालित विश्लेषण वहीं रुकता है जहाँ बाध्यकारी निर्णय शुरू होते हैं। अपनी स्थिति बताएँ, विषय चुनें, और चाहें तो अपना इन-ऐप विश्लेषण (सहायक सत्र, साक्ष्य ग्राफ़, एबीएस मूल्यांकन) संलग्न करें।\nयोग्य आईपी विशेषज्ञ को वही उद्धृत संदर्भ मिलता है — बातचीत साक्ष्य से शुरू होती है, शून्य से नहीं।",
    mr: "स्वयंचलित विश्लेषण तिथे थांबते जिथे बंधनकारक निर्णय सुरू होतात. तुमची परिस्थिती सांगा, विषय निवडा आणि हवे असल्यास तुमचे इन-अ‍ॅप विश्लेषण (सहाय्यक सत्र, पुरावा आलेख, एबीएस मूल्यमापन) जोडा.\nपात्र आयपी तज्ज्ञाला तोच उद्धृत संदर्भ मिळतो — संवाद पुराव्यापासून सुरू होतो, शून्यापासून नव्हे."
  },
  "guide.sources.title": {
    en: "How the source registry works",
    hi: "स्रोत रजिस्ट्री कैसे काम करती है",
    mr: "स्रोत नोंदवही कशी कार्य करते"
  },
  "guide.sources.body": {
    en: "This is the complete list of authorities IP-SAKTI cites. Each entry shows who maintains it, which jurisdiction it covers, the data version in use, and when it was last verified.\nIf a source cannot be re-verified, answers depending on it are marked “Review required” rather than presented as fact.",
    hi: "यह IP-SAKTI द्वारा उद्धृत प्राधिकरणों की पूरी सूची है। हर प्रविष्टि बताती है कि इसे कौन बनाए रखता है, यह किस क्षेत्राधिकार को कवर करती है, उपयोग में डेटा संस्करण और अंतिम सत्यापन कब हुआ।\nयदि कोई स्रोत पुनः सत्यापित नहीं हो पाता, तो उस पर निर्भर उत्तरों को तथ्य के बजाय “समीक्षा आवश्यक” चिह्नित किया जाता है।",
    mr: "ही IP-SAKTI उद्धृत करणाऱ्या अधिकार्यांची संपूर्ण यादी आहे. प्रत्येक नोंद सांगते की ती कोण सांभाळते, ती कोणते क्षेत्राधिकार व्यापते, वापरातील डेटा आवृत्ती व शेवटची पडताळणी केव्हा झाली.\nस्रोत पुन्हा पडताळता आला नाही तर त्यावर अवलंबून उत्तरे वस्तुस्थिती ऐवजी “पुनरावलोकन आवश्यक” म्हणून चिन्हांकित केली जातात."
  }
};
export function translate(lang: LangId, key: string): string {
  return dict[key]?.[lang] ?? dict[key]?.en ?? key;
}