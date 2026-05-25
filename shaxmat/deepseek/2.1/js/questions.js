// ===== QUESTIONS DATABASE =====
const BASE_QUESTIONS = [
    // Easy questions (2 options)
    { q: "'Naftandoz' qadimgi janglarda qanday vazifani bajargan?", options: ["Olovli qurol otuvchi jangchi", "Suv tashuvchi"], correct: 0, difficulty: "easy" },
    { q: "'Manjaniq' nima?", options: ["Tosh otuvchi mashina", "Qal'a darvozasi"], correct: 0, difficulty: "easy" },
    { q: "'Qalqon' asosiy vazifasi?", options: ["Himoyalanish", "Hujum qilish"], correct: 0, difficulty: "easy" },
    { q: "'Yuzboshi' nechta jangchini boshqaradi?", options: ["100 ta", "1000 ta"], correct: 0, difficulty: "easy" },
    { q: "'Kamonchi' qanday qurol ishlatgan?", options: ["Kamon va o'q", "Qilich"], correct: 0, difficulty: "easy" },
    { q: "'Otliq' qo'shin turi?", options: ["Ot ustida jang qiluvchi", "Piyoda askar"], correct: 0, difficulty: "easy" },
    { q: "'Qal'a' nima?", options: ["Mudofaa inshooti", "Hujum quroli"], correct: 0, difficulty: "easy" },
    { q: "'Bayroq' jangda nima uchun kerak?", options: ["Signal berish", "Yashirinish"], correct: 0, difficulty: "easy" },
    { q: "'Nayza' qanday qurol?", options: ["Uzun sopli qurol", "Qisqa pichoq"], correct: 0, difficulty: "easy" },
    { q: "'Jasorat' nimani anglatadi?", options: ["Qo'rqmaslik", "Qo'rqoqlik"], correct: 0, difficulty: "easy" },
    { q: "'Strategiya' so'zining ma'nosi?", options: ["Urush rejasi", "Tasodifiy harakat"], correct: 0, difficulty: "easy" },
    { q: "'Sarkarda' kim?", options: ["Qo'mondon", "Oddiy askar"], correct: 0, difficulty: "easy" },
    { q: "'Qurol-yarog' nima uchun?", options: ["Jang qilish", "Ovqatlanish"], correct: 0, difficulty: "easy" },
    { q: "'Harbiy intizom' nimani talab qiladi?", options: ["Bo'ysunish", "Erkinlik"], correct: 0, difficulty: "easy" },
    { q: "'Razvedka' maqsadi?", options: ["Ma'lumot to'plash", "Hujum qilish"], correct: 0, difficulty: "easy" },
    { q: "'Piyoda askar' qayerda jang qiladi?", options: ["Yerda", "Ot ustida"], correct: 0, difficulty: "easy" },
    { q: "'Qilich' qanday qurol?", options: ["Kesuvchi qurol", "Otuvchi qurol"], correct: 0, difficulty: "easy" },
    { q: "'Mudofaa' nimani anglatadi?", options: ["Himoyalanish", "Hujum qilish"], correct: 0, difficulty: "easy" },
    { q: "'Hujum' maqsadi?", options: ["Dushmanni yengish", "Chekinish"], correct: 0, difficulty: "easy" },
    { q: "'G'alaba' nima?", options: ["Yutuq", "Mag'lubiyat"], correct: 0, difficulty: "easy" },
    
    // Medium questions (4 options)
    { q: "'Qal'a buzuvchi' qanday texnikadan foydalangan?", options: ["Qo'chqor (taran)", "Katapulta", "Mina", "Kamon"], correct: 0, difficulty: "medium" },
    { q: "'Barut' harbiy tarixda qanday inqilob yaratdi?", options: ["O'qotar qurollar paydo bo'ldi", "Qal'alar mustahkamlandi", "Otliqlar yo'qoldi", "Dengiz janglari to'xtadi"], correct: 0, difficulty: "medium" },
    { q: "'Anqara jangi' qaysi yilda bo'lgan?", options: ["1402", "1453", "1389", "1421"], correct: 0, difficulty: "medium" },
    { q: "'Zafarnoma' kimning asari?", options: ["Amir Temur", "Sharafiddin Ali Yazdiy", "Bobur", "Ibn Sino"], correct: 1, difficulty: "medium" },
    { q: "'Mingboshi' nechta jangchini boshqaradi?", options: ["1000", "100", "10000", "500"], correct: 0, difficulty: "medium" },
    { q: "'Tumanboshi' nechta jangchiga boshchilik qiladi?", options: ["10000", "1000", "100", "5000"], correct: 0, difficulty: "medium" },
    { q: "'O'nboshi' nechta jangchini boshqaradi?", options: ["10", "5", "20", "15"], correct: 0, difficulty: "medium" },
    { q: "'G'ul (Shaxsiy qo'riqchilar)' vazifasi?", options: ["Sarkardani muhofaza qilish", "Old safda jang qilish", "Razvedka", "Qurol ta'mirlash"], correct: 0, difficulty: "medium" },
    { q: "'Dehli yurishi' qaysi sarkarda nomi bilan bog'liq?", options: ["Amir Temur", "Bobur", "Humoyun", "Akbar"], correct: 0, difficulty: "medium" },
    { q: "'Tuzuklar' qaysi hukmdorning asari?", options: ["Amir Temur", "Bobur", "Chingizxon", "To'xtamish"], correct: 0, difficulty: "medium" },
    { q: "'Hiravul' harbiy termin nimani anglatadi?", options: ["Avangard", "Zahira", "Markaz", "Orqa qo'riq"], correct: 0, difficulty: "medium" },
    { q: "'Ko'ragon' unvoni ma'nosi?", options: ["Xon sulolasi bilan qarindosh", "Jangchi", "Qo'mondon", "Maslahatchi"], correct: 0, difficulty: "medium" },
    { q: "'Yasoq' qanday hujjat?", options: ["Chingizxon qonunlari", "Amir Temur tuzuklari", "Bobur she'rlari", "Qur'on"], correct: 0, difficulty: "medium" },
    { q: "'Sopqon-tosh' nima?", options: ["Tosh otish quroli", "Qal'a qurilishi", "Signal vositasi", "Zirh turi"], correct: 0, difficulty: "medium" },
    { q: "'Terek jangi' (1395) kimlar o'rtasida?", options: ["Amir Temur va To'xtamish", "Chingizxon va Jalloliddin", "Bobur va Ibrohim Lodi", "Salohiddin va Richard"], correct: 0, difficulty: "medium" },
    { q: "'Mashvarat' harbiy qarorda nima?", options: ["Maslahat yig'ini", "Hujum boshlash", "Chekinish", "Qurol tanlash"], correct: 0, difficulty: "medium" },
    { q: "'Amir' unvoni ma'nosi?", options: ["Harbiy boshliq", "Oddiy askar", "Razvedkachi", "Muhandis"], correct: 0, difficulty: "medium" },
    { q: "'Izmir qamali' qaysi voqea bilan bog'liq?", options: ["Temurning g'arb yurishi", "Salib yurishlari", "Vizantiya urushi", "Mo'g'ul istilosi"], correct: 0, difficulty: "medium" },
    { q: "'Said Baraka' kim bo'lgan?", options: ["Amir Temurning ustozi", "Qo'mondon", "Shoir", "Faylasuf"], correct: 0, difficulty: "medium" },
    { q: "'Javan-g'ar' nimani anglatadi?", options: ["Avangard", "Markaz", "Zahira", "Orqa"], correct: 0, difficulty: "medium" },
    { q: "'Baran-g'ar' nimani anglatadi?", options: ["O'ng qanot", "Chap qanot", "Markaz", "Zahira"], correct: 0, difficulty: "medium" },
    { q: "'Pistirma' strategiyasi?", options: ["Yashirinib turib hujum", "To'g'ridan-to'g'ri hujum", "Chekinish", "Mudofaa"], correct: 0, difficulty: "medium" },
    { q: "'Nog'orachilar' vazifasi?", options: ["Signal berish", "Jang qilish", "Razvedka", "Ta'minot"], correct: 0, difficulty: "medium" },
    { q: "'Qunduz jangi' qaysi mintaqada?", options: ["O'rta Osiyo", "Yevropa", "Hindiston", "Xitoy"], correct: 0, difficulty: "medium" },
    { q: "'Mahmud Taybodiy' kim?", options: ["Harbiy tarixiy shaxs", "Shoir", "Olim", "Sayyoh"], correct: 0, difficulty: "medium" },
    { q: "'Tuzoq (qopqon)' strategiyasi?", options: ["Dushmanni aldab tushirish", "Qal'a qamali", "Tungi hujum", "Chekinish"], correct: 0, difficulty: "medium" },
    { q: "'Arqon' janglarda qanday ishlatilgan?", options: ["Otliqlarni to'xtatish", "Ko'prik qurish", "Bog'lash", "Signal"], correct: 0, difficulty: "medium" },
    { q: "'Intizom' harbiy jihatdan?", options: ["Tartib va bo'ysunish", "Erkinlik", "Jangovar ruh", "Qurol bilish"], correct: 0, difficulty: "medium" },
    { q: "'Muhandis' qo'shinda nima qiladi?", options: ["Istehkom qurish", "Jang qilish", "Razvedka", "Ta'minot"], correct: 0, difficulty: "medium" },
    { q: "'Chekinish usuli' maqsadi?", options: ["Dushmanni cho'zish", "Mag'lubiyatni tan olish", "Dam olish", "Qurol almashtirish"], correct: 0, difficulty: "medium" },
    
    // Hard questions (4 options + time limit)
    { q: "Amir Temur qo'shinining asosiy taktik ustunligi nima edi?", options: ["Tez manevr va intizom", "Ko'p sonlilik", "Yangi qurollar", "Dengiz kuchlari"], correct: 0, difficulty: "hard" },
    { q: "Mo'g'ul qo'shinlarining asosiy taktikasi?", options: ["Yoy otish va tez harakat", "Qal'a qamali", "Piyoda jang", "Dengiz jangi"], correct: 0, difficulty: "hard" },
    { q: "Sun-Szining 'Urush san'ati' asaridagi mashhur ibora?", options: ["O'zingni bil, dushmaningni bil", "Ko'pchilik g'alaba keltiradi", "Tezlik muhim", "Mudofaa eng yaxshi hujum"], correct: 0, difficulty: "hard" },
    { q: "'Taktika' va 'strategiya' farqi?", options: ["Taktika - jang usuli, strategiya - umumiy reja", "Bir xil tushuncha", "Taktika - uzoq muddatli", "Strategiya - quruqlikda"], correct: 0, difficulty: "hard" },
    { q: "Buyuk Ipak yo'li harbiy ahamiyati?", options: ["Tez ko'chirish va ma'lumot uzatish", "Faqat savdo", "Faqat diplomatiya", "Qishloq xo'jaligi"], correct: 0, difficulty: "hard" },
    { q: "Qadimgi Hindiston fil hujumiga qarshi usul?", options: ["Olov va shovqin", "Uzun nayzalar", "Piyodalar safi", "Otliqlar"], correct: 0, difficulty: "hard" },
    { q: "Vizantiya harbiy taktikasining o'ziga xosligi?", options: ["Yunon olovi", "Katapultalar", "Otliqlar", "Dengiz kuchlari"], correct: 0, difficulty: "hard" },
    { q: "Salib yurishlarida qal'alarni zabt etish usuli?", options: ["Uzoq muddatli qamal", "Tungi hujum", "Poraxo'rlik", "Suvsiz qoldirish"], correct: 0, difficulty: "hard" },
    { q: "Rim legioni taktik birligi?", options: ["Kogorta", "Dekuriya", "Kogorta (480 askar)", "Legion (6000)"], correct: 2, difficulty: "hard" },
    { q: "Falanga jang tartibi qaysi davlatga tegishli?", options: ["Makedoniya", "Rim", "Misr", "Fors"], correct: 0, difficulty: "hard" },
    { q: "Yetti yillik urush (1399-1404) kimga tegishli?", options: ["Amir Temur", "Chingizxon", "Bobur", "Napoleon"], correct: 0, difficulty: "hard" },
    { q: "'Turkning bosh bo'g'ini' nimani anglatadi?", options: ["Turkiy harbiy tizim markazi", "Og'ir qurollar", "Bosh qo'mondon", "Qal'a"], correct: 0, difficulty: "hard" },
    { q: "Qandala harbiy atamasi nimani bildiradi?", options: ["Strategik muhim nuqta", "Qurol turi", "Jang tartibi", "Mudofaa inshooti"], correct: 0, difficulty: "hard" },
    { q: "Jaloliddin Manguberdining asosiy taktikasi?", options: ["Tez otliq hujumlar", "Qal'a mudofaasi", "Partizan urushi", "Dengiz jangi"], correct: 0, difficulty: "hard" },
    { q: "Ayni Jalut jangi ahamiyati?", options: ["Mo'g'ullarning birinchi mag'lubiyati", "Salibchilar mag'lubiyati", "Temur g'alabasi", "Usmonlilar g'alabasi"], correct: 0, difficulty: "hard" },
    { q: "Qaqqa jangi qachon bo'lgan?", options: ["1510", "1402", "1453", "1526"], correct: 0, difficulty: "hard" },
    { q: "Marv jangi (1510) kimlar o'rtasida?", options: ["Shayboniyxon va Ismoil Safaviy", "Bobur va Ibrohim Lodi", "Temur va To'xtamish", "Usmonlilar va Vizantiya"], correct: 0, difficulty: "hard" },
    { q: "Chingizxonning asosiy harbiy innovatsiyasi?", options: ["Minglik tizimi va intizom", "Yangi qurollar", "Dengiz kuchlari", "Qal'a qurilishi"], correct: 0, difficulty: "hard" },
    { q: "Kalka daryosi jangi (1223) kimlar o'rtasida?", options: ["Mo'g'ullar va Rus knyazliklari", "Mo'g'ullar va Xorazm", "Ruslar va Polovetslar", "Mo'g'ullar va Bolgarlar"], correct: 0, difficulty: "hard" },
    { q: "Vena qamali (1529) kim tomonidan amalga oshirilgan?", options: ["Usmonlilar", "Mo'g'ullar", "Salibchilar", "Vizantiya"], correct: 0, difficulty: "hard" },
    { q: "Lepanto dengiz jangi (1571) ahamiyati?", options: ["Oxirgi yirik eshkakli kema jangi", "Birinchi dengiz jangi", "Usmonlilar g'alabasi", "Ispaniya mag'lubiyati"], correct: 0, difficulty: "hard" },
    { q: "Vaterloo jangi (1815) kim mag'lub bo'lgan?", options: ["Napoleon", "Vellington", "Blyuxer", "Fridrix"], correct: 0, difficulty: "hard" },
    { q: "Stalingrad jangi ahamiyati?", options: ["Ikkinchi jahon urushi burilish nuqtasi", "Birinchi jahon urushi", "Sovetlar mag'lubiyati", "Nemis g'alabasi"], correct: 0, difficulty: "hard" },
    { q: "Kursk jangi (1943) nima bilan mashhur?", options: ["Tanklar jangi", "Havo jangi", "Dengiz jangi", "Qamal"], correct: 0, difficulty: "hard" },
    { q: "Normandiya operatsiyasi (1944) kodi?", options: ["Overlord", "Barbarossa", "Bagration", "Citadel"], correct: 0, difficulty: "hard" },
    { q: "Xartum qamali (1884-1885) kimga qarshi?", options: ["Mahdiy qo'zg'olonchilari", "Ingliz mustamlakachilari", "Fransuzlar", "Usmonlilar"], correct: 0, difficulty: "hard" },
    { q: "Isandlwana jangi (1879) kim g'alaba qozongan?", options: ["Zulular", "Inglizlar", "Burlar", "Boerlar"], correct: 0, difficulty: "hard" },
    { q: "Adrianopol jangi (378) ahamiyati?", options: ["Rim imperiyasining og'ir mag'lubiyati", "Vizantiya g'alabasi", "Gunnlar yurishi", "Gotlar mag'lubiyati"], correct: 0, difficulty: "hard" },
    { q: "Puatye jangi (732) kimlarni to'xtatgan?", options: ["Arablarni Yevropaga yurishdan", "Vikinglarni", "Mag'yarlarni", "Normannlarni"], correct: 0, difficulty: "hard" },
    { q: "Xingsi jangi (1231) kimlar o'rtasida?", options: ["Mo'g'ullar va Koreya", "Mo'g'ullar va Xitoy", "Mo'g'ullar va Yaponiya", "Mo'g'ullar va Vyetnam"], correct: 0, difficulty: "hard" },
    
    // Additional questions to reach 150+
    { q: "Saddam Husayn qachon qatl etilgan?", options: ["2006", "2003", "2005", "2007"], correct: 0, difficulty: "hard" },
    { q: "Saddam Husayn qanday lavozimda ishlagan?", options: ["Iroq prezidenti", "Misr prezidenti", "Suriya prezidenti", "Liviya rahbari"], correct: 0, difficulty: "medium" },
    { q: "Iroq urushi qachon boshlangan?", options: ["2003", "2001", "1991", "2005"], correct: 0, difficulty: "medium" },
    { q: "Ko'rfaz urushi (1991) sababi?", options: ["Quvayt bosqini", "Neft bahsi", "Terrorizm", "Diniy mojaro"], correct: 0, difficulty: "medium" },
    { q: "Afg'oniston urushi (1979-1989) kimlar o'rtasida?", options: ["SSSR va mujohidlar", "AQSh va Tolibon", "Britaniya va Afg'on", "SSSR va AQSh"], correct: 0, difficulty: "hard" },
    { q: "Berlin devori qachon qulagan?", options: ["1989", "1991", "1985", "1990"], correct: 0, difficulty: "easy" },
    { q: "Sovet Ittifoqi qachon parchalandi?", options: ["1991", "1989", "1993", "1985"], correct: 0, difficulty: "easy" },
    { q: "Ikkinchi jahon urushi qachon boshlangan?", options: ["1939", "1941", "1937", "1940"], correct: 0, difficulty: "easy" },
    { q: "Birinchi jahon urushi qachon boshlangan?", options: ["1914", "1912", "1916", "1918"], correct: 0, difficulty: "easy" },
    { q: "Xirosimaga atom bombasi qachon tashlangan?", options: ["1945", "1944", "1946", "1943"], correct: 0, difficulty: "medium" },
    { q: "Nagasakiga atom bombasi qachon tashlangan?", options: ["1945", "1944", "1946", "1943"], correct: 0, difficulty: "medium" },
    { q: "BMT qachon tashkil topgan?", options: ["1945", "1919", "1948", "1950"], correct: 0, difficulty: "medium" },
    { q: "NATO qachon tuzilgan?", options: ["1949", "1945", "1955", "1960"], correct: 0, difficulty: "medium" },
    { q: "Varshava shartnomasi qachon tuzilgan?", options: ["1955", "1949", "1960", "1950"], correct: 0, difficulty: "medium" },
    { q: "Kuba inqirozi (1962) nima bilan bog'liq?", options: ["SSSR raketalari", "AQSH raketalari", "Fidel Kastro", "Che Gevara"], correct: 0, difficulty: "hard" },
    { q: "Vyetnam urushi qachon tugagan?", options: ["1975", "1973", "1968", "1970"], correct: 0, difficulty: "medium" },
    { q: "Qizil maydon qayerda joylashgan?", options: ["Moskva", "Kiyev", "Minsk", "Sankt-Peterburg"], correct: 0, difficulty: "easy" },
    { q: "Oq uy qayerda joylashgan?", options: ["Vashington", "Nyu-York", "Los-Anjeles", "Chikago"], correct: 0, difficulty: "easy" },
    { q: "Eiffel minorasi qayerda?", options: ["Parij", "London", "Rim", "Berlin"], correct: 0, difficulty: "easy" },
    { q: "Quddus qaysi davlatlarda muqaddas?", options: ["Uchala dinda", "Faqat islomda", "Faqat yahudiylikda", "Faqat xristianlikda"], correct: 0, difficulty: "medium" },
    { q: "Mekka qayerda joylashgan?", options: ["Saudiya Arabistoni", "Misr", "Iroq", "Suriya"], correct: 0, difficulty: "easy" },
    { q: "Madina qayerda joylashgan?", options: ["Saudiya Arabistoni", "Misr", "Iroq", "Suriya"], correct: 0, difficulty: "easy" },
    { q: "Bayt-ul-Muqaddas qayerda?", options: ["Quddus", "Damashq", "Qohira", "Bag'dod"], correct: 0, difficulty: "medium" },
    { q: "Amir Temur qachon tug'ilgan?", options: ["1336", "1370", "1405", "1320"], correct: 0, difficulty: "medium" },
    { q: "Amir Temur qachon vafot etgan?", options: ["1405", "1370", "1399", "1410"], correct: 0, difficulty: "medium" },
    { q: "Bobur qachon tug'ilgan?", options: ["1483", "1494", "1500", "1470"], correct: 0, difficulty: "medium" },
    { q: "Bobur qachon vafot etgan?", options: ["1530", "1526", "1540", "1510"], correct: 0, difficulty: "medium" },
    { q: "Jaloliddin Manguberdi qachon vafot etgan?", options: ["1231", "1220", "1240", "1218"], correct: 0, difficulty: "hard" },
    { q: "Chingizxon qachon tug'ilgan?", options: ["1162", "1206", "1155", "1180"], correct: 0, difficulty: "hard" },
    { q: "Chingizxon qachon vafot etgan?", options: ["1227", "1219", "1234", "1215"], correct: 0, difficulty: "hard" },
    { q: "Buyuk Ipak yo'li qaysi asrlarda gullagan?", options: ["Milodiy 1-15 asrlar", "Miloddan avvalgi", "16-19 asrlar", "20-asr"], correct: 0, difficulty: "medium" },
    { q: "Xorazmshohlar davlati qachon tugatilgan?", options: ["1231", "1220", "1240", "1218"], correct: 0, difficulty: "hard" },
    { q: "Sohibqiron unvoni kimga berilgan?", options: ["Amir Temur", "Chingizxon", "Bobur", "Jaloliddin"], correct: 0, difficulty: "easy" },
    { q: "Amir Temur necha yil yashagan?", options: ["69", "70", "65", "75"], correct: 0, difficulty: "medium" },
    { q: "Bobur qayerda vafot etgan?", options: ["Agra", "Qobul", "Samarqand", "Dehli"], correct: 1, difficulty: "hard" },
    { q: "Bobur qayerda dafn etilgan?", options: ["Qobul", "Agra", "Samarqand", "Dehli"], correct: 0, difficulty: "hard" },
    { q: "Temuriylar sulolasi asoschisi?", options: ["Amir Temur", "Shohruh", "Mironshoh", "Xalil Sulton"], correct: 0, difficulty: "easy" },
    { q: "Boburiylar sulolasi asoschisi?", options: ["Bobur", "Humoyun", "Akbar", "Jahongir"], correct: 0, difficulty: "easy" },
    { q: "Usmonlilar sulolasi asoschisi?", options: ["Usmon I", "Boyazid", "Murod I", "Mehmed II"], correct: 0, difficulty: "medium" },
    { q: "Fotih Sulton Mehmed qaysi shaharni bosib olgan?", options: ["Konstantinopol", "Rim", "Vena", "Bag'dod"], correct: 0, difficulty: "medium" },
    { q: "Konstantinopol qachon bosib olingan?", options: ["1453", "1461", "1444", "1470"], correct: 0, difficulty: "medium" },
    { q: "Ispaniya mustamlakachiligi qaysi qit'ada kuchli bo'lgan?", options: ["Amerika", "Afrika", "Osiyo", "Avstraliya"], correct: 0, difficulty: "medium" },
    { q: "Portugaliya mustamlakachiligi qayerda bo'lgan?", options: ["Braziliya", "Hindiston", "Indoneziya", "Filippin"], correct: 0, difficulty: "medium" },
    { q: "Britaniya mustamlakachiligi qayerda bo'lgan?", options: ["Hindiston", "Indoneziya", "Filippin", "Vyetnam"], correct: 0, difficulty: "medium" },
    { q: "Fransiya mustamlakachiligi qayerda bo'lgan?", options: ["Vyetnam", "Hindiston", "Indoneziya", "Filippin"], correct: 0, difficulty: "medium" },
    { q: "Gollandiya mustamlakachiligi qayerda bo'lgan?", options: ["Indoneziya", "Hindiston", "Filippin", "Vyetnam"], correct: 0, difficulty: "medium" },
    { q: "Filippin qaysi davlat mustamlakasi bo'lgan?", options: ["Ispaniya", "Portugaliya", "Gollandiya", "Britaniya"], correct: 0, difficulty: "hard" },
    { q: "Indoneziya qaysi davlat mustamlakasi bo'lgan?", options: ["Gollandiya", "Portugaliya", "Ispaniya", "Britaniya"], correct: 0, difficulty: "hard" },
    { q: "Hindiston qaysi davlat mustamlakasi bo'lgan?", options: ["Britaniya", "Fransiya", "Portugaliya", "Gollandiya"], correct: 0, difficulty: "easy" }
];

// Question management
let customQuestions = [];
let usedQuestions = [];

// Load custom questions from localStorage
function loadCustomQuestions() {
    const saved = localStorage.getItem('customQuestions');
    if (saved) {
        customQuestions = JSON.parse(saved);
    }
}

// Save custom questions to localStorage
function saveCustomQuestions() {
    localStorage.setItem('customQuestions', JSON.stringify(customQuestions));
}

// Get all questions (base + custom)
function getAllQuestions() {
    return [...BASE_QUESTIONS, ...customQuestions];
}

// Get question by difficulty
function getQuestionsByDifficulty(difficulty) {
    return getAllQuestions().filter(q => q.difficulty === difficulty);
}

// Get random question based on difficulty
function getRandomQuestion(difficulty = 'medium') {
    const questions = getQuestionsByDifficulty(difficulty);
    if (questions.length === 0) return null;
    
    // Filter out recently used questions
    const availableQuestions = questions.filter(q => !usedQuestions.includes(q));
    let question;
    
    if (availableQuestions.length > 0) {
        question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    } else {
        // If all questions used, reset used questions
        usedQuestions = [];
        question = questions[Math.floor(Math.random() * questions.length)];
    }
    
    // Add to used questions
    usedQuestions.push(question);
    if (usedQuestions.length > 20) {
        usedQuestions.shift(); // Keep only last 20
    }
    
    return question;
}

// Initialize
loadCustomQuestions();