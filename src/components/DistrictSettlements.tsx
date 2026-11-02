import { useState } from "react";
import {
  MapPin,
  ArrowUpRight,
  Navigation,
  CheckCircle2,
  Flame,
  Search,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

export interface LocalizedSettlement {
  id: string;
  code: string;
  category: "all" | "city-town" | "village" | "historic";
  name: { kz: string; ru: string; en: string };
  status: { kz: string; ru: string; en: string };
  distance: { kz: string; ru: string; en: string };
  badge: { kz: string; ru: string; en: string };
  desc: { kz: string; ru: string; en: string };
  highlights: { kz: string[]; ru: string[]; en: string[] };
  searchQuery: string;
}

const settlementsData: LocalizedSettlement[] = [
  {
    id: "kulsary",
    code: "QLS",
    category: "city-town",
    name: { kz: "Құлсары", ru: "Кульсары", en: "Kulsary" },
    status: {
      kz: "Аудан орталығы · Бас қала",
      ru: "Районный центр · Столица",
      en: "District Center · Capital City",
    },
    distance: {
      kz: "0 км · Бас орталық",
      ru: "0 км · Главный центр",
      en: "0 km · Primary Center",
    },
    badge: {
      kz: "МҰНАЙЛЫ ӨЛКЕ АСТАНАСЫ",
      ru: "СТОЛИЦА НЕФТЯНОГО КРАЯ",
      en: "CAPITAL OF THE OIL REGION",
    },
    desc: {
      kz: "Жылыой ауданының бас әкімшілік, өндірістік, экономикалық және мәдени орталығы. Әлемдік Теңіз кен орнының басты қақпасы.",
      ru: "Административный, промышленный и культурный центр Жылыойского района. Главные ворота гигантского месторождения Тенгиз.",
      en: "Administrative, industrial, and cultural center of Zhylyoi district. The main gateway to the supergiant Tengiz oilfield.",
    },
    highlights: {
      kz: ["66 000+ тұрғын", "Мақат–Бейнеу теміржолы", "Қамыскөл көлі & Арбат"],
      ru: ["66 000+ жителей", "Ж/д линия Макат-Бейнеу", "Озеро Камысколь и Арбат"],
      en: ["66,000+ residents", "Makat–Beyneu railway", "Lake Kamyskol & Arbat"],
    },
    searchQuery: "Құлсары, Атырау облысы",
  },
  {
    id: "zhana-karaton",
    code: "QRT",
    category: "city-town",
    name: { kz: "Жаңа Қаратон", ru: "Жана Каратон", en: "Zhana Karaton" },
    status: {
      kz: "Кент (Посёлок)",
      ru: "Посёлок",
      en: "Township",
    },
    distance: {
      kz: "Құлсары іргесінде (5 км)",
      ru: "Пригород Кульсары (5 км)",
      en: "Kulsary Suburb (5 km)",
    },
    badge: {
      kz: "МҰНАЙШЫЛАР КЕНТІ",
      ru: "ПОСЁЛОК НЕФТЯНИКОВ",
      en: "OIL WORKERS TOWNSHIP",
    },
    desc: {
      kz: "Құлсары қаласымен тығыз интеграцияланған заманауи кент. Мұнай-газ саласы мамандары мен жаңа тұрғын үй массивтері орналасқан.",
      ru: "Современный посёлок, тесно связанный с Кульсары. Здесь проживают работники нефтегазовой сферы и расположены новые жилые массивы.",
      en: "A modern township closely connected to Kulsary, housing oil and gas industry specialists and new residential sectors.",
    },
    highlights: {
      kz: ["~7 000 тұрғын", "Дамыған инфрақұрылым", "Спорт және білім кешендері"],
      ru: ["~7 000 жителей", "Развитая инфраструктура", "Спортивные и учебные комплексы"],
      en: ["~7,000 residents", "Developed infrastructure", "Sports & educational centers"],
    },
    searchQuery: "Жаңа Қаратон, Жылыой ауданы",
  },
  {
    id: "koschagyl",
    code: "QSH",
    category: "city-town",
    name: { kz: "Қосшағыл", ru: "Косчагил", en: "Koschagyl" },
    status: {
      kz: "Кент (Посёлок)",
      ru: "Посёлок",
      en: "Township",
    },
    distance: {
      kz: "Құлсарыдан 35 км",
      ru: "35 км от Кульсары",
      en: "35 km from Kulsary",
    },
    badge: {
      kz: "ТАРИХИ МҰНАЙ БЕСІГІ",
      ru: "ИСТОРИЧЕСКАЯ КОЛЫБЕЛЬ НЕФТИ",
      en: "HISTORIC CRADLE OF OIL",
    },
    desc: {
      kz: "Қазақстанның мұнай өнеркәсібі тарихындағы алтын белес. 1930 жылдардан бастап алғашқы мұнай өндірісі қарқынды дамыған тарихи орталық.",
      ru: "Знаковый исторический центр нефтедобычи в Казахстане с 1930-х годов с богатыми трудовыми традициями нефтяников.",
      en: "An iconic historical cradle of Kazakhstan's oil industry since the 1930s with deep oilfield heritage.",
    },
    highlights: {
      kz: ["Тарихи мұнай промыслы", "Мұнайшылар әулеті", "Жылыойдың көне бекеті"],
      ru: ["Исторический промысел", "Династии нефтяников", "Старейшая станция"],
      en: ["Historic oilfield", "Generations of oilmen", "Longstanding station"],
    },
    searchQuery: "Қосшағыл, Жылыой ауданы",
  },
  {
    id: "akkiiztogai",
    code: "AKT",
    category: "village",
    name: { kz: "Ақкиізтоғай", ru: "Аккиизтогай", en: "Akkiiztogai" },
    status: {
      kz: "Ауылдық округ",
      ru: "Сельский округ",
      en: "Rural District",
    },
    distance: {
      kz: "Құлсарыдан 45 км",
      ru: "45 км от Кульсары",
      en: "45 km from Kulsary",
    },
    badge: {
      kz: "РУХАНИ КИЕЛІ МЕКЕН",
      ru: "ДУХОВНОЕ СВЯЩЕННОЕ МЕСТО",
      en: "SPIRITUAL SACRED LAND",
    },
    desc: {
      kz: "Жем өзенінің бойындағы рухани бай өлке. Бекет атаның әйгілі Ақмешіт жерасты мешіті мен тарихи қорымына апаратын киелі бағыт осы ауылдан басталады.",
      ru: "Живописный край вдоль реки Эмба. Отсюда начинается путь к знаменитой подземной мечети и некрополю Бекет-ата (Акмешит).",
      en: "Scenic land along the Zhem river. Starting point of the pilgrimage route to the sacred underground mosque Akmeshyt of Beket-ata.",
    },
    highlights: {
      kz: ["Ақмешіт / Бекет ата қорымы", "Жем өзені бойы", "Этнотуризм орталығы"],
      ru: ["Некрополь Акмешит", "Пойма реки Эмба", "Этнотуризм"],
      en: ["Akmeshyt / Beket-ata", "Zhem riverbanks", "Ethno-tourism"],
    },
    searchQuery: "Ақкиізтоғай, Жылыой ауданы",
  },
  {
    id: "turgyzba",
    code: "TRG",
    category: "village",
    name: { kz: "Тұрғызба", ru: "Тургызба", en: "Turgyzba" },
    status: {
      kz: "Ауылдық округ (Қараша)",
      ru: "Сельский округ (Караша)",
      en: "Rural District (Karasha)",
    },
    distance: {
      kz: "Құлсарыдан 30 км",
      ru: "30 км от Кульсары",
      en: "30 km from Kulsary",
    },
    badge: {
      kz: "ШАРУАШЫЛЫҚ ЖӘНЕ БІЛІМ",
      ru: "АГРАРНЫЙ И КУЛЬТУРНЫЙ КРАЙ",
      en: "AGRICULTURAL & CULTURAL HUB",
    },
    desc: {
      kz: "Қараша ауылдық округінің орталығы. Ауыл шаруашылығы, дәстүрлі төрт түлік мал бағу және бау-бақша кәсібі қалыптасқан берекелі ауыл.",
      ru: "Центр Карашаского сельского округа. Развито животноводство, земледелие и садоводство в пойме реки.",
      en: "Center of the Karasha rural district. Known for traditional pastoral livestock, agriculture, and community spirit.",
    },
    highlights: {
      kz: ["Ауыл шаруашылығы", "Мәдениет үйі & мектеп", "Жем жайылмасы"],
      ru: ["Сельское хозяйство", "Дом культуры и школа", "Пойма реки Эмба"],
      en: ["Farming & livestock", "Community center", "River meadows"],
    },
    searchQuery: "Тұрғызба, Жылыой ауданы",
  },
  {
    id: "shokpartogai",
    code: "SHQ",
    category: "village",
    name: { kz: "Шоқпартоғай", ru: "Шокпартогай", en: "Shokpartogai" },
    status: {
      kz: "Ауылдық округ",
      ru: "Сельский округ",
      en: "Rural District",
    },
    distance: {
      kz: "Құлсарыдан 25 км",
      ru: "25 км от Кульсары",
      en: "25 km from Kulsary",
    },
    badge: {
      kz: "ЖАСЫЛ ЖЕЛЕКТІ ӨЛКЕ",
      ru: "ЗЕЛЁНЫЙ ОАЗИС У РЕКИ",
      en: "GREEN RIVER OASIS",
    },
    desc: {
      kz: "Жем өзенінің жағалауындағы табиғаты жайлы, тоғайлы әсем елді мекен. Өзен бойындағы егін, мал шаруашылығы мен демалыс орындарымен танымал.",
      ru: "Зелёный оазис у реки Эмба с рощами, развитым скотоводством и местами отдыха на природе.",
      en: "A green riverside village on the Zhem river with wooded groves, farming, and recreation spots.",
    },
    highlights: {
      kz: ["Жем тоғайлары", "Мал және егін кәсібі", "Қоғамдық бірлік"],
      ru: ["Рощи реки Эмба", "Животноводство", "Сплочённое сообщество"],
      en: ["Riverside woods", "Pasture & agriculture", "Close community"],
    },
    searchQuery: "Шоқпартоғай, Жылыой ауданы",
  },
  {
    id: "maikomgen",
    code: "MYK",
    category: "village",
    name: { kz: "Майкөмген", ru: "Майкомген", en: "Maikomgen" },
    status: {
      kz: "Ауылдық округ",
      ru: "Сельский округ",
      en: "Rural District",
    },
    distance: {
      kz: "Құлсарыдан 55 км",
      ru: "55 км от Кульсары",
      en: "55 km from Kulsary",
    },
    badge: {
      kz: "ТЕМІРЖОЛ & ДАЛА ӨРКЕНИЕТІ",
      ru: "Ж/Д УЗЕЛ И СТЕПНЫЕ ПРОСТОРЫ",
      en: "RAILWAY & STEPPE EXPANSE",
    },
    desc: {
      kz: "Майкөмген ауылдық округінің орталығы. Мақат–Бейнеу теміржолының бойында орналасқан, кең байтақ мал жайылымы түйіскен өңір.",
      ru: "Центр Майкомгенского сельского округа. Железнодорожная станция линии Макат–Бейнеу и обширные степные пастбища.",
      en: "Center of the Maikomgen rural district, connected by the Makat–Beyneu railway amidst vast pastures.",
    },
    highlights: {
      kz: ["Теміржол бекеті", "Төрт түлік мал өсіру", "Далалық ландшафт"],
      ru: ["Ж/д станция", "Традиционное скотоводство", "Степные пейзажи"],
      en: ["Railway station", "Pastoral herds", "Vast steppes"],
    },
    searchQuery: "Майкөмген, Жылыой ауданы",
  },
  {
    id: "karagay",
    code: "QRG",
    category: "village",
    name: { kz: "Қарағай", ru: "Карагай", en: "Karagai" },
    status: {
      kz: "Ауылдық мекен",
      ru: "Сельское поселение",
      en: "Rural Settlement",
    },
    distance: {
      kz: "Құлсары маңы",
      ru: "Близ Кульсары",
      en: "Near Kulsary",
    },
    badge: {
      kz: "ҚАЛА МАҢЫНДАҒЫ ҚОНЫС",
      ru: "ПРИГОРОДНОЕ ПОСЕЛЕНИЕ",
      en: "SUBURBAN SETTLEMENT",
    },
    desc: {
      kz: "Құлсары қаласымен шектесетін жайлы ауылдық мекен. Тұрғындар негізінен қала өндірісінде және қосалқы шаруашылықта еңбек етеді.",
      ru: "Спокойное поселение, граничащее с городом Кульсары, жители которого заняты на городских предприятиях.",
      en: "A quiet residential settlement bordering Kulsary with quick access to the city center.",
    },
    highlights: {
      kz: ["Қалаға жақындық", "Қосалқы шаруашылық", "Тыныш ауыл тіршілігі"],
      ru: ["Близость к городу", "Подсобное хозяйство", "Тихая жизнь"],
      en: ["Proximity to city", "Homesteads", "Peaceful lifestyle"],
    },
    searchQuery: "Қарағай, Жылыой ауданы",
  },
  {
    id: "karasha",
    code: "QRA",
    category: "village",
    name: { kz: "Қараша", ru: "Караша", en: "Karasha" },
    status: {
      kz: "Ауылдық қоныс",
      ru: "Сельское поселение",
      en: "Rural Settlement",
    },
    distance: {
      kz: "Құлсарыдан 32 км",
      ru: "32 км от Кульсары",
      en: "32 km from Kulsary",
    },
    badge: {
      kz: "ТАРИХИ ЖЕМ САНЫ",
      ru: "ИСТОРИЧЕСКИЙ БЕРЕГ ЭМБЫ",
      en: "HISTORIC ZHEM SHORE",
    },
    desc: {
      kz: "Жем өзені бойындағы байырғы қоныс. Дәстүрлі қазақы тұрмыс пен шежірелі тарихтың көрінісі.",
      ru: "Старинное урочище у реки Эмба, хранящее вековые традиции кочевого скотоводства и историю края.",
      en: "An ancient settlement along the Zhem river preserving centuries of nomadic traditions.",
    },
    highlights: {
      kz: ["Көне қоныс орны", "Жем су алабы", "Дәстүрлі тұрмыс"],
      ru: ["Историческое урочище", "Бассейн реки Эмба", "Традиции"],
      en: ["Historic grounds", "River basin", "Heritage"],
    },
    searchQuery: "Қараша, Жылыой ауданы",
  },
  {
    id: "koysary",
    code: "QYS",
    category: "village",
    name: { kz: "Қойсары", ru: "Койсары", en: "Koysary" },
    status: {
      kz: "Ауылдық елді мекен",
      ru: "Сельское поселение",
      en: "Rural Settlement",
    },
    distance: {
      kz: "Аудан аумағында",
      ru: "Территория района",
      en: "District Territory",
    },
    badge: {
      kz: "ТАБИҒИ ЖАЙЫЛЫМ",
      ru: "СТЕПНЫЕ ПАСТБИЩА",
      en: "NATURAL PASTURES",
    },
    desc: {
      kz: "Жылыой даласындағы тарихи атаулы мекен. Жергілікті мал шаруашылығы мен жайылымдық алқаптар орталығы.",
      ru: "Традиционное степное поселение Жылыойского района, ориентированное на отгонное животноводство.",
      en: "Traditional rural pastoral settlement in the Zhylyoi steppes centered around livestock breeding.",
    },
    highlights: {
      kz: ["Мал шаруашылығы", "Кең жайылымдар", "Табиғи орта"],
      ru: ["Животноводство", "Пастбища", "Природные просторы"],
      en: ["Livestock husbandry", "Open pastures", "Pristine nature"],
    },
    searchQuery: "Қойсары, Жылыой ауданы",
  },
  {
    id: "sarykamys",
    code: "SRQ",
    category: "historic",
    name: { kz: "Сарықамыс", ru: "Сарыкамыс", en: "Sarykamys" },
    status: {
      kz: "Тарихи кент (Көшірілген)",
      ru: "Исторический посёлок (Переселён)",
      en: "Historical Town (Relocated)",
    },
    distance: {
      kz: "Теңіз кені маңы (Тарихи)",
      ru: "У Тенгиза (Историч.)",
      en: "Near Tengiz (Historic)",
    },
    badge: {
      kz: "ЕСТЕЛІК & ТАРИХИ БЕЛЕС",
      ru: "ПАМЯТЬ И ИСТОРИЧЕСКИЙ РУБЕЖ",
      en: "MEMORY & HISTORIC MILESTONE",
    },
    desc: {
      kz: "Теңіз кен орнының экологиялық қауіпсіздік аймағында болғандықтан, ҚР Үкіметінің қаулысымен тұрғындары Құлсары мен Жаңа Қаратонға көшірілген атақты тарихи кент. Жылыойлықтардың жадында мәңгі сақталған мекен.",
      ru: "Знаменитый посёлок близ Тенгиза, жители которого по решению Правительства РК были переселены в Кульсары и Жана Каратон. Навсегда сохранён в памяти жителей района.",
      en: "Famous historic town near the Tengiz oilfield whose residents were relocated to Kulsary and Zhana Karaton under a government program. Cherished in the memories of Zhylyoi people.",
    },
    highlights: {
      kz: ["Теңіз тарихының бастауы", "Жерлестердің ыстық естелігі", "Экологиялық тарихи шешім"],
      ru: ["Истоки освоения Тенгиза", "Тёплая память земляков", "Историческое решение"],
      en: ["Early Tengiz development", "Fond community memories", "Milestone decision"],
    },
    searchQuery: "Сарықамыс, Атырау облысы",
  },
];

export function DistrictSettlements() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "city-town" | "village" | "historic">("all");
  const [search, setSearch] = useState("");

  const filtered = settlementsData.filter((item) => {
    const matchesTab = activeTab === "all" || item.category === activeTab;
    const currentName = item.name[lang] || item.name.kz;
    const currentBadge = item.badge[lang] || item.badge.kz;
    const matchesSearch =
      currentName.toLowerCase().includes(search.toLowerCase()) ||
      item.name.kz.toLowerCase().includes(search.toLowerCase()) ||
      item.name.ru.toLowerCase().includes(search.toLowerCase()) ||
      item.name.en.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      currentBadge.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section className="settlements-section section-padding" id="settlements" aria-labelledby="settlements-title">
      <div className="page-container">
        <div data-reveal>
          <div className="section-label">
            <span>{t.settlements.sectionNum}</span>
            <span className="section-label-rule" aria-hidden="true" />
            <span>{t.settlements.sectionLabel}</span>
          </div>

          <div className="section-heading-grid">
            <h2 id="settlements-title" className="section-title">
              {t.settlements.title} <em>{t.settlements.titleEm}</em>
            </h2>
            <p className="section-intro">{t.settlements.intro}</p>
          </div>
        </div>

        {/* Territory Status Overview Bar */}
        <div className="district-summary-bar" data-reveal>
          <div className="district-stat">
            <strong>1</strong>
            <span>{t.settlements.summary.city}</span>
          </div>
          <div className="district-stat-sep" />
          <div className="district-stat">
            <strong>2</strong>
            <span>{t.settlements.summary.towns}</span>
          </div>
          <div className="district-stat-sep" />
          <div className="district-stat">
            <strong>7</strong>
            <span>{t.settlements.summary.villages}</span>
          </div>
          <div className="district-stat-sep" />
          <div className="district-stat">
            <strong>1</strong>
            <span>{t.settlements.summary.historic}</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="settlements-controls" data-reveal>
          <div className="settlements-tabs">
            <button
              type="button"
              className={`settlement-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              {t.settlements.tabs.all}
            </button>
            <button
              type="button"
              className={`settlement-tab ${activeTab === "city-town" ? "active" : ""}`}
              onClick={() => setActiveTab("city-town")}
            >
              {t.settlements.tabs.cityTown}
            </button>
            <button
              type="button"
              className={`settlement-tab ${activeTab === "village" ? "active" : ""}`}
              onClick={() => setActiveTab("village")}
            >
              {t.settlements.tabs.village}
            </button>
            <button
              type="button"
              className={`settlement-tab ${activeTab === "historic" ? "active" : ""}`}
              onClick={() => setActiveTab("historic")}
            >
              {t.settlements.tabs.historic}
            </button>
          </div>

          <div className="settlements-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t.settlements.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label={t.settlements.searchPlaceholder}
            />
          </div>
        </div>

        {/* State-style Grid */}
        <div className="settlements-grid" data-reveal>
          {filtered.map((item) => (
            <div className={`settlement-card ${item.id === "kulsary" ? "settlement-card-capital" : ""}`} key={item.id}>
              {/* Top State Header */}
              <div className="settlement-card-header">
                <div className="settlement-code-box">
                  <span className="settlement-code">{item.code}</span>
                  <span className="settlement-region">KZ · 06 · ZHYLYOI</span>
                </div>
                <div className="settlement-status-badge">
                  {item.id === "kulsary" && <Flame size={13} className="text-amber-400" />}
                  <span>{item.status[lang]}</span>
                </div>
              </div>

              {/* Names & Distance */}
              <div className="settlement-names">
                <div className="settlement-title-row">
                  <h3>{item.name[lang]}</h3>
                  {lang !== "ru" && <small className="settlement-ru">{item.name.ru}</small>}
                  {lang === "ru" && <small className="settlement-ru">{item.name.kz}</small>}
                </div>
                <div className="settlement-distance">
                  <Navigation size={13} />
                  <span>{item.distance[lang]}</span>
                </div>
              </div>

              {/* Badge & Description */}
              <div className="settlement-badge-pill">{item.badge[lang]}</div>
              <p className="settlement-desc">{item.desc[lang]}</p>

              {/* Highlights */}
              <div className="settlement-highlights">
                {item.highlights[lang].map((h, idx) => (
                  <span className="settlement-tag" key={idx}>
                    <CheckCircle2 size={12} /> {h}
                  </span>
                ))}
              </div>

              {/* Bottom Action */}
              <div className="settlement-footer">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.searchQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="settlement-map-btn"
                >
                  <MapPin size={14} />
                  <span>{t.settlements.openMapBtn}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
