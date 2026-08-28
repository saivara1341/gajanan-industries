document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}}));
/* Keep the final image sequence inside its own panel.  The slides are absolute
   elements, so this late guard also protects the footer from any earlier style
   overrides while the page enhancements initialise. */
setTimeout(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .closing{position:relative!important;z-index:1!important;overflow:hidden!important}
    .closing-photo{position:relative!important;isolation:isolate!important;overflow:hidden!important;z-index:0!important}
    .closing-photo .closing-slide{position:absolute!important;inset:-3%!important;z-index:0!important;pointer-events:none!important}
    .closing-photo>*:not(.closing-slide){position:relative!important;z-index:1!important}
    footer{position:relative!important;z-index:5!important;isolation:isolate!important}
  `;
  document.head.appendChild(style);
},2300);
// ============================================================
// Native Multilingual System (Accurate & Pure Client-Side)
// ============================================================
const I18N = {
  en: {
    navStory: "Our story",
    navRange: "Rice range",
    navQuality: "Quality",
    tradeInquiry: "Trade inquiry <span>↗</span>",
    heroEst: "NIZAMABAD, INDIA <i></i> EST. 1969",
    heroTitle: "RICE,<br>DONE <em>RIGHT.</em>",
    heroDesc: "Gajanan brings together careful paddy selection, decades of milling expertise and dependable quality for every table.",
    heroCta: "Explore our rice <span>↓</span>",
    scrollExplore: "SCROLL TO EXPLORE",
    whoWeAreMark: "01 / WHO WE ARE",
    whoWeAreTitle: "CRAFTING<br>PURITY IN<br><em>EVERY GRAIN.</em>",
    whoWeAreDesc: "Established in 1969 from a visionary rice milling unit in Nizamabad, Shree Gajanan Industries has grown into one of India’s premier non-Basmati rice producers. Guided by uncompromised integrity, state-of-the-art Swiss precision, and over five decades of agrarian wisdom, we bring perfection to culinary tables worldwide.",
    journeyLink: "Discover our 50+ year legacy <span>→</span>",
    journeyLabel: "OUR CRAFT & JOURNEY",
    card1Year: "EST. 1969",
    card1Title: "AGRARIAN<br>HERITAGE",
    card1Desc: "Direct partnerships with generational farming communities across the fertile Nizamabad delta.",
    card2Year: "PRECISION",
    card2Title: "SWISS BÜHLER<br>PROCESSING",
    card2Desc: "Multi-stage SCADA automation and optical sorting protecting grain integrity, aroma, and texture.",
    card3Year: "ASSURANCE",
    card3Title: "GLOBAL FOOD<br>STANDARDS",
    card3Desc: "Certified across ISO 22000, FSSC 22000, USFDA, SEDEX SMETA & Organic systems.",
    card4Year: "WORLDWIDE",
    card4Title: "TRUST ACROSS<br>40+ NATIONS",
    card4Desc: "Consistent, unadulterated staple grains trusted by retail kitchens and culinary chefs worldwide.",
    valuesMark: "02 / WHAT WE BELIEVE",
    valuesTitle: "GROWN ON<br><em>VALUES.</em>",
    v1Title: "Vision",
    v1Desc: "To bring the best products to you through dedication and innovation.",
    v2Title: "Mission",
    v2Desc: "To innovate in the non-Basmati segment with complete commitment to quality and customer satisfaction.",
    v3Title: "Promise",
    v3Desc: "“Right is right even if no one is doing it. Wrong is wrong even if everyone is doing it.”",
    rangeMark: "03 / OUR RICE",
    rangeTitle: "MADE FOR<br><em>REAL MEALS.</em>",
    rangeSub: "Every variety has a place at the table. Discover everyday staples, heritage grains and export-ready rice made with the same care.",
    qualityMark: "04 / QUALITY FIRST",
    qualityTitle: "CARE YOU CAN<br><em>COUNT ON.</em>",
    qualityP1: "Our expert field team selects premium paddy grain by grain to ensure quality and consistency. We then clean it thoroughly and condition it uniformly in a modern electronically controlled environment.",
    qualityP2: "This process discipline, paired with continuous technology upgrades, helps make every pack reliably Gajanan.",
    qualityBadgeTitle: "QUALITY IS<br>NOT A CLAIM.",
    qualityBadgeSub: "IT IS OUR PROCESS.",
    certsMark: "05 / STANDARDS",
    certsTitle: "QUALITY WITH<br><em>PROOF.</em>",
    certsDesc: "Gajanan has earned customer trust through recognised food-safety and responsible-business systems.",
    historyMark: "06 / MILESTONES",
    historyTitle: "STILL<br><em>GROWING.</em>",
    closingTitle: "QUALITY<br>THAT <em>LASTS.</em>",
    closingDesc: "Bring dependable rice to your shelf, your menu or your market.",
    closingCta: "Start a trade inquiry <span>→</span>"
  },
  hi: {
    navStory: "हमारी कहानी",
    navRange: "चावल किस्में",
    navQuality: "गुणवत्ता",
    tradeInquiry: "व्यापार पूछताछ <span>↗</span>",
    heroEst: "निज़ामाबाद, भारत <i></i> स्थापना 1969",
    heroTitle: "चावल,<br>उत्कृष्ट <em>गुणवत्ता।</em>",
    heroDesc: "गजानन धान के बेहतरीन चयन, दशकों के मिलिंग अनुभव और हर थाली के लिए भरोसेमंद गुणवत्ता को एक साथ लाता है।",
    heroCta: "चावल संग्रह देखें <span>↓</span>",
    scrollExplore: "स्क्रॉल करके देखें",
    whoWeAreMark: "01 / हम कौन हैं",
    whoWeAreTitle: "हर दाने में<br>शुद्धता का<br><em>निर्माण।</em>",
    whoWeAreDesc: "1969 में निज़ामाबाद में एक राइस मिल के रूप में शुरू होकर, श्री गजानन इंडस्ट्रीज आज भारत के प्रमुख गैर-बासमती चावल उत्पादकों में से एक बन चुकी है। प्रामाणिकता, स्विस तकनीक और 50 से अधिक वर्षों के अनुभव के साथ हम दुनिया भर में शुद्धता पहुंचाते हैं।",
    journeyLink: "हमारी 50+ वर्षों की यात्रा जानें <span>→</span>",
    journeyLabel: "हमारी शिल्प और यात्रा",
    card1Year: "स्थापना 1969",
    card1Title: "कृषि<br>विरासत",
    card1Desc: "निज़ामाबाद के उपजाऊ खेतों से सीधे किसान परिवारों के साथ साझेदारी।",
    card2Year: "सटीकता",
    card2Title: "स्विस बूलर<br>प्रसंस्करण",
    card2Desc: "चावल के प्राकृतिक स्वाद, सुगंध और बनावट को सुरक्षित रखने वाली उन्नत तकनीक।",
    card3Year: "प्रमाणीकरण",
    card3Title: "वैश्विक खाद्य<br>मानक",
    card3Desc: "ISO 22000, FSSC 22000, USFDA, SEDEX SMETA और ऑर्गेनिक द्वारा प्रमाणित।",
    card4Year: "विश्वसनीयता",
    card4Title: "40+ देशों का<br>विश्वास",
    card4Desc: "विश्व भर में लाखों परिवारों और रसोइयों द्वारा विश्वसनीय शुद्ध चावल।",
    valuesMark: "02 / हमारे मूल्य",
    valuesTitle: "मूल्यों पर<br><em>आधारित।</em>",
    v1Title: "दृष्टिकोण (Vision)",
    v1Desc: "समर्पण और नवाचार के माध्यम से आप तक सर्वोत्तम उत्पाद पहुंचाना।",
    v2Title: "मिशन (Mission)",
    v2Desc: "गुणवत्ता और ग्राहक संतुष्टि के प्रति पूर्ण प्रतिबद्धता के साथ गैर-बासमती क्षेत्र में नवाचार करना।",
    v3Title: "संकल्प (Promise)",
    v3Desc: "“सही हमेशा सही होता है, भले ही कोई न कर रहा हो। गलत हमेशा गलत होता है, भले ही सब कर रहे हों।”",
    rangeMark: "03 / हमारा चावल",
    rangeTitle: "सच्चे भोजन के<br><em>लिए निर्मित।</em>",
    rangeSub: "हर थाली के लिए विशेष चावल। दैनिक उपयोग, पारंपरिक किस्में और निर्यात गुणवत्ता वाला चावल।",
    qualityMark: "04 / गुणवत्ता सर्वोपरि",
    qualityTitle: "भरोसा जो<br><em>सदा रहे।</em>",
    qualityP1: "हमारी विशेषज्ञ टीम एक-एक दाना चुनकर गुणवत्ता सुनिश्चित करती है। आधुनिक इलेक्ट्रॉनिक वातावरण में धान की सफाई और कंडीशनिंग की जाती है।",
    qualityP2: "यह अनुशासन और निरंतर तकनीकी उन्नयन हर गजानन पैक को विश्वसनीय बनाता है।",
    qualityBadgeTitle: "गुणवत्ता केवल<br>दावा नहीं है।",
    qualityBadgeSub: "यह हमारी प्रक्रिया है।",
    certsMark: "05 / मानक",
    certsTitle: "प्रमाणित<br><em>गुणवत्ता।</em>",
    certsDesc: "गजानन ने अंतरराष्ट्रीय खाद्य सुरक्षा मानकों के माध्यम से ग्राहकों का विश्वास अर्जित किया है।",
    historyMark: "06 / ऐतिहासिक पड़ाव",
    historyTitle: "निरंतर<br><em>प्रगतिशील।</em>",
    closingTitle: "गुणवत्ता जो<br><em>कायम रहे।</em>",
    closingDesc: "अपनी रसोई, होटल या बाज़ार के लिए विश्वसनीय चावल प्राप्त करें।",
    closingCta: "व्यापार पूछताछ शुरू करें <span>→</span>"
  },
  te: {
    navStory: "మా ప్రస్థానం",
    navRange: "బియ్యం రకాలు",
    navQuality: "నాణ్యత",
    tradeInquiry: "వ్యాపార విచారణ <span>↗</span>",
    heroEst: "నిజామాబాద్, భారతదేశం <i></i> స్థాపన 1969",
    heroTitle: "బియ్యం,<br>అత్యున్నత <em>నాణ్యత.</em>",
    heroDesc: "గజానన్ ఉత్తమమైన ధాన్యం ఎంపిక, దశాబ్దాల మిల్లింగ్ నైపుణ్యం మరియు ప్రతి ఇంటి భోజనానికి నమ్మకమైన నాణ్యతను అందిస్తుంది.",
    heroCta: "రకాలను చూడండి <span>↓</span>",
    scrollExplore: "మరింత తెలుసుకోండి",
    whoWeAreMark: "01 / మా గురించి",
    whoWeAreTitle: "ప్రతి గింజలోనూ<br>స్వచ్ఛమైన<br><em>పరిపూర్ణత.</em>",
    whoWeAreDesc: "1969లో నిజామాబాద్‌లో సాధారణ రైస్ మిల్లుగా ప్రారంభమైన శ్రీ గజానన్ ఇండస్ట్రీస్, నేడు భారతదేశపు అగ్రగామి నాన్-బాస్మతి బియ్యం తయారీ సంస్థగా ఎదిగింది. నిజాయితీ, స్విస్ సాంకేతికత మరియు 50+ ఏళ్ళ అనుభవంతో ప్రపంచవ్యాప్తంగా శుద్ధమైన బియ్యాన్ని అందిస్తున్నాము.",
    journeyLink: "మా 50+ సంవత్సరాల చరిత్రను చూడండి <span>→</span>",
    journeyLabel: "మా ప్రయాణం & నైపుణ్యం",
    card1Year: "స్థాపన 1969",
    card1Title: "రైతులతో<br>అనుబంధం",
    card1Desc: "నిజామాబాద్ సారవంతమైన నేలల్లో పండే మేలైన ధాన్యాన్ని నేరుగా రైతుల నుంచి సేకరిస్తాము.",
    card2Year: "ఖచ్చితత్వం",
    card2Title: "స్విస్ బ్యూలర్<br>టెక్నాలజీ",
    card2Desc: "బియ్యపు సువాసన, రుచి మరియు నాణ్యతను కాపాడే ఆధునిక ఆటోమేటెడ్ మిల్లింగ్.",
    card3Year: "ధృవీకరణ",
    card3Title: "అంతర్జాతీయ<br>ప్రమాణాలు",
    card3Desc: "ISO 22000, FSSC 22000, USFDA మరియు ఆర్గానిక్ సర్టిఫికేషన్లు.",
    card4Year: "ప్రపంచవ్యాప్తంగా",
    card4Title: "40+ దేశాల<br>నమ్మకం",
    card4Desc: "ప్రపంచవ్యాప్తంగా కోట్లాది కుటుంబాల అభిమానాన్ని పొందిన విశ్వసనీయ బ్రాండ్.",
    valuesMark: "02 / మా ఆదర్శాలు",
    valuesTitle: "విలువలపై<br><em>ఆధారపడిన ప్రయాణం.</em>",
    v1Title: "లక్ష్యం (Vision)",
    v1Desc: "నిరంతర అంకితభావం మరియు ఆవిష్కరణలతో మీకు అత్యుత్తమ ఉత్పత్తులను అందించడం.",
    v2Title: "ధ్యేయం (Mission)",
    v2Desc: "నాణ్యత మరియు వినియోగదారుల సంతృప్తికి కట్టుబడి నాన్-బాస్మతి విభాగంలో కొత్త ప్రమాణాలు నెలకొల్పడం.",
    v3Title: "మా వాగ్దానం (Promise)",
    v3Desc: "“ఎవరూ చేయకపోయినా సరైనది ఎప్పటికీ సరైనదే. అందరూ చేసినా తప్పు ఎప్పటికీ తప్పే.”",
    rangeMark: "03 / మా బియ్యం",
    rangeTitle: "పరిపూర్ణ భోజనం<br><em>కోసం.</em>",
    rangeSub: "ప్రతి అవసరానికి తగిన నాణ్యమైన బియ్యం. నిత్యం వాడే రకాలు మరియు ఎగుమతి నాణ్యతా రకాలు.",
    qualityMark: "04 / నాణ్యతే ప్రథమం",
    qualityTitle: "మీరు నమ్మదగిన<br><em>బాధ్యత.</em>",
    qualityP1: "మా నిపుణులు ధాన్యాన్ని క్షుణ్ణంగా పరిశీలించి ఎంపిక చేస్తారు. ఆధునిక ఎలక్ట్రానిక్ యంత్రాలతో శుభ్రపరచి ప్రాసెస్ చేస్తారు.",
    qualityP2: "ఈ క్రమశిక్షణే గజానన్ ప్రతి ప్యాకెట్ను నమ్మకమైనదిగా మారుస్తుంది.",
    qualityBadgeTitle: "నాణ్యత అనేది కేవలం<br>మాట కాదు.",
    qualityBadgeSub: "అది మా జీవన విధానం.",
    certsMark: "05 / ప్రమాణాలు",
    certsTitle: "రుజువుతో కూడిన<br><em>నాణ్యత.</em>",
    certsDesc: "అంతర్జాతీయ ఆహార భద్రతా ప్రమాణాల ద్వారా గజానన్ వినియోగదారుల విశ్వాసాన్ని సంపాదించింది.",
    historyMark: "06 / మైలురాళ్ళు",
    historyTitle: "నిరంతరం<br><em>పురోగతిలో.</em>",
    closingTitle: "ఎప్పటికీ నిలిచే<br><em>నాణ్యత.</em>",
    closingDesc: "మీ వ్యాపారం, రెస్టారెంట్ లేదా ఇంటి కోసం నమ్మకమైన బియ్యాన్ని ఎంచుకోండి.",
    closingCta: "వ్యాపార విచారణ ప్రారంభించండి <span>→</span>"
  },
  es: {
    navStory: "Historia",
    navRange: "Variedades",
    navQuality: "Calidad",
    tradeInquiry: "Consulta comercial <span>↗</span>",
    heroEst: "NIZAMABAD, INDIA <i></i> EST. 1969",
    heroTitle: "ARROZ,<br>HECHO <em>BIEN.</em>",
    heroDesc: "Gajanan combina una cuidadosa selección de arroz, décadas de experiencia en molienda y una calidad confiable para cada mesa.",
    heroCta: "Explorar nuestro arroz <span>↓</span>",
    scrollExplore: "DESPLAZAR PARA EXPLORAR",
    whoWeAreMark: "01 / QUIÉNES SOMOS",
    whoWeAreTitle: "PUREZA EN<br>CADA <em>GRANO.</em>",
    whoWeAreDesc: "Fundada en 1969 en Nizamabad, Shree Gajanan Industries se ha convertido en uno de los principales productores de arroz no basmati de la India con precisión suiza.",
    journeyLink: "Descubra nuestros 50+ años <span>→</span>",
    journeyLabel: "NUESTRA TRAYECTORIA",
    card1Year: "EST. 1969",
    card1Title: "HERENCIA<br>AGRÍCOLA",
    card1Desc: "Alianzas directas con comunidades agrícolas en el fértil delta de Nizamabad.",
    card2Year: "PRECISIÓN",
    card2Title: "PROCESO SUIZO<br>BÜHLER",
    card2Desc: "Automatización SCADA y clasificación óptica para preservar aroma y textura.",
    card3Year: "GARANTÍA",
    card3Title: "ESTÁNDARES<br>GLOBALES",
    card3Desc: "Certificado bajo ISO 22000, FSSC, USFDA y normas orgánicas.",
    card4Year: "GLOBAL",
    card4Title: "CONFIANZA EN<br>40+ PAÍSES",
    card4Desc: "Granos puros y consistentes elegidos por hogares y chefs en todo el mundo.",
    valuesMark: "02 / LO QUE CREEMOS",
    valuesTitle: "CULTIVADO EN<br><em>VALORES.</em>",
    v1Title: "Visión",
    v1Desc: "Brindarle los mejores productos a través de la dedicación y la innovación.",
    v2Title: "Misión",
    v2Desc: "Innovar en el segmento no Basmati con total compromiso con la calidad.",
    v3Title: "Promesa",
    v3Desc: "“Lo correcto es correcto aunque nadie lo haga. Lo incorrecto es incorrecto aunque todos lo hagan.”",
    rangeMark: "03 / NUESTRO ARROZ",
    rangeTitle: "HECHO PARA<br><em>COMIDAS REALES.</em>",
    rangeSub: "Descubra alimentos básicos diarios, granos tradicionales y arroz de exportación.",
    qualityMark: "04 / CALIDAD PRIMERO",
    qualityTitle: "CUIDADO EN EL<br>QUE PUEDE <em>CONFIAR.</em>",
    qualityP1: "Nuestro equipo selecciona el arroz grano por grano para garantizar la consistencia en un entorno controlado.",
    qualityP2: "Esta disciplina hace que cada paquete sea confiablemente Gajanan.",
    qualityBadgeTitle: "LA CALIDAD NO ES<br>UN RECLAMO.",
    qualityBadgeSub: "ES NUESTRO PROCESO.",
    certsMark: "05 / ESTÁNDARES",
    certsTitle: "CALIDAD CON<br><em>PRUEBAS.</em>",
    certsDesc: "Gajanan se ha ganado la confianza con sistemas reconocidos de seguridad alimentaria.",
    historyMark: "06 / HITOS",
    historyTitle: "SIEMPRE EN<br><em>CRECIMIENTO.</em>",
    closingTitle: "CALIDAD QUE<br><em>PERDURA.</em>",
    closingDesc: "Lleve arroz confiable a su estante, su menú o su mercado.",
    closingCta: "Iniciar consulta comercial <span>→</span>"
  },
  fr: {
    navStory: "Notre histoire",
    navRange: "Variétés de riz",
    navQuality: "Qualité",
    tradeInquiry: "Demande commerciale <span>↗</span>",
    heroEst: "NIZAMABAD, INDE <i></i> DEPUIS 1969",
    heroTitle: "DU RIZ,<br>À LA <em>PERFECTION.</em>",
    heroDesc: "Gajanan réunit une sélection rigoureuse du paddy, des décennies d'expertise en meunerie et une qualité irréprochable.",
    heroCta: "Découvrir notre riz <span>↓</span>",
    scrollExplore: "DÉFILER POUR EXPLORER",
    whoWeAreMark: "01 / QUI SOMMES-NOUS",
    whoWeAreTitle: "LA PURETÉ DANS<br>CHAQUE <em>GRAIN.</em>",
    whoWeAreDesc: "Fondée en 1969 à Nizamabad, Shree Gajanan Industries est devenue l'un des premiers producteurs de riz non-Basmati en Inde.",
    journeyLink: "Découvrir nos 50+ ans d'histoire <span>→</span>",
    journeyLabel: "NOTRE SAVOIR-FAIRE",
    card1Year: "EST. 1969",
    card1Title: "HÉRITAGE<br>AGRICOLE",
    card1Desc: "Partenariats directs avec les agriculteurs du delta fertile de Nizamabad.",
    card2Year: "PRÉCISION",
    card2Title: "TECHNOLOGIE<br>SUISSE BÜHLER",
    card2Desc: "Automatisation SCADA et tri optique préservant l'arôme naturel et la texture.",
    card3Year: "ASSURANCE",
    card3Title: "NORMES<br>MONDIALES",
    card3Desc: "Certifié ISO 22000, FSSC, USFDA et systèmes biologiques.",
    card4Year: "MONDE",
    card4Title: "CONFIANCE DANS<br>40+ PAYS",
    card4Desc: "Des grains d'une pureté constante appréciés par les familles et grands chefs.",
    valuesMark: "02 / NOS VALEURS",
    valuesTitle: "CULTIVÉ SUR DES<br><em>VALEURS.</em>",
    v1Title: "Vision",
    v1Desc: "Vous apporter les meilleurs produits grâce au dévouement et à l'innovation.",
    v2Title: "Mission",
    v2Desc: "Innover dans le riz non-Basmati avec un engagement absolu envers la qualité.",
    v3Title: "Promesse",
    v3Desc: "« Ce qui est juste est juste même si personne ne le fait. Ce qui est faux est faux même si tout le monde le fait. »",
    rangeMark: "03 / NOTRE RIZ",
    rangeTitle: "FAIT POUR DE<br><em>VRAIS REPAS.</em>",
    rangeSub: "Découvrez des variétés de base quotidiennes et du riz d'exportation d'exception.",
    qualityMark: "04 / LA QUALITÉ D'ABORD",
    qualityTitle: "UNE CONFIANCE<br><em>DURABLE.</em>",
    qualityP1: "Notre équipe sélectionne le paddy grain par grain pour assurer une pureté absolue.",
    qualityP2: "Cette rigueur fait de chaque paquet une garantie Gajanan.",
    qualityBadgeTitle: "LA QUALITÉ N'EST PAS<br>UNE PRÉTENTION.",
    qualityBadgeSub: "C'EST NOTRE PROCESSUS.",
    certsMark: "05 / NORMES",
    certsTitle: "QUALITÉ<br><em>PROUVÉE.</em>",
    certsDesc: "Gajanan a gagné la confiance grâce à des systèmes certifiés de sécurité alimentaire.",
    historyMark: "06 / JALONS",
    historyTitle: "EN PERPÉTUELLE<br><em>CROISSANCE.</em>",
    closingTitle: "UNE QUALITÉ QUI<br><em>DURE.</em>",
    closingDesc: "Apportez un riz d'excellence à votre table ou à votre réseau.",
    closingCta: "Démarrer une demande <span>→</span>"
  },
  ar: {
    navStory: "قصتنا",
    navRange: "أصناف الأرز",
    navQuality: "الجودة",
    tradeInquiry: "استفسار تجاري <span>↗</span>",
    heroEst: "نظام آباد، الهند <i></i> تأسست عام 1969",
    heroTitle: "أرز بجودة<br><em>استثنائية.</em>",
    heroDesc: "تجمع جاجانان بين الاختيار الدقيق لمحصول الأرز، وخبرة عقود في الطحن، وجودة مضمونة لكل مائدة.",
    heroCta: "استكشف أصناف الأرز <span>↓</span>",
    scrollExplore: "مرر للاستكشاف",
    whoWeAreMark: "01 / من نحن",
    whoWeAreTitle: "صناعة النقاء في<br>كل <em>حبة أرز.</em>",
    whoWeAreDesc: "تأسست شركة شري جاجانان للصناعات عام 1969 في نظام آباد، وأصبحت واحدة من الشركات الرائدة في إنتاج أرز غير البسمتي في الهند مع التزام كامل بالنزاهة والجودة السويسرية.",
    journeyLink: "اكتشف مسيرتنا الممتدة لأكثر من 50 عامًا <span>→</span>",
    journeyLabel: "حرفتنا ومسيرتنا",
    card1Year: "تأسست 1969",
    card1Title: "تراث<br>زراعي",
    card1Desc: "شراكات مباشرة مع مجتمعات المزارعين في دلتا نظام آباد الخصبة.",
    card2Year: "دقة",
    card2Title: "تقنية بوهلر<br>السويسرية",
    card2Desc: "أتمتة متطورة وفرز ضوئي يحافظ على القوام والنكهة الطبيعية للأرز.",
    card3Year: "ضمان",
    card3Title: "معايير سلامة<br>عالمية",
    card3Desc: "معتمد من ISO 22000 و FSSC و USFDA والأنظمة العضوية.",
    card4Year: "عالمي",
    card4Title: "ثقة في أكثر من<br>40 دولة",
    card4Desc: "حبوب نقية وموثوقة يفضلها الطهاة والعائلات في جميع أنحاء العالم.",
    valuesMark: "02 / قيمنا",
    valuesTitle: "نمت على<br><em>القيم الأصيلة.</em>",
    v1Title: "الرؤية",
    v1Desc: "تقديم أفضل المنتجات لكم من خلال التفاني والابتكار.",
    v2Title: "الرسالة",
    v2Desc: "الابتكار في قطاع الأرز مع التزام كامل بالجودة ورضا العملاء.",
    v3Title: "عهدنا",
    v3Desc: "«الحق حق وإن لم يفعله أحد، والخطأ خطأ وإن فعله الجميع.»",
    rangeMark: "03 / أرزنا",
    rangeTitle: "مصنوع للوجبات<br><em>الحقيقية.</em>",
    rangeSub: "اكتشف الحبوب الأساسية اليومية والأصناف التراثية الجاهزة للتصدير.",
    qualityMark: "04 / الجودة أولاً",
    qualityTitle: "عناية يمكنك<br><em>الاعتماد عليها.</em>",
    qualityP1: "يقوم فريقنا الخبير باختيار حبات الأرز بعناية لضمان النقاء والاستمرارية في بيئة متطورة.",
    qualityP2: "هذا الانضباط هو ما يجعل كل كيس موثوقًا باسم جاجانان.",
    qualityBadgeTitle: "الجودة ليست مجرد<br>ادعاء.",
    qualityBadgeSub: "إنها أسلوب عملنا.",
    certsMark: "05 / المعايير",
    certsTitle: "جودة مثبتة<br><em>بالشهادات.</em>",
    certsDesc: "اكتسبت جاجانان ثقة العملاء من خلال أنظمة سلامة الأغذية المعترف بها دوليًا.",
    historyMark: "06 / المحطات",
    historyTitle: "نواصل<br><em>النمو والازدهار.</em>",
    closingTitle: "جودة تدوم<br><em>طويلاً.</em>",
    closingDesc: "احصل على أرز موثوق لمتاجرك أو مطاعمك أو أسواقك.",
    closingCta: "ابدأ استفسار تجاري <span>→</span>"
  },
  de: {
    navStory: "Notre histoire",
    navRange: "Reissorten",
    navQuality: "Qualität",
    tradeInquiry: "Handelsanfrage <span>↗</span>",
    heroEst: "NIZAMABAD, INDIEN <i></i> GEGR. 1969",
    heroTitle: "REIS,<br>PERFEKT <em>KULTIVIERT.</em>",
    heroDesc: "Gajanan vereint sorgfältige Reisauswahl, jahrzehntelange Mühlenexpertise und verlässliche Spitzenqualität für jeden Tisch.",
    heroCta: "Reissortiment entdecken <span>↓</span>",
    scrollExplore: "SCROLLEN ZUM ENTDECKEN",
    whoWeAreMark: "01 / ÜBER UNS",
    whoWeAreTitle: "REINHEIT IN<br>JEDEM EINZELNEN<br><em>KORN.</em>",
    whoWeAreDesc: "1969 in Nizamabad als Reismühle gegründet, gehört Shree Gajanan Industries heute zu Indiens führenden Nicht-Basmati-Reisproduzenten.",
    journeyLink: "Entdecken Sie unsere 50+ jährige Geschichte <span>→</span>",
    journeyLabel: "UNSER HANDWERK & WEG",
    card1Year: "GEGR. 1969",
    card1Title: "AGRARISCHES<br>ERBE",
    card1Desc: "Direkte Partnerschaften mit Bauernfamilien im fruchtbaren Nizamabad-Delta.",
    card2Year: "PRÄZISION",
    card2Title: "SCHWEIZER BÜHLER<br>VERARBEITUNG",
    card2Desc: "SCADA-Automatisierung und optische Sortierung zum Schutz von Aroma und Textur.",
    card3Year: "SICHERHEIT",
    card3Title: "GLOBALE<br>STANDARDS",
    card3Desc: "Zertifiziert nach ISO 22000, FSSC 22000, USFDA & Bio-Standards.",
    card4Year: "WELTWEIT",
    card4Title: "VERTRAUEN IN<br>40+ LÄNDERN",
    card4Desc: "Unverfälschter Spitzenreis, dem Großküchen und Spitzenköche weltweit vertrauen.",
    valuesMark: "02 / UNSERE WERTE",
    valuesTitle: "GEWACHSEN AUF<br><em>WERTEN.</em>",
    v1Title: "Vision",
    v1Desc: "Ihnen durch Hingabe und Innovation die besten Produkte zu bringen.",
    v2Title: "Mission",
    v2Desc: "Innovation im Nicht-Basmati-Segment mit höchster Verpflichtung zur Qualität.",
    v3Title: "Versprechen",
    v3Desc: "„Recht bleibt recht, auch wenn es niemand tut. Unrecht bleibt unrecht, auch wenn es jeder tut.“",
    rangeMark: "03 / UNSER REIS",
    rangeTitle: "FÜR ECHTE<br><em>MAHLZEITEN.</em>",
    rangeSub: "Jede Sorte hat ihren Platz. Entdecken Sie Alltagsklassiker und Export-Reis mit derselben Sorgfalt.",
    qualityMark: "04 / QUALITÄT ZUERST",
    qualityTitle: "SORGFALT, AUF DIE<br>SIE <em>ZÄHLEN KÖNNEN.</em>",
    qualityP1: "Unser Expertenteam wählt Rohpaddy Korn für Korn aus, um absolute Gleichmäßigkeit zu garantieren.",
    qualityP2: "Diese Prozessdisziplin macht jede Packung verlässlich zu echtem Gajanan.",
    qualityBadgeTitle: "QUALITÄT IST<br>KEINE BEHAUPTUNG.",
    qualityBadgeSub: "ES IST UNSER PROZESS.",
    certsMark: "05 / STANDARDS",
    certsTitle: "QUALITÄT MIT<br><em>BEWEIS.</em>",
    certsDesc: "Gajanan hat das Vertrauen durch anerkannte Lebensmittelsicherheitssysteme erworben.",
    historyMark: "06 / MEILENSTEINE",
    historyTitle: "KONTINUIERLICHES<br><em>WACHSTUM.</em>",
    closingTitle: "QUALITÄT, DIE<br><em>BLEIBT.</em>",
    closingDesc: "Bringen Sie verlässlichen Reis in Ihre Regale, Ihre Speisekarte oder Ihren Markt.",
    closingCta: "Handelsanfrage starten <span>→</span>"
  },
  it: {
    navStory: "Nostra storia",
    navRange: "Nostro riso",
    navQuality: "Qualità",
    tradeInquiry: "Richiesta commerciale <span>↗</span>",
    heroEst: "NIZAMABAD, INDIA <i></i> DAL 1969",
    heroTitle: "RISO, FATTO<br>A <em>REGOLA D'ARTE.</em>",
    heroDesc: "Gajanan unisce un'attenta selezione del risone, decenni di maestria nella macinazione e una qualità affidabile per ogni tavola.",
    heroCta: "Scopri il nostro riso <span>↓</span>",
    scrollExplore: "SCORRI PER ESPLORARE",
    whoWeAreMark: "01 / CHI SIAMO",
    whoWeAreTitle: "PUREZZA IN<br>OGNI SINGOLO<br><em>CHICCO.</em>",
    whoWeAreDesc: "Nata nel 1969 a Nizamabad, Shree Gajanan Industries è oggi uno dei principali produttori di riso non-Basmati in India.",
    journeyLink: "Scopri la nostra storia di 50+ anni <span>→</span>",
    journeyLabel: "IL NOSTRO SAPERE",
    card1Year: "DAL 1969",
    card1Title: "TRADIZIONE<br>AGRICOLA",
    card1Desc: "Collaborazioni dirette con comunità agricole nel delta fertile di Nizamabad.",
    card2Year: "PRECISIONE",
    card2Title: "TECNOLOGIA<br>SVIZZERA BÜHLER",
    card2Desc: "Automazione SCADA e selezione ottica per preservare consistenza e aroma.",
    card3Year: "GARANZIA",
    card3Title: "STANDARD<br>GLOBAL",
    card3Desc: "Certificato ISO 22000, FSSC 22000, USFDA e biologico.",
    card4Year: "MONDO",
    card4Title: "FIDUCIA IN<br>40+ PAESI",
    card4Desc: "Chicchi puri e autentici scelti da famiglie e chef in tutto il mondo.",
    valuesMark: "02 / I NOSTRI VALORI",
    valuesTitle: "COLTIVATO SUI<br><em>VALORI.</em>",
    v1Title: "Visione",
    v1Desc: "Offrirvi i migliori prodotti attraverso dedizione e innovazione continua.",
    v2Title: "Missione",
    v2Desc: "Innovare nel segmento non-Basmati con totale impegno per la qualità.",
    v3Title: "Promessa",
    v3Desc: "“Il giusto è giusto anche se nessuno lo fa. Lo sbagliato è sbagliato anche se tutti lo fanno.”",
    rangeMark: "03 / IL NOSTRO RISO",
    rangeTitle: "FATTO PER<br><em>VERI PASTI.</em>",
    rangeSub: "Ogni varietà ha il suo posto. Scopri i risi quotidiani e le selezioni per l'export.",
    qualityMark: "04 / PRIMA LA QUALITÀ",
    qualityTitle: "CURA SU CUI PUOI<br><em>CONTARE.</em>",
    qualityP1: "Il nostro team seleziona il risone chicco per chicco per garantire purezza e resa ottimali.",
    qualityP2: "Questo rigore costante rende ogni confezione affidabilmente Gajanan.",
    qualityBadgeTitle: "LA QUALITÀ NON È<br>UNA PRETESA.",
    qualityBadgeSub: "È IL NOSTRO PROCESSO.",
    certsMark: "05 / STANDARD",
    certsTitle: "QUALITÀ CON<br><em>PROVE.</em>",
    certsDesc: "Gajanan ha guadagnato la fiducia globale con rigorosi sistemi di sicurezza alimentare.",
    historyMark: "06 / TAPPE",
    historyTitle: "SEMPRE IN<br><em>CRESCITA.</em>",
    closingTitle: "QUALITÀ CHE<br><em>DURA.</em>",
    closingDesc: "Porta un riso d'eccellenza nei tuoi negozi o nei tuoi ristoranti.",
    closingCta: "Inizia richiesta commerciale <span>→</span>"
  },
  pt: {
    navStory: "Nossa história",
    navRange: "Nossos arrozes",
    navQuality: "Qualidade",
    tradeInquiry: "Consulta comercial <span>↗</span>",
    heroEst: "NIZAMABAD, ÍNDIA <i></i> DESDE 1969",
    heroTitle: "ARROZ, FEITO<br>COM <em>PERFEIÇÃO.</em>",
    heroDesc: "A Gajanan une criteriosa seleção de grãos, décadas de experiência em moagem e qualidade confiável para todas as mesas.",
    heroCta: "Explorar variedades <span>↓</span>",
    scrollExplore: "ROLE PARA EXPLORAR",
    whoWeAreMark: "01 / QUEM SOMOS",
    whoWeAreTitle: "PUREZA EM<br>CADA <em>GRÃO.</em>",
    whoWeAreDesc: "Fundada em 1969 em Nizamabad, a Shree Gajanan Industries tornou-se uma das líderes em arroz não-Basmati da Índia.",
    journeyLink: "Conheça nossos 50+ anos <span>→</span>",
    journeyLabel: "NOSSO OFÍCIO",
    card1Year: "DESDE 1969",
    card1Title: "HERANÇA<br>AGRÍCOLA",
    card1Desc: "Parcerias diretas com famílias agricultoras no delta fértil de Nizamabad.",
    card2Year: "PRECISÃO",
    card2Title: "TECNOLOGIA SUÍÇA<br>BÜHLER",
    card2Desc: "Automação SCADA e seleção óptica protegendo aroma, sabor e textura.",
    card3Year: "GARANTIA",
    card3Title: "PADRÕES<br>GLOBAIS",
    card3Desc: "Certificado ISO 22000, FSSC, USFDA e conformidade orgânica.",
    card4Year: "MUNDO",
    card4Title: "CONFIANÇA EM<br>40+ PAÍSES",
    card4Desc: "Grãos nobres apreciados por lares e mestres culinários em todo o mundo.",
    valuesMark: "02 / NOSSOS VALORES",
    valuesTitle: "CULTIVADO EM<br><em>VALORES.</em>",
    v1Title: "Visão",
    v1Desc: "Trazer os melhores produtos por meio de dedicação e inovação contínua.",
    v2Title: "Missão",
    v2Desc: "Inovar no arroz não-Basmati com total compromisso com a qualidade.",
    v3Title: "Promessa",
    v3Desc: "“O certo é certo mesmo que ninguém faça. O errado é errado mesmo que todos façam.”",
    rangeMark: "03 / NOSSO ARROZ",
    rangeTitle: "FEITO PARA<br><em>REFEIÇÕES REAIS.</em>",
    rangeSub: "Descubra grãos para o dia a dia e seleções para exportação.",
    qualityMark: "04 / QUALIDADE EM PRIMEIRO",
    qualityTitle: "CUIDADO EM QUE VOCÊ<br>PODE <em>CONFIAR.</em>",
    qualityP1: "Nossa equipe seleciona os grãos um a um para assegurar uniformidade absoluta.",
    qualityP2: "Essa disciplina faz de cada pacote uma garantia Gajanan.",
    qualityBadgeTitle: "QUALIDADE NÃO É<br>APENAS PROMESSA.",
    qualityBadgeSub: "É O NOSSO PROCESSO.",
    certsMark: "05 / NORMAS",
    certsTitle: "QUALIDADE COM<br><em>COMPROVAÇÃO.</em>",
    certsDesc: "A Gajanan conquistou a confiança mundial com rigorosos sistemas alimentares.",
    historyMark: "06 / MARCOS",
    historyTitle: "SEMPRE EM<br><em>EXPANSÃO.</em>",
    closingTitle: "QUALIDADE QUE<br><em>PERDURA.</em>",
    closingDesc: "Leve arroz de padrão superior para seu comércio ou restaurante.",
    closingCta: "Iniciar consulta comercial <span>→</span>"
  },
  ru: {
    navStory: "Наша история",
    navRange: "Сорта риса",
    navQuality: "Качество",
    tradeInquiry: "Торговый запрос <span>↗</span>",
    heroEst: "НИЗАМАБАД, ИНДИЯ <i></i> С 1969",
    heroTitle: "РИС ВЫСШЕГО<br><em>КАЧЕСТВА.</em>",
    heroDesc: "Gajanan объединяет тщательный отбор сырья, полувековой опыт переработки и надежное качество для каждого стола.",
    heroCta: "Посмотреть сорта <span>↓</span>",
    scrollExplore: "ПРОКРУТИТЕ ДЛЯ ПРОСМОТРА",
    whoWeAreMark: "01 / О НАС",
    whoWeAreTitle: "ЧИСТОТА В<br>КАЖДОМ <em>ЗЕРНЕ.</em>",
    whoWeAreDesc: "Основанная в 1969 году в Низамабаде, Shree Gajanan Industries стала одним из ведущих производителей риса non-Basmati в Индии.",
    journeyLink: "Узнать о нашей 50-летней истории <span>→</span>",
    journeyLabel: "НАШ ПУТЬ И МАСТЕРСТВО",
    card1Year: "С 1969 ГОДА",
    card1Title: "АГРАРНОЕ<br>НАСЛЕДИЕ",
    card1Desc: "Прямое сотрудничество с фермерскими династиями дельты Низамабада.",
    card2Year: "ТОЧНОСТЬ",
    card2Title: "ШВЕЙЦАРСКИЕ ЛИНИИ<br>BÜHLER",
    card2Desc: "SCADA-автоматизация и оптическая сортировка для сохранения аромата и структуры.",
    card3Year: "ГАРАНТИЯ",
    card3Title: "МИРОВЫЕ<br>СТАНДАРТЫ",
    card3Desc: "Сертифицировано по ISO 22000, FSSC, USFDA и Organic.",
    card4Year: "В МИРЕ",
    card4Title: "ДОВЕРИЕ В<br>40+ СТРАНАХ",
    card4Desc: "Чистый отборный рис, которому доверяют шеф-повара и семьи по всему миру.",
    valuesMark: "02 / НАШИ ЦЕННОСТИ",
    valuesTitle: "ВЫРАЩЕНО НА<br><em>ЦЕННОСТЯХ.</em>",
    v1Title: "Видение",
    v1Desc: "Предоставлять вам лучшие продукты благодаря преданности делу и инновациям.",
    v2Title: "Миссия",
    v2Desc: "Инновации в сегменте non-Basmati с бескомпромиссной заботой о качестве.",
    v3Title: "Принцип",
    v3Desc: "«Правильное остается правильным, даже если никто так не делает. Неправильное остается неправильным, даже если так делают все.»",
    rangeMark: "03 / НАШ РИС",
    rangeTitle: "ДЛЯ НАСТОЯЩИХ<br><em>БЛЮД.</em>",
    rangeSub: "Откройте для себя повседневные и экспортные премиальные сорта риса.",
    qualityMark: "04 / КАЧЕСТВО ПРЕЖДЕ ВСЕГО",
    qualityTitle: "ЗАБОТА, НА КОТОРУЮ<br>ВЫ МОЖЕТЕ <em>ПОЛОЖИТЬСЯ.</em>",
    qualityP1: "Наша команда экспертов отбирает зерно к зерну для безупречной чистоты.",
    qualityP2: "Строгий контроль превращает каждую пачку в настоящий эталон Gajanan.",
    qualityBadgeTitle: "КАЧЕСТВО — ЭТО НЕ<br>ПРОСТО СЛОВА.",
    qualityBadgeSub: "ЭТО НАШ ПРОЦЕСС.",
    certsMark: "05 / СТАНДАРТЫ",
    certsTitle: "ДОКАЗАННОЕ<br><em>КАЧЕСТВО.</em>",
    certsDesc: "Gajanan заслужил признание благодаря международным сертификатам безопасности.",
    historyMark: "06 / ЭТАПЫ",
    historyTitle: "НЕПРЕРЫВНЫЙ<br><em>РОСТ.</em>",
    closingTitle: "КАЧЕСТВО НА<br><em>ДОЛГИЕ ГОДЫ.</em>",
    closingDesc: "Поставляйте надежный рис в свои магазины, рестораны или торговые сети.",
    closingCta: "Отправить коммерческий запрос <span>→</span>"
  },
  ja: {
    navStory: "私たちの歩み",
    navRange: "お米の品種",
    navQuality: "品質へのこだわり",
    tradeInquiry: "お取引のお問い合わせ <span>↗</span>",
    heroEst: "インド・ニザマバード <i></i> 1969年創業",
    heroTitle: "本物の米を、<br><em>極めた技で。</em>",
    heroDesc: "ガジャナンは厳選された籾米、半世紀にわたる精米技術、そして食卓に届く確かな品質をお届けします。",
    heroCta: "お米の品種を見る <span>↓</span>",
    scrollExplore: "スクロールして詳細を見る",
    whoWeAreMark: "01 / 会社概要",
    whoWeAreTitle: "一粒一粒に宿る<br><em>純粋な品質。</em>",
    whoWeAreDesc: "1969年に創業したShree Gajanan Industriesは、スイスの最新精米技術と半世紀の経験を活かし、インド屈指の米生産企業へと成長しました。",
    journeyLink: "50年の伝統を見る <span>→</span>",
    journeyLabel: "私たちの技術と歴史",
    card1Year: "1969年創業",
    card1Title: "農業の<br>伝統",
    card1Desc: "ニザマバード肥沃地帯の農家と直接連携した高品質な籾米調達。",
    card2Year: "精密技術",
    card2Title: "スイス・ビューラー社<br>自動精米プラント",
    card2Desc: "SCADA自動制御と光学選別により、風味と粒の美しさを保持。",
    card3Year: "信頼の証",
    card3Title: "国際食品安全<br>基準クリア",
    card3Desc: "ISO 22000、FSSC、USFDA、有機認証を取得。",
    card4Year: "世界へ",
    card4Title: "世界40カ国以上での<br>高い信頼",
    card4Desc: "世界の有名シェフやご家庭に選ばれ続ける安心のお米。",
    valuesMark: "02 / 私たちの理念",
    valuesTitle: "確固たる理念に<br><em>基づくものづくり。</em>",
    v1Title: "ビジョン (Vision)",
    v1Desc: "誠実さと技術革新を通じて、最高品質の製品をお届けすること。",
    v2Title: "ミッション (Mission)",
    v2Desc: "品質と顧客満足度を第一に、ノンバスマティ米市場で革新を続けること。",
    v3Title: "約束 (Promise)",
    v3Desc: "「誰も行わなくても正しいことは正しく、全員が行っても間違いは間違いである。」",
    rangeMark: "03 / 製品案内",
    rangeTitle: "毎日の食卓を<br><em>豊かに彩るお米。</em>",
    rangeSub: "日常使いから輸出用プレミアム米まで、厳選された品種を取り揃えております。",
    qualityMark: "04 / 品質第一",
    qualityTitle: "安心をお約束する<br><em>徹底した管理。</em>",
    qualityP1: "専門チームが一粒一粒を吟味し、最新設備で精米・品質調整を行っています。",
    qualityP2: "この厳格な管理こそが、ガジャナンブランドの信頼の証です。",
    qualityBadgeTitle: "品質は言葉ではなく、",
    qualityBadgeSub: "私たちの工程そのものです。",
    certsMark: "05 / 認証基準",
    certsTitle: "確かな<br><em>国際認証。</em>",
    certsDesc: "世界基準の食品安全管理体制により、国際的な信頼を獲得しています。",
    historyMark: "06 / 沿革",
    historyTitle: "進化し続ける<br><em>ガジャナン。</em>",
    closingTitle: "長く愛される<br><em>本物の美味しさ。</em>",
    closingDesc: "貴社の店舗、レストラン、市場へ最高品質のお米をお届けします。",
    closingCta: "お問い合わせはこちら <span>→</span>"
  },
  zh: {
    navStory: "品牌故事",
    navRange: "大米品种",
    navQuality: "卓越品质",
    tradeInquiry: "商业咨询 <span>↗</span>",
    heroEst: "印度·尼扎马巴德 <i></i> 始于 1969",
    heroTitle: "好米，源于<br><em>精湛工艺。</em>",
    heroDesc: "Gajanan 融合严选原粮、数十年精米工艺与稳定品质，为每一个餐桌带来纯正滋味。",
    heroCta: "探索大米系列 <span>↓</span>",
    scrollExplore: "向下滚动探索",
    whoWeAreMark: "01 / 关于我们",
    whoWeAreTitle: "每一粒米，皆为<br><em>纯净典范。</em>",
    whoWeAreDesc: "Shree Gajanan Industries 始建于 1969 年，现已发展为印度领先的非巴斯马蒂大米加工企业，以瑞士尖端工艺和超过半个世纪的经验享誉全球。",
    journeyLink: "探索我们 50 多年的辉煌历程 <span>→</span>",
    journeyLabel: "匠心工艺与发展历程",
    card1Year: "始于 1969",
    card1Title: "优质农业<br>传承",
    card1Desc: "与尼扎马巴德肥沃三角洲世代农户紧密合作，直采优质稻谷。",
    card2Year: "精准科技",
    card2Title: "瑞士布勒<br>精米生产线",
    card2Desc: "多阶段 SCADA 自动化与光学分选，完整锁住大米原香与口感。",
    card3Year: "国际认证",
    card3Title: "全球食品<br>安全标准",
    card3Desc: "通过 ISO 22000、FSSC 22000、USFDA 及有机认证。",
    card4Year: "全球信赖",
    card4Title: "畅销全球<br>40+ 国家",
    card4Desc: "深得全球家庭厨房与知名主厨信赖的纯正高品质大米。",
    valuesMark: "02 / 核心价值观",
    valuesTitle: "恪守初心，<br><em>坚守品质。</em>",
    v1Title: "愿景 (Vision)",
    v1Desc: "以专注与创新为您提供最优质的产品。",
    v2Title: "使命 (Mission)",
    v2Desc: "全心致力于品质与客户满意度，引领非巴斯马蒂米品类创新。",
    v3Title: "承诺 (Promise)",
    v3Desc: "“对的事即使无人做也是对的，错的事即使人人做依然是错的。”",
    rangeMark: "03 / 大米系列",
    rangeTitle: "为真正的<br><em>美味而生。</em>",
    rangeSub: "从日常主食到高端出口大米，每一款都凝聚严谨工艺。",
    qualityMark: "04 / 质量第一",
    qualityTitle: "值得您信赖的<br><em>严谨品质。</em>",
    qualityP1: "专业品控团队粒粒甄选，在先进的电子控制环境下进行清洁与调质。",
    qualityP2: "正是这种流程纪律，确保每一包 Gajanan 大米都值得托付。",
    qualityBadgeTitle: "品质不仅是一句口号，",
    qualityBadgeSub: "更是我们的生产准则。",
    certsMark: "05 / 权威认证",
    certsTitle: "实力见证<br><em>卓越品质。</em>",
    certsDesc: "Gajanan 凭借严格的国际食品安全体系赢得全球客户信赖。",
    historyMark: "06 / 发展里程碑",
    historyTitle: "稳步发展，<br><em>追求卓越。</em>",
    closingTitle: "历久弥坚的<br><em>卓越品质。</em>",
    closingDesc: "为您的货架、餐厅或市场引入值得信赖的大米之选。",
    closingCta: "开启商业咨询 <span>→</span>"
  },
  ta: {
    navStory: "எங்கள் வரலாறு",
    navRange: "அரிசி வகைகள்",
    navQuality: "தரம்",
    tradeInquiry: "வணிக விசாரணை <span>↗</span>",
    heroEst: "நிசாமாபாத், இந்தியா <i></i> தொடக்கம் 1969",
    heroTitle: "அரிசி,<br>அளவில்லா <em>தரம்.</em>",
    heroDesc: "கஜானன் சிறந்த நெல் தேர்வு, பல தசாப்த கால ஆலை அனுபவம் மற்றும் ஒவ்வொரு வீட்டிற்கும் நம்பகமான தரத்தை வழங்குகிறது.",
    heroCta: "அரிசி வகைகளை காண்க <span>↓</span>",
    scrollExplore: "மேலும் அறிய உருட்டவும்",
    whoWeAreMark: "01 / நாங்கள் யார்",
    whoWeAreTitle: "ஒவ்வொரு தானியத்திலும்<br>தூய <em>நேர்த்தி.</em>",
    whoWeAreDesc: "1969 இல் தொடங்கப்பட்ட ஸ்ரீ கஜானன் இண்டஸ்ட்ரீஸ், இன்று இந்தியாவின் முன்னணி பாஸ்மதி அல்லாத அரிசி உற்பத்தியாளர்களில் ஒன்றாக திகழ்கிறது.",
    journeyLink: "எங்கள் 50+ வருட வரலாற்றை அறிக <span>→</span>",
    journeyLabel: "எங்கள் பயணம்",
    card1Year: "தொடக்கம் 1969",
    card1Title: "விவசாய<br>பாரம்பரியம்",
    card1Desc: "நிசாமாபாத் வளமான விளைநிலங்களிலிருந்து விவசாயிகளிடமிருந்து நேரடியாக நெல் கொள்முதல்.",
    card2Year: "துல்லியம்",
    card2Title: "சுவிஸ் பூலர்<br>தொழில்நுட்பம்",
    card2Desc: "அரிசியின் இயற்கை நறுமணம் மற்றும் சுவையை பாதுகாக்கும் நவீன உற்பத்தி.",
    card3Year: "உத்தரவாதம்",
    card3Title: "உலகளாவிய உணவு<br>தரநிலைகள்",
    card3Desc: "ISO 22000, FSSC, USFDA மற்றும் ஆர்கானிக் சான்றிதழ்கள் பெற்றது.",
    card4Year: "உலகளவில்",
    card4Title: "40+ நாடுகள்<br>நம்பும் பிராண்ட்",
    card4Desc: "உலகளவில் குடும்பங்களும் தலைசிறந்த சமையல் கலைஞர்களும் நம்பும் தூய அரிசி.",
    valuesMark: "02 / எங்கள் கொள்கைகள்",
    valuesTitle: "மதிப்புகளில்<br><em>வளர்ந்தது.</em>",
    v1Title: "தொலைநோக்கு (Vision)",
    v1Desc: "அர்ப்பணிப்பு மற்றும் புதுமை மூலம் சிறந்த தயாரிப்புகளை உங்களுக்கு வழங்குவது.",
    v2Title: "நோக்கம் (Mission)",
    v2Desc: "வாடிக்கையாளர் திருப்தியுடன் பாஸ்மதி அல்லாத அரிசி துறையில் சிறந்து விளங்குவது.",
    v3Title: "வாக்குறுதி (Promise)",
    v3Desc: "“யாரும் செய்யாவிட்டாலும் சரியானது எப்போதும் சரியே. அனைவரும் செய்தாலும் தவறு எப்போதும் தவறே.”",
    rangeMark: "03 / எங்கள் அரிசி",
    rangeTitle: "உண்மையான விருந்துக்கு<br><em>ஏற்றது.</em>",
    rangeSub: "தினசரி சமையல் முதல் ஏற்றுமதி தரம் வரை அனைத்து வகையான அரிசி ரகங்கள்.",
    qualityMark: "04 / தரம் முதன்மை",
    qualityTitle: "நீங்கள் நம்பக்கூடிய<br><em>பொறுப்பு.</em>",
    qualityP1: "எங்கள் நிபுணர் குழு ஒவ்வொரு தானியத்தையும் ஆராய்ந்து தரத்தை உறுதி செய்கிறது.",
    qualityP2: "இந்த கட்டுப்பாடு ஒவ்வொரு கஜானன் பேக்கையும் நம்பகமானதாக மாற்றுகிறது.",
    qualityBadgeTitle: "தரம் என்பது வெறும்<br>வார்த்தையல்ல.",
    qualityBadgeSub: "அது எங்கள் வாழ்வியல் முறை.",
    certsMark: "05 / தரநிலைகள்",
    certsTitle: "சான்றளிக்கப்பட்ட<br><em>உயர் தரம்.</em>",
    certsDesc: "சர்வதேச உணவு பாதுகாப்பு நெறிமுறைகள் மூலம் வாடிக்கையாளர் நம்பிக்கையை வென்றது.",
    historyMark: "06 / மைல்கற்கள்",
    historyTitle: "தொடர்ந்து<br><em>வளர்கிறோம்.</em>",
    closingTitle: "என்றும் நிலைக்கும்<br><em>உயர் தரம்.</em>",
    closingDesc: "உங்கள் வணிகம் அல்லது இல்லத்திற்கு நம்பகமான அரிசியை தேர்வு செய்யுங்கள்.",
    closingCta: "வணிக விசாரணையை தொடங்குங்கள் <span>→</span>"
  },
  kn: {
    navStory: "ನಮ್ಮ ಕಥೆ",
    navRange: "ಅಕ್ಕಿ ಪ್ರಭೇದಗಳು",
    navQuality: "ಗುಣಮಟ್ಟ",
    tradeInquiry: "ವ್ಯಾಪಾರ ವಿಚಾರಣೆ <span>↗</span>",
    heroEst: "ನಿಜಾಮಾಬಾದ್, ಭಾರತ <i></i> ಸ್ಥಾಪನೆ 1969",
    heroTitle: "ಅಕ್ಕಿ,<br>ಉತ್ತಮ <em>ಗುಣಮಟ್ಟ.</em>",
    heroDesc: "ಗಜಾನನ್ ಉತ್ತಮ ಭತ್ತದ ಆಯ್ಕೆ, ದಶಕಗಳ ಮಿಲ್ಲಿಂಗ್ ಪರಿಣತಿ ಮತ್ತು ಪ್ರತಿಯೊಂದು ಊಟಕ್ಕೂ ವಿಶ್ವಾಸಾರ್ಹ ಗುಣಮಟ್ಟವನ್ನು ತರುತ್ತದೆ.",
    heroCta: "ಅಕ್ಕಿ ಶ್ರೇಣಿಯನ್ನು ಅನ್ವೇಷಿಸಿ <span>↓</span>",
    scrollExplore: "ಅನ್ವೇಷಿಸಲು ಸ್ಕ್ರಾಲ್ ಮಾಡಿ",
    whoWeAreMark: "01 / ನಮ್ಮ ಬಗ್ಗೆ",
    whoWeAreTitle: "ಪ್ರತಿ ಕಾಳಿನಲ್ಲೂ<br>ಶುದ್ಧತೆಯ<br><em>ಪರಿಪೂರ್ಣತೆ.</em>",
    whoWeAreDesc: "1969 ರಲ್ಲಿ ನಿಜಾಮಾಬಾದ್‌ನಲ್ಲಿ ಪ್ರಾರಂಭವಾದ ಶ್ರೀ ಗಜಾನನ್ ಇಂಡಸ್ಟ್ರೀಸ್, ಇಂದು ಭಾರತದ ಪ್ರಮುಖ ನಾನ್-ಬಾಸ್ಮತಿ ಅಕ್ಕಿ ಉತ್ಪಾದಕರಲ್ಲಿ ಒಂದಾಗಿದೆ.",
    journeyLink: "ನಮ್ಮ 50+ ವರ್ಷಗಳ ಇತಿಹಾಸ ತಿಳಿಯಿರಿ <span>→</span>",
    journeyLabel: "ನಮ್ಮ ಪಯಣ",
    card1Year: "ಸ್ಥಾಪನೆ 1969",
    card1Title: "ಕೃಷಿ<br>ಪರಂಪರೆ",
    card1Desc: "ನಿಜಾಮಾಬಾದ್ ಫಲವತ್ತಾದ ಕೃಷಿ ಪ್ರದೇಶಗಳಿಂದ ನೇರವಾಗಿ ರೈತರಿಂದ ಭತ್ತ ಸಂಗ್ರಹ.",
    card2Year: "ನಿಖರತೆ",
    card2Title: "ಸ್ವಿಸ್ ಬ್ಯೂಲರ್<br>ತಂತ್ರಜ್ಞಾನ",
    card2Desc: "ಅಕ್ಕಿಯ ನೈಸರ್ಗಿಕ ಸುವಾಸನೆ ಮತ್ತು ಪೋಷಕಾಂಶ ರಕ್ಷಿಸುವ ಆಧುನಿಕ ಸಂಸ್ಕರಣೆ.",
    card3Year: "ಭರವಸೆ",
    card3Title: "ಜಾಗತಿಕ ಆಹಾರ<br>ಮಾನದಂಡಗಳು",
    card3Desc: "ISO 22000, FSSC, USFDA ಮತ್ತು ಸಾವಯವ ಪ್ರಮಾಣೀಕೃತ.",
    card4Year: "ಜಾಗತಿಕ",
    card4Title: "40+ ದೇಶಗಳ<br>ವಿಶ್ವಾಸ",
    card4Desc: "ವಿಶ್ವಾದ್ಯಂತ ಲಕ್ಷಾಂತರ ಕುಟುಂಬಗಳು ನಂಬಿರುವ ಪರಿಶುದ್ಧ ಅಕ್ಕಿ.",
    valuesMark: "02 / ನಮ್ಮ ಮೌಲ್ಯಗಳು",
    valuesTitle: "ಮೌಲ್ಯಗಳ ಮೇಲೆ<br><em>ಬೆಳೆದ ಸಂಸ್ಥೆ.</em>",
    v1Title: "ದೃಷ್ಟಿಕೋನ (Vision)",
    v1Desc: "ನಿರಂತರ ಪರಿಶ್ರಮ ಮತ್ತು ನಾವೀನ್ಯತೆಯ ಮೂಲಕ ನಿಮಗೆ ಅತ್ಯುತ್ತಮ ಉತ್ಪನ್ನಗಳನ್ನು ತಲುಪಿಸುವುದು.",
    v2Title: "ಧ್ಯೇಯ (Mission)",
    v2Desc: "ಗುಣಮಟ್ಟ ಮತ್ತು ಗ್ರಾಹಕರ ತೃಪ್ತಿಗೆ ಬದ್ಧರಾಗಿ ನಾನ್-ಬಾಸ್ಮತಿ ವಿಭಾಗದಲ್ಲಿ ಹೊಸ ಮಾನದಂಡ ಸ್ಥಾಪಿಸುವುದು.",
    v3Title: "ಭರವಸೆ (Promise)",
    v3Desc: "“ಯಾರೂ ಮಾಡದಿದ್ದರೂ ಸರಿಯಾದದ್ದು ಯಾವಾಗಲೂ ಸರಿಯೇ. ಎಲ್ಲರೂ ಮಾಡಿದರೂ ತಪ್ಪು ಯಾವಾಗಲೂ ತಪ್ಪೇ.”",
    rangeMark: "03 / ನಮ್ಮ ಅಕ್ಕಿ",
    rangeTitle: "ಪರಿಪೂರ್ಣ ಊಟಕ್ಕಾಗಿ<br><em>ರೂಪಿಸಲಾಗಿದೆ.</em>",
    rangeSub: "ಪ್ರತಿದಿನದ ಅಡುಗೆಯಿಂದ ಹಿಡಿದು ರಫ್ತು ಗುಣಮಟ್ಟದ ಅಕ್ಕಿಯವರೆಗಿನ ವೈವಿಧ್ಯತೆ.",
    qualityMark: "04 / ಗುಣಮಟ್ಟವೇ ಮೊದಲು",
    qualityTitle: "ನೀವು ನಂಬಬಹುದಾದ<br><em>ಕಾಳಜಿ.</em>",
    qualityP1: "ನಮ್ಮ ತಜ್ಞರ ತಂಡವು ಭತ್ತವನ್ನು ಕಾಳು-ಕಾಳಾಗಿ ಪರಿಶೀಲಿಸಿ ಶ್ರೇಷ್ಠತೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.",
    qualityP2: "ಈ ಕಟ್ಟುನಿಟ್ಟಿನ ನಿಯಮವೇ ಗಜಾನನ್ ಪ್ರತಿ ಪ್ಯಾಕ್ ಅನ್ನು ವಿಶ್ವಾಸಾರ್ಹವಾಗಿಸುತ್ತದೆ.",
    qualityBadgeTitle: "ಗುಣಮಟ್ಟ ಎಂಬುದು ಕೇವಲ<br>ಹೇಳಿಕೆಯಲ್ಲ.",
    qualityBadgeSub: "ಅದು ನಮ್ಮ ಕಾರ್ಯವಿಧಾನ.",
    certsMark: "05 / ಮಾನದಂಡಗಳು",
    certsTitle: "ಸಾಬೀತಾದ<br><em>ಗುಣಮಟ್ಟ.</em>",
    certsDesc: "ಅಂತರರಾಷ್ಟ್ರೀಯ ಆಹಾರ ಸುರಕ್ಷತಾ ಮಾನದಂಡಗಳ ಮೂಲಕ ಗಜಾನನ್ ಗ್ರಾಹಕರ ನಂಬಿಕೆಯನ್ನು ಗಳಿಸಿದೆ.",
    historyMark: "06 / ಮೈಲಿಗಲ್ಲುಗಳು",
    historyTitle: "ನಿರಂತರ<br><em>ಪ್ರಗತಿಯಲ್ಲಿ.</em>",
    closingTitle: "ಸದಾ ಉಳಿಯುವ<br><em>ಶ್ರೇಷ್ಠ ಗುಣಮಟ್ಟ.</em>",
    closingDesc: "ನಿಮ್ಮ ವ್ಯಾಪಾರ, ರೆಸ್ಟೋರೆಂಟ್ ಅಥವಾ ಮನೆಗಾಗಿ ವಿಶ್ವಾಸಾರ್ಹ ಅಕ್ಕಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    closingCta: "ವ್ಯಾಪಾರ ವಿಚಾರಣೆ ಪ್ರಾರಂಭಿಸಿ <span>→</span>"
  }
};

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.en;
  
  // Header Nav
  const navLinks = document.querySelectorAll('.site-header nav a');
  if (navLinks.length >= 3) {
    navLinks[0].textContent = dict.navStory || I18N.en.navStory;
    navLinks[1].textContent = dict.navRange || I18N.en.navRange;
    navLinks[2].textContent = dict.navQuality || I18N.en.navQuality;
  }
  const headerCta = document.querySelector('.site-header .header-cta');
  if (headerCta) headerCta.innerHTML = dict.tradeInquiry || I18N.en.tradeInquiry;

  // Hero
  const heroEst = document.querySelector('.hero-copy .label');
  if (heroEst) heroEst.innerHTML = dict.heroEst || I18N.en.heroEst;
  const heroH1 = document.querySelector('.hero h1');
  if (heroH1) heroH1.innerHTML = dict.heroTitle || I18N.en.heroTitle;
  const heroP = document.querySelector('.hero-copy > p:not(.label)');
  if (heroP) heroP.textContent = dict.heroDesc || I18N.en.heroDesc;
  const heroBtn = document.querySelector('.hero-copy .button');
  if (heroBtn) heroBtn.innerHTML = dict.heroCta || I18N.en.heroCta;
  const scrollText = document.querySelector('.hero-footer span:first-child');
  if (scrollText) {
    scrollText.innerHTML = `${dict.scrollExplore || I18N.en.scrollExplore} <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>`;
  }

  // Translate the copy in the continuously scrolling rice ribbon while
  // preserving the variety names as recognisable product names.
  const tickerLabel = (dict.heroCta || I18N.en.heroCta).replace(/<[^>]*>/g, '').trim();
  document.querySelectorAll('.hero-ticker-inner > span').forEach((item) => {
    if (!item.dataset.riceName) {
      const name = item.cloneNode(true);
      name.querySelector('.ticker-star')?.remove();
      item.dataset.riceName = name.textContent.trim();
    }
    item.innerHTML = `${tickerLabel} · ${item.dataset.riceName} <svg class="ticker-star" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2Z"/></svg>`;
  });

  // 01 / Who We Are
  const wwaMark = document.querySelector('.wwa-mark') || document.querySelector('.wwa-label .section-mark');
  if (wwaMark) wwaMark.textContent = dict.whoWeAreMark || I18N.en.whoWeAreMark;
  const wwaH2 = document.querySelector('.wwa-headline') || document.querySelector('.wwa-headline-card h2');
  if (wwaH2) wwaH2.innerHTML = dict.whoWeAreTitle || I18N.en.whoWeAreTitle;
  const wwaP = document.querySelector('.wwa-body') || document.querySelector('.wwa-headline-card p');
  if (wwaP) wwaP.textContent = dict.whoWeAreDesc || I18N.en.whoWeAreDesc;
  const wwaLink = document.querySelector('.wwa-cta') || document.querySelector('.wwa-headline-card .underlink');
  if (wwaLink) wwaLink.innerHTML = dict.journeyLink || I18N.en.journeyLink;
  const wwaJourneyLabel = document.querySelector('.wwa-journey-heading') || document.querySelector('.wwa-journey-label');
  if (wwaJourneyLabel) wwaJourneyLabel.textContent = dict.journeyLabel || I18N.en.journeyLabel;

  // Journey Cards
  const c1Year = document.querySelector('#wwa-card-1 .wwa-jcard-tag') || document.querySelector('#wwa-card-1 .wwa-card-year');
  if (c1Year) c1Year.textContent = dict.card1Year || I18N.en.card1Year;
  const c1H3 = document.querySelector('#wwa-card-1 h3');
  if (c1H3) c1H3.innerHTML = dict.card1Title || I18N.en.card1Title;
  const c1P = document.querySelector('#wwa-card-1 .wwa-jcard-body p') || document.querySelector('#wwa-card-1 p');
  if (c1P) c1P.textContent = dict.card1Desc || I18N.en.card1Desc;

  const c2Year = document.querySelector('#wwa-card-2 .wwa-jcard-tag') || document.querySelector('#wwa-card-2 .wwa-card-year');
  if (c2Year) c2Year.textContent = dict.card2Year || I18N.en.card2Year;
  const c2H3 = document.querySelector('#wwa-card-2 h3');
  if (c2H3) c2H3.innerHTML = dict.card2Title || I18N.en.card2Title;
  const c2P = document.querySelector('#wwa-card-2 .wwa-jcard-body p') || document.querySelector('#wwa-card-2 p');
  if (c2P) c2P.textContent = dict.card2Desc || I18N.en.card2Desc;

  const c3Year = document.querySelector('#wwa-card-3 .wwa-jcard-tag') || document.querySelector('#wwa-card-3 .wwa-card-year');
  if (c3Year) c3Year.textContent = dict.card3Year || I18N.en.card3Year;
  const c3H3 = document.querySelector('#wwa-card-3 h3');
  if (c3H3) c3H3.innerHTML = dict.card3Title || I18N.en.card3Title;
  const c3P = document.querySelector('#wwa-card-3 .wwa-jcard-body p') || document.querySelector('#wwa-card-3 p');
  if (c3P) c3P.textContent = dict.card3Desc || I18N.en.card3Desc;

  const c4Year = document.querySelector('#wwa-card-4 .wwa-jcard-tag') || document.querySelector('#wwa-card-4 .wwa-card-year');
  if (c4Year) c4Year.textContent = dict.card4Year || I18N.en.card4Year;
  const c4H3 = document.querySelector('#wwa-card-4 h3');
  if (c4H3) c4H3.innerHTML = dict.card4Title || I18N.en.card4Title;
  const c4P = document.querySelector('#wwa-card-4 .wwa-jcard-body p') || document.querySelector('#wwa-card-4 p');
  if (c4P) c4P.textContent = dict.card4Desc || I18N.en.card4Desc;

  // 02 / What We Believe
  const valMark = document.querySelector('.plant-copy .section-mark');
  if (valMark) valMark.textContent = dict.valuesMark || I18N.en.valuesMark;
  const valH2 = document.querySelector('.plant-copy h2');
  if (valH2) valH2.innerHTML = dict.valuesTitle || I18N.en.valuesTitle;
  const beliefsArticles = document.querySelectorAll('.beliefs article');
  if (beliefsArticles.length >= 3) {
    beliefsArticles[0].querySelector('h3').textContent = dict.v1Title || I18N.en.v1Title;
    beliefsArticles[0].querySelector('p').textContent = dict.v1Desc || I18N.en.v1Desc;
    beliefsArticles[1].querySelector('h3').textContent = dict.v2Title || I18N.en.v2Title;
    beliefsArticles[1].querySelector('p').textContent = dict.v2Desc || I18N.en.v2Desc;
    beliefsArticles[2].querySelector('h3').textContent = dict.v3Title || I18N.en.v3Title;
    beliefsArticles[2].querySelector('p').textContent = dict.v3Desc || I18N.en.v3Desc;
  }

  // 03 / Our Rice
  const rangeMark = document.querySelector('.range-heading .section-mark');
  if (rangeMark) rangeMark.textContent = dict.rangeMark || I18N.en.rangeMark;
  const rangeH2 = document.querySelector('.range-heading h2');
  if (rangeH2) rangeH2.innerHTML = dict.rangeTitle || I18N.en.rangeTitle;
  const rangeP = document.querySelector('.range-heading > p');
  if (rangeP) rangeP.textContent = dict.rangeSub || I18N.en.rangeSub;

  // 04 / Quality First
  const qualMark = document.querySelector('.quality-copy .section-mark');
  if (qualMark) qualMark.textContent = dict.qualityMark || I18N.en.qualityMark;
  const qualH2 = document.querySelector('.quality-copy h2');
  if (qualH2) qualH2.innerHTML = dict.qualityTitle || I18N.en.qualityTitle;
  const qualPs = document.querySelectorAll('.quality-copy > p:not(.section-mark)');
  if (qualPs.length >= 2) {
    qualPs[0].textContent = dict.qualityP1 || I18N.en.qualityP1;
    qualPs[1].textContent = dict.qualityP2 || I18N.en.qualityP2;
  }
  const qualCardStrong = document.querySelector('.quality-card strong');
  if (qualCardStrong) qualCardStrong.innerHTML = dict.qualityBadgeTitle || I18N.en.qualityBadgeTitle;
  const qualCardSpan = document.querySelector('.quality-card span');
  if (qualCardSpan) qualCardSpan.textContent = dict.qualityBadgeSub || I18N.en.qualityBadgeSub;

  // 05 / Standards
  const certsMark = document.querySelector('.certs .section-mark');
  if (certsMark) certsMark.textContent = dict.certsMark || I18N.en.certsMark;
  const certsH2 = document.querySelector('.certs h2');
  if (certsH2) certsH2.innerHTML = dict.certsTitle || I18N.en.certsTitle;
  const certsP = document.querySelector('.certs > p');
  if (certsP) certsP.textContent = dict.certsDesc || I18N.en.certsDesc;

  // 06 / History
  const histMark = document.querySelector('.history-title .section-mark');
  if (histMark) histMark.textContent = dict.historyMark || I18N.en.historyMark;
  const histH2 = document.querySelector('.history-title h2');
  if (histH2) histH2.innerHTML = dict.historyTitle || I18N.en.historyTitle;

  // Closing
  const closeH2 = document.querySelector('.closing-copy h2');
  if (closeH2) closeH2.innerHTML = dict.closingTitle || I18N.en.closingTitle;
  const closeP = document.querySelector('.closing-copy > p:not(.label)');
  if (closeP) closeP.textContent = dict.closingDesc || I18N.en.closingDesc;
  const closeBtn = document.querySelector('.closing-copy .button');
  if (closeBtn) closeBtn.innerHTML = dict.closingCta || I18N.en.closingCta;

  // Trigger button label
  const triggerName = document.querySelector('.language-name');
  if (triggerName) triggerName.textContent = lang.toUpperCase().replace('-CN','');

  // Menu active styling
  document.querySelectorAll('.language-menu button').forEach(b => {
    b.classList.toggle('active-lang', b.dataset.lang === lang);
  });
}

// Build Header Language Dropdown (Clean text only, no flags/logos)
const internationalLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '中文' }
];

const languagePicker = document.createElement('div');
languagePicker.className = 'language-picker';
languagePicker.innerHTML = `
  <button class="language-trigger" type="button" aria-expanded="false" aria-label="Choose language">
    <span class="language-name">EN</span>
    <span class="language-arrow">⌄</span>
  </button>
  <div class="language-menu" role="menu">
    ${internationalLanguages.map((l, i) => `<button type="button" data-lang="${l.code}" class="${i === 0 ? 'active-lang' : ''}">${l.name}</button>`).join('')}
  </div>
`;

const headerActions = document.querySelector('.header-actions') || document.querySelector('.site-header');
if (headerActions) {
  const cta = headerActions.querySelector('.header-cta');
  if (cta) {
    headerActions.insertBefore(languagePicker, cta);
  } else {
    headerActions.appendChild(languagePicker);
  }
}

// UI version switchers: desktop header and the mobile navigation drawer.
if (headerActions && !headerActions.querySelector('.ui-switcher-group')) {
  const uiGroup = document.createElement('div');
  uiGroup.className = 'ui-switcher-group';
  
  const ui2Switch = document.createElement('a');
  ui2Switch.className = 'ui-switch-link';
  ui2Switch.href = 'ui-2.html';
  ui2Switch.textContent = 'UI 02';
  ui2Switch.title = 'View UI 02: Heritage Invitation';

  const ui3Switch = document.createElement('a');
  ui3Switch.className = 'ui-switch-link';
  ui3Switch.href = 'ui-3.html';
  ui3Switch.textContent = 'UI 03';
  ui3Switch.title = 'View UI 03: GSAP Modern';

  uiGroup.appendChild(ui2Switch);
  uiGroup.appendChild(ui3Switch);
  headerActions.insertBefore(uiGroup, headerActions.querySelector('.header-cta'));
}

const mobileMenu = document.querySelector('.mobile-nav-inner');
if (mobileMenu && !mobileMenu.querySelector('.mobile-ui-switch-wrap')) {
  const switchWrap = document.createElement('div');
  switchWrap.className = 'mobile-ui-switch-wrap';

  const mobile2Switch = document.createElement('a');
  mobile2Switch.className = 'mobile-nav-link mobile-ui-switch';
  mobile2Switch.href = 'ui-2.html';
  mobile2Switch.textContent = 'View UI 02 (Heritage) ↗';

  const mobile3Switch = document.createElement('a');
  mobile3Switch.className = 'mobile-nav-link mobile-ui-switch';
  mobile3Switch.href = 'ui-3.html';
  mobile3Switch.textContent = 'View UI 03 (GSAP Modern) ↗';

  switchWrap.appendChild(mobile2Switch);
  switchWrap.appendChild(mobile3Switch);

  const mobileCta = mobileMenu.querySelector('.mobile-nav-cta');
  mobileMenu.insertBefore(switchWrap, mobileCta || null);
}

const trigger = languagePicker.querySelector('.language-trigger');
trigger.addEventListener('click', () => {
  const open = languagePicker.classList.toggle('open');
  trigger.setAttribute('aria-expanded', open);
});

document.addEventListener('click', e => {
  if (!languagePicker.contains(e.target)) {
    languagePicker.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }
});

languagePicker.querySelectorAll('[data-lang]').forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.lang;
    applyLanguage(selected);
    languagePicker.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  });
});

setTimeout(()=>{const boundaryStyle=document.createElement('style');boundaryStyle.textContent=`.hero{position:relative;z-index:0;isolation:isolate;overflow:hidden}.hero-media,.hero-shade,.hero-footer{pointer-events:none}`;document.head.append(boundaryStyle)},1000);
setTimeout(()=>{document.querySelectorAll('a[href="https://gajanan.net/"]').forEach(link=>link.remove());const finishingStyle=document.createElement('style');finishingStyle.textContent=`.social-row a{display:grid!important;place-items:center;width:38px;height:38px;padding:0!important;border-radius:50%;font-size:0!important}.social-row a svg{width:15px;height:15px;fill:currentColor}.social-row a:hover{transform:translateY(-3px)}`;document.head.append(finishingStyle);const socials=document.querySelectorAll('.social-row a');const icons=['<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.8l.4-3.1h-3.2V8c0-.9.3-1.5 1.6-1.5h1.8V3.7c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5v1.8H7.1V13H10v8h3.5z"/></svg>','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm-.2 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4H7.1Zm10.6 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.3H3.2V21h3.3V8.3ZM4.9 3A1.9 1.9 0 1 0 5 6.8 1.9 1.9 0 0 0 4.9 3ZM21 13.7c0-3.8-2-5.6-4.8-5.6-2.2 0-3.2 1.2-3.8 2v-1.7H9.1V21h3.3v-6.3c0-1.7.3-3.4 2.4-3.4 2 0 2 1.9 2 3.5V21H21v-7.3Z"/></svg>','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.5 2H22l-7.7 8.8L23.4 22h-7.1l-5.6-7.3L4.3 22H.8l8.2-9.4L.3 2h7.3L12.7 8.7 18.5 2Zm-1.2 18h1.9L6.5 3.9h-2L17.3 20Z"/></svg>'];socials.forEach((a,i)=>{a.innerHTML=icons[i];a.setAttribute('aria-label',['Facebook','Instagram','LinkedIn','X'][i])})},900);
setTimeout(()=>{const field1='https://images.unsplash.com/photo-1626193576769-87e4e0b58a63?auto=format&fit=crop&w=2400&q=92';const field2='https://images.unsplash.com/photo-1663165055037-dbd96e18867f?auto=format&fit=crop&w=2400&q=92';const field3='https://images.unsplash.com/photo-1621394988863-117a9fc6e77f?auto=format&fit=crop&w=2400&q=92';const slides=document.querySelectorAll('.hero-slide');if(slides.length===3){slides[0].style.backgroundImage='url('+field1+')';slides[1].style.backgroundImage='url('+field2+')';slides[2].style.backgroundImage='url('+field3+')'}},400);

document.querySelector('.hero-footer span:last-child')?.remove();

const font=document.createElement('link');font.rel='stylesheet';font.href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:opsz,wght@8..144,600;8..144,700;8..144,800&display=swap';document.head.append(font);
const style=document.createElement('style');style.textContent=`
.hero h1,.statement h2,.plant-copy h2,.range h2,.quality h2,.certs h2,.history h2,.closing h2{font-family:'Plus Jakarta Sans',var(--sans);font-weight:800;letter-spacing:-.075em;line-height:.98}.hero h1{font-size:clamp(49px,6.15vw,92px);max-width:660px}.hero h1 em,h2 em{font-family:'Plus Jakarta Sans',var(--sans);font-weight:600}.hero-media{background:none!important;transform:none!important;animation:none!important}.hero-slide,.closing-slide{position:absolute;inset:-3%;background-size:cover;background-position:center;opacity:0;animation:pan 22s infinite ease-in-out}.field-slide{background-image:url('https://gajanan.net/wp-content/uploads/2020/11/banner_01-1-1.jpg');animation-delay:0s}.rice-slide{background-image:url('https://images.unsplash.com/photo-1673158189946-804d96c9f831?auto=format&fit=crop&w=2200&q=92');animation-delay:7.33s}.craft-slide{background-image:url('https://aaes.uada.edu/files/2022/12/Rice-Harvest.jpg');animation-delay:14.66s}@keyframes pan{0%{opacity:0;transform:scale(1.04) translateX(-1.5%)}5%{opacity:1}29%{opacity:1;transform:scale(1.13) translateX(1.5%)}34%,100%{opacity:0}}.rice-pot-scene{background-image:linear-gradient(90deg,rgba(22,30,16,.12),rgba(22,30,16,.02)),url('https://images.unsplash.com/photo-1673158189946-804d96c9f831?auto=format&fit=crop&w=2200&q=92')!important;background-position:center!important}.variety-deck{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-top:24px}.variety-card{min-height:310px;background:#ebe5d9;padding:14px;display:flex;flex-direction:column;justify-content:space-between;transition:transform .35s ease,background .35s ease}.variety-card:hover{transform:translateY(-7px);background:#dedf97}.variety-card img{width:100%;height:205px;object-fit:contain;mix-blend-mode:multiply}.variety-card .card-type{font:9px var(--mono);letter-spacing:.08em;color:#657033}.variety-card h3{font-size:15px;line-height:1.05;letter-spacing:-.035em;margin:7px 0 0}.social-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:24px}.social-row a{font:9px var(--mono)!important;letter-spacing:.08em;border:1px solid rgba(255,255,255,.34);padding:10px 11px;margin:0!important}.cert-row .cert-logo{min-height:130px;align-items:center;justify-content:center;gap:12px}.cert-logo img{display:block;max-width:125px;max-height:60px;object-fit:contain}.cert-logo small{font:9px var(--mono);letter-spacing:.1em}.iso-logo,.fda-logo{display:grid;place-items:center;width:57px;height:57px;border-radius:50%;border:1px solid var(--olive);color:var(--olive);font:700 17px/1 var(--sans)}.fda-logo{border-radius:5px;font-size:14px;line-height:.83}@media(max-width:850px){.variety-deck{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.hero h1{font-size:46px;letter-spacing:-.065em}.variety-deck{gap:8px}.variety-card{min-height:240px}.variety-card img{height:145px}}
`;document.head.append(style);

const hero=document.querySelector('.hero-media');if(hero)hero.innerHTML='<span class="hero-slide field-slide"></span><span class="hero-slide rice-slide"></span><span class="hero-slide craft-slide"></span>';
const pot=document.querySelector('.tall-photo');if(pot){pot.innerHTML='<span class="values-slide slide-1"></span><span class="values-slide slide-2"></span><span class="values-slide slide-3"></span><div class="photo-caption">A FIELD-TO-TABLE<br>COMMITMENT.</div>'}
const closing=document.querySelector('.closing-photo');if(closing){closing.innerHTML='<span class="closing-slide" style="background-image:url(https://aaes.uada.edu/files/2022/12/Rice-Harvest.jpg)"></span><span class="closing-slide" style="background-image:url(https://images.unsplash.com/photo-1673158189946-804d96c9f831?auto=format&fit=crop&w=2200&q=92);animation-delay:7.33s"></span><span class="closing-slide" style="background-image:url(https://gajanan.net/wp-content/uploads/2020/11/banner_01-1-1.jpg);animation-delay:14.66s"></span>'}

// Universal IntersectionObserver for all in-view elements
const inViewObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view', 'on');
      // Sub-triggers for containers
      if (entry.target.classList.contains('beliefs')) entry.target.classList.add('values-on');
      if (entry.target.classList.contains('history-list')) entry.target.classList.add('history-on');
      if (entry.target.classList.contains('cert-row')) entry.target.classList.add('certs-on');
      if (entry.target.classList.contains('wwa-cards')) entry.target.classList.add('cards-on');
      if (entry.target.classList.contains('wwa-cards-grid')) entry.target.classList.add('cards-on');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Observe all major section components, headings, paragraphs, and cards
document.querySelectorAll(`
  .wwa-section, .statement, .wwa-headline-card, .wwa-journey, .wwa-cards, .wwa-cards-grid, .wwa-left, .wwa-right,
  .visual-pair, .plant-copy, .beliefs,
  .range, .range-heading, .range-feature, .product-list, .variety-deck,
  .quality, .quality-copy, .quality-photo, .quality-card,
  .certs, .certs h2, .certs > p, .cert-row,
  .history, .history-title, .history-list,
  .trade-inquiry-section, .trade-form-card,
  .closing, .closing-copy,
  footer, .footer-grid,
  .section-mark, h2, .product-list article
`).forEach((el, index) => {
  el.classList.add('reveal');
  if (index % 2 === 1) el.classList.add('delay-1');
  inViewObserver.observe(el);
});

// Interactive Trade Inquiry Form submission
const tradeForm = document.getElementById('tradeInquiryForm');
if (tradeForm) {
  tradeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('tradeSubmitBtn');
    const banner = document.getElementById('formSuccessBanner');
    if (btn) {
      btn.innerHTML = '<span>SUBMITTING INQUIRY...</span>';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<span>INQUIRY SUBMITTED ✓</span>';
        btn.style.background = '#d9e08d';
        btn.style.color = '#1b2416';
        if (banner) {
          banner.style.display = 'flex';
          banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        tradeForm.reset();
      }, 600);
    }
  });
}

const certRow=document.querySelector('.cert-row');if(certRow)certRow.innerHTML=`<div class="cert-logo"><span class="iso-logo">ISO</span><small>ISO 22000</small></div><div class="cert-logo"><img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_200,h_73/https://gajanan.net/wp-content/uploads/2019/01/fsc.png" alt="FSSC 22000 certification logo"><small>FSSC 22000</small></div><div class="cert-logo"><img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_200,h_73/https://gajanan.net/wp-content/uploads/2019/01/ing.png" alt="Organic certification logo"><small>ORGANIC</small></div><div class="cert-logo"><img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_200,h_73/https://gajanan.net/wp-content/uploads/2019/01/smt.png" alt="SEDEX SMETA logo"><small>SEDEX SMETA</small></div><div class="cert-logo"><span class="fda-logo">US<br>FDA</span><small>USFDA</small></div>`;

const list=document.querySelector('.product-list');if(list){const deck=document.createElement('div');deck.className='variety-deck reveal delay-2';deck.innerHTML=`<article class="variety-card"><img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_380,h_380/https://gajanan.net/wp-content/uploads/2022/09/YellowSonaMasooriRice30kg-Front-1-380x380.jpg" alt="Gajanan Yellow Sona Masoori pack"><div><span class="card-type">EVERYDAY CLASSIC</span><h3>Yellow Sona Masoori</h3></div></article><article class="variety-card"><img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_380,h_380/https://gajanan.net/wp-content/uploads/2022/09/RedPlusSonaRaw30kg-Front-380x380.jpg" alt="Gajanan Red Plus Sona Raw pack"><div><span class="card-type">AGED RAW RICE</span><h3>Red Plus Sona Raw</h3></div></article><article class="variety-card"><img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_380,h_380/https://gajanan.net/wp-content/uploads/2022/09/OrangePlusPremiumHMTRaw30kg-Front-380x380.jpg" alt="Gajanan Orange Plus HMT Raw pack"><div><span class="card-type">PREMIUM HMT</span><h3>Orange Plus HMT Raw</h3></div></article><article class="variety-card"><img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_380,h_380/https://gajanan.net/wp-content/uploads/2022/09/GoldPlusJeeraSambhaGhee30kg-Front-380x380.jpg" alt="Gajanan Gold Plus Jeera Sambha pack"><div><span class="card-type">AROMATIC RICE</span><h3>Gold Plus Jeera Sambha</h3></div></article>`;list.after(deck);inViewObserver.observe(deck);}
const trade=document.querySelector('.footer-grid>div:last-child');if(trade && !document.querySelector('.footer-grid .social-row')){const social=document.createElement('div');social.className='social-row';social.innerHTML='<a href="https://www.facebook.com/GAJANANRICE" target="_blank" rel="noreferrer">FACEBOOK</a><a href="https://www.instagram.com/shreegajananindustries/" target="_blank" rel="noreferrer">INSTAGRAM</a><a href="https://www.linkedin.com/company/37523357/admin/" target="_blank" rel="noreferrer">LINKEDIN</a><a href="https://twitter.com/ShreeGajananIn1" target="_blank" rel="noreferrer">X / TWITTER</a>';trade.append(social)}

// ============================================================
// 03 / OUR RICE — Spotlight Variety Carousel (4s Auto + Controls)
// ============================================================
(function initGrainSpotlightCarousel() {
  const grainVarieties = [
    {
      category: "THE SIGNATURE GRAIN",
      title: "Sona<br>Masoori",
      description: "One of the finest varieties of rice: soft, light, non-sticky and known for its distinctive flavour, delicate sweetness and aroma.",
      sizes: "10 lbs · 20 lbs · 40 lbs",
      variants: "Raw · Steam · Crystal · Organic",
      image: "rice_sona_masoori.jpg"
    },
    {
      category: "THE REGIONAL FAVORITE",
      title: "Wada<br>Kolam",
      description: "A revered medium-slender grain prized for its rich, tender texture, velvety mouthfeel, and excellent digestibility for daily family meals.",
      sizes: "10 kg · 25 kg · 50 lbs",
      variants: "Aged · Silky Polished · Daily Choice",
      image: "rice_kolam.jpg"
    },
    {
      category: "THE AROMATIC HERITAGE",
      title: "Jeera<br>Sambha",
      description: "Tiny, aromatic heritage grain with an enchanting natural fragrance that absorbs rich spices deeply—the crown jewel of festive biryanis.",
      sizes: "5 kg · 10 kg · 20 lbs",
      variants: "Traditional · Royal Select · Organic",
      image: "rice_jeera_sambha.jpg"
    },
    {
      category: "THE EVERYDAY STAPLE",
      title: "HMT Raw<br>Rice",
      description: "Short, slender, high-yielding white rice with exceptional softness upon cooking, making it an indispensable household & catering favorite.",
      sizes: "25 lbs · 50 lbs · Custom Bulk",
      variants: "Raw · Single Polished · Export Grade",
      image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1200&q=85"
    },
    {
      category: "THE NUTRITION CHOICE",
      title: "Organic<br>Brown Sona",
      description: "100% whole grain with preserved outer bran layer, delivering rich dietary fiber, essential micronutrients, and wholesome nutty notes.",
      sizes: "10 lbs · 20 lbs · 40 lbs",
      variants: "100% Whole Grain · Certified Organic",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=85"
    }
  ];

  let currentIndex = 0;
  let autoTimer = null;
  let isHovered = false;

  const carouselEl = document.getElementById('grain-spotlight-carousel');
  const photoEl = document.getElementById('grain-photo-display');
  const contentBody = document.getElementById('grain-content-body');
  const catEl = document.getElementById('grain-category-label');
  const titleEl = document.getElementById('grain-title');
  const descEl = document.getElementById('grain-desc');
  const sizesEl = document.getElementById('grain-sizes');
  const variantsEl = document.getElementById('grain-variants');
  const counterEl = document.getElementById('grain-counter');
  const statusBadge = document.getElementById('carousel-status-badge');
  const prevBtn = document.getElementById('grain-prev-btn');
  const nextBtn = document.getElementById('grain-next-btn');
  const dots = document.querySelectorAll('#grain-dots .dot-btn');

  if (!carouselEl || !photoEl || !titleEl) return;

  function renderSlide(index) {
    const item = grainVarieties[index];
    if (!item) return;

    if (contentBody) contentBody.classList.add('animating');

    setTimeout(() => {
      if (photoEl) photoEl.style.backgroundImage = `url('${item.image}')`;
      if (catEl) catEl.textContent = item.category;
      if (titleEl) titleEl.innerHTML = item.title;
      if (descEl) descEl.textContent = item.description;
      if (sizesEl) sizesEl.textContent = item.sizes;
      if (variantsEl) variantsEl.textContent = item.variants;
      if (counterEl) counterEl.textContent = `0${index + 1} / 0${grainVarieties.length}`;

      if (statusBadge) {
        statusBadge.classList.remove('edge-badge');
        if (index === 0) {
          statusBadge.textContent = isHovered ? 'START (PAUSED)' : 'START OF CAROUSEL';
          statusBadge.classList.add('edge-badge');
        } else if (index === grainVarieties.length - 1) {
          statusBadge.textContent = isHovered ? 'END OF CAROUSEL (PAUSED)' : 'END OF CAROUSEL';
          statusBadge.classList.add('edge-badge');
        } else {
          statusBadge.textContent = isHovered ? 'PAUSED (HOVERED)' : 'AUTO-PLAYING (4s)';
        }
      }

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      if (contentBody) contentBody.classList.remove('animating');
    }, 180);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % grainVarieties.length;
    renderSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + grainVarieties.length) % grainVarieties.length;
    renderSlide(currentIndex);
  }

  function startAutoTimer() {
    stopAutoTimer();
    autoTimer = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 4000);
  }

  function stopAutoTimer() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoTimer();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      if (!isNaN(idx)) {
        currentIndex = idx;
        renderSlide(currentIndex);
        startAutoTimer();
      }
    });
  });

  carouselEl.addEventListener('mouseenter', () => {
    isHovered = true;
    if (statusBadge) {
      if (currentIndex === 0) {
        statusBadge.textContent = 'START (PAUSED)';
      } else if (currentIndex === grainVarieties.length - 1) {
        statusBadge.textContent = 'END OF CAROUSEL (PAUSED)';
      } else {
        statusBadge.textContent = 'PAUSED (HOVERED)';
      }
    }
  });

  carouselEl.addEventListener('mouseleave', () => {
    isHovered = false;
    if (statusBadge) {
      if (currentIndex === 0) {
        statusBadge.textContent = 'START OF CAROUSEL';
      } else if (currentIndex === grainVarieties.length - 1) {
        statusBadge.textContent = 'END OF CAROUSEL';
      } else {
        statusBadge.textContent = 'AUTO-PLAYING (4s)';
      }
    }
  });

  renderSlide(0);
  startAutoTimer();
})();

// ============================================================
// MOBILE HAMBURGER MENU
// ============================================================
(function() {
  const btn      = document.getElementById('hamburgerBtn');
  const drawer   = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  if (!btn || !drawer) return;

  function openMenu() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  if (backdrop) backdrop.addEventListener('click', closeMenu);

  const closeBtn = document.getElementById('mobileNavCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close drawer on link click
  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

// ============================================================
// SIMPLE INQUIRY FORM SUBMISSION
// ============================================================
(function() {
  const form = document.getElementById('simpleInquiryForm');

  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('sifSubmitBtn');
    const success = document.getElementById('sifSuccess');
    if (btn) {
      btn.innerHTML = '<span>SUBMITTING...</span>';
      btn.disabled = true;
    }
    setTimeout(() => {
      if (btn) {
        btn.innerHTML = '<span>INQUIRY SENT</span> <span>✓</span>';
        btn.style.background = '#2f3e18';
      }
      if (success) {
        success.style.display = 'flex';
      }
      form.reset();
    }, 600);
  });
})();

// ============================================================
// GOOGLE MAPS LOCATION LINK
// ============================================================
(function() {
  const socialRow = document.querySelector('.footer-social-wrapper .social-row');
  if (!socialRow || socialRow.querySelector('.social-map-link')) return;

  const mapLink = document.createElement('a');
  mapLink.className = 'social-map-link';
  mapLink.href = 'https://share.google/0Xsx7UmYoQ4CXiG67';
  mapLink.target = '_blank';
  mapLink.rel = 'noopener noreferrer';
  mapLink.setAttribute('aria-label', 'Find Gajanan Rice on Google Maps');
  mapLink.innerHTML = '<img src="gmaps-icon.svg" alt="" aria-hidden="true">';
  socialRow.appendChild(mapLink);
})();
