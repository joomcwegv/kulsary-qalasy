import { useState } from "react";
import {
  Flame,
  Briefcase,
  Building,
  GraduationCap,
  HardHat,
  Truck,
  FileText,
  Search,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Coins,
  CheckCircle2,
  Clock,
  Layers,
  HeartHandshake,
  School,
  Baby,
  PhoneCall,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

// --- Data Types ---
interface OilOperator {
  id: string;
  name: string;
  role: { kz: string; ru: string; en: string };
  badge: { kz: string; ru: string; en: string };
  desc: { kz: string; ru: string; en: string };
  workforce: string;
  careerLink: string;
  fields: string[];
  logo: string;
  bgImage: string;
  accentColor: string;
}

interface CampLocation {
  name: { kz: string; ru: string; en: string };
  type: { kz: string; ru: string; en: string };
  capacity: string;
  location: { kz: string; ru: string; en: string };
  desc: { kz: string; ru: string; en: string };
}

interface TenderProject {
  id: string;
  title: { kz: string; ru: string; en: string };
  contractor: string;
  type: "road" | "dike" | "lighting" | "social";
  budget: string;
  status: { kz: string; ru: string; en: string };
  statusCode: "in-progress" | "completed" | "planned";
  year: string;
  location: { kz: string; ru: string; en: string };
  portalLink: string;
}

interface SchoolItem {
  id: string;
  name: { kz: string; ru: string; en: string };
  type: { kz: string; ru: string; en: string };
  address: { kz: string; ru: string; en: string };
  phone: string;
  link: string;
  founded: string;
  logo?: string;
  color?: string;
  image: string;
}

interface KindergartenItem {
  name: { kz: string; ru: string; en: string };
  address: { kz: string; ru: string; en: string };
  capacity: string;
  queueLink: string;
  logo?: string;
  color?: string;
  image: string;
}

// --- 1. Oil & Gas Hub Data ---
const oilOperators: OilOperator[] = [
  {
    id: "tco",
    name: "Тенгизшевройл (TCO)",
    role: {
      kz: "Теңіз және Королев кен орындарының бас операторы",
      ru: "Генеральный оператор месторождений Тенгиз и Королевское",
      en: "Primary operator of the Tengiz and Korolev supergiant fields",
    },
    badge: {
      kz: "ӘЛЕМДІК МҰНАЙ АЛЫБЫ",
      ru: "МИРОВОЙ ГИГАНТ",
      en: "GLOBAL ENERGY LEADER",
    },
    desc: {
      kz: "Қазақстанның ең ірі мұнай өндіруші кәсіпорны. Келешекте кеңейту және Ұңғыма ернеуінің қысымын басқару (КҚЖ-ҰЕҚБЖ / FGP-WPMP) тарихи мегажобасын іске асырушы.",
      ru: "Крупнейшее нефтедобывающее предприятие РК. Реализатор исторического мегапроекта Проекта будущего расширения (ПБР-ПУУД).",
      en: "Kazakhstan's largest petroleum enterprise. Operator of the Future Growth & Wellhead Pressure Management Project (FGP-WPMP).",
    },
    workforce: "40 000+ маман",
    careerLink: "https://tengizchevroil.com/careers",
    fields: ["Теңіз кені", "Королев кені", "ТШО Зауыты"],
    logo: "/images/logo-tco.svg",
    bgImage: "/images/bg-tco.jpg",
    accentColor: "#0ea5e9",
  },
  {
    id: "embamunaygas",
    name: "Ембімұнайгаз / ҚМГ",
    role: {
      kz: "«Жылыоймұнайгаз» мұнай-газ өндіру басқармасы",
      ru: "НГДУ «Жылыоймунайгаз» / АО «Эмбамунайгаз»",
      en: "Zhylyoimunaygas NGDU / Embamunaygas (KMG)",
    },
    badge: {
      kz: "ҰЛТТЫҚ ТАРИХИ МҰРА",
      ru: "НАЦИОНАЛЬНОЕ НАСЛЕДИЕ",
      en: "NATIONAL HISTORIC CORE",
    },
    desc: {
      kz: "Құлсары, Қосшағыл және Айранкөл маңындағы дәстүрлі кен орындарын игеруші ұлттық алтын бесік. Жүздеген отбасылардың әулеттік жұмыс орны.",
      ru: "Национальная компания, разрабатывающая коренные месторождения вокруг Кульсары, Косчагила и Айранколя.",
      en: "National company operating longstanding oilfields around Kulsary, Koschagyl, and Ayrankol with multi-generational workers.",
    },
    workforce: "5 000+ қызметкер",
    careerLink: "https://emba.kmg.kz/kaz/career/",
    fields: ["Құлсары кені", "Қосшағыл", "Айранкөл", "Прорва"],
    logo: "/images/logo-emba.svg",
    bgImage: "/images/bg-emba.jpg",
    accentColor: "#ef4444",
  },
  {
    id: "senimdi",
    name: "Senimdi Kurylys & ССКМ",
    role: {
      kz: "Бас құрылыс-монтаждау және инжиниринг консорциумы",
      ru: "Генеральный строительно-монтажный консорциум на Тенгизе",
      en: "Major EPC construction & engineering contractor at Tengiz",
    },
    badge: {
      kz: "НЕГІЗГІ ЖҰМЫС БЕРУШІ",
      ru: "КЛЮЧЕВОЙ РАБОТОДАТЕЛЬ",
      en: "MAJOR EMPLOYER",
    },
    desc: {
      kz: "Теңіз зауыттарын салу, құбыр желілері мен модульдік құрастыру саласындағы алып мердігер. Жергілікті мамандарды ең көп тартатын компания.",
      ru: "Ведущий подрядчик в строительстве объектов Тенгизского завода, трубопроводов и монтажа сверхтяжелых модулей.",
      en: "Key contractor in refinery construction, high-pressure pipelines, and super-heavy industrial module logistics.",
    },
    workforce: "12 000+ маман",
    careerLink: "https://senimdi.kz/careers/",
    fields: ["ТШО Зауыты", "3-ші Буын Зауыты (3БЗ)", "Вахталық қалашықтар"],
    logo: "/images/logo-senimdi.svg",
    bgImage: "/images/bg-senimdi.jpg",
    accentColor: "#f59e0b",
  },
  {
    id: "gate-inshaat",
    name: "Gate Inshaat & Denholm Zholdas",
    role: {
      kz: "Мұнай-сервистік, өндірістік жөндеу және техникалық қызмет",
      ru: "Нефтесервис, пусконаладка и технологическое обслуживание",
      en: "Oilfield services, commissioning & engineering support",
    },
    badge: {
      kz: "СЕРВИС ЖӘНЕ ИНЖИНИРИНГ",
      ru: "СЕРВИС И ИНЖИНИРИНГ",
      en: "SERVICES & COMMISSIONING",
    },
    desc: {
      kz: "Күрделі құрылғыларды іске қосу, клапандар мен құбырларды тексеру, вахталық қызмет көрсету бойынша мамандандырылған беделді компаниялар.",
      ru: "Специализированные компании по пусконаладке оборудования, сервису клапанов, энергетике и промышленным стандартам.",
      en: "Specialized service enterprises providing plant commissioning, high-tech valve testing, and technical operations.",
    },
    workforce: "6 000+ маман",
    careerLink: "https://denholm-zholdas.kz/vacancies",
    fields: ["Теңіз кешені", "Құлсары базалары"],
    logo: "/images/logo-gate.svg",
    bgImage: "/images/bg-gate.jpg",
    accentColor: "#06b6d4",
  },
];

const camps: CampLocation[] = [
  {
    name: { kz: "«Шаңырақ» вахталық қалашығы", ru: "Вахтовый посёлок «Шанырак»", en: "Shanyrak Camp" },
    type: { kz: "Бас халықаралық кампус", ru: "Центральный вахтовый городок", en: "Central Residential Complex" },
    capacity: "10 000+ орын",
    location: { kz: "Теңіз кен орны (Құлсарыдан 120 км)", ru: "Месторождение Тенгиз (120 км от Кульсары)", en: "Tengiz Field (120 km from Kulsary)" },
    desc: {
      kz: "Спорт кешендері, медициналық орталықтары, асханалары мен қонақүй деңгейіндегі жатақханалары бар әлемдік деңгейдегі заманауи вахталық мега-қалашық.",
      ru: "Флагманский вахтовый городок международного уровня со спортивными комплексами, медцентрами и автономной инфраструктурой.",
      en: "State-of-the-art residential camp equipped with international standard sports facilities, clinics, and full living amenities.",
    },
  },
  {
    name: { kz: "ТКК (Tengiz Camp / Новая Деревня)", ru: "ТКК (Вахтовый комплекс TCO)", en: "TCC Residential Village" },
    type: { kz: "Инженерлік-басқарушылық кампус", ru: "Инженерно-управленческий городок", en: "Engineering & Operations Campus" },
    capacity: "6 500+ орын",
    location: { kz: "Теңіз кені", ru: "Месторождение Тенгиз", en: "Tengiz Field" },
    desc: {
      kz: "ТШО және серіктес компаниялардың инженерлік-техникалық құрамы мен басқарушы командалары тұратын заманауи орталық.",
      ru: "Комплекс для инженерно-технического и руководящего состава ТШО и генеральных подрядчиков.",
      en: "Modern accommodation compound dedicated to engineering, managerial, and operational staff.",
    },
  },
  {
    name: { kz: "«Балапан» және СПЕ вахталық базалары", ru: "Вахтовые базы «Балапан» и СПЕ", en: "Balapan & SPE Contractor Bases" },
    type: { kz: "Құрылыс-логистикалық кампустар", ru: "Строительно-логистические базы", en: "Construction & Logistics Camps" },
    capacity: "15 000+ орын",
    location: { kz: "КҚЖ / WPMP өндірістік аумағы", ru: "Промзона ПБР / WPMP", en: "FGP / WPMP Industrial Area" },
    desc: {
      kz: "Құрылыс, дәнекерлеу, электр-монтаж және логистика мамандарына арналған мамандандырылған автономды қалашықтар кешені.",
      ru: "Комплексы для строительных, монтажных и логистических подрядчиков с круглосуточным питанием и медобслуживанием.",
      en: "Autonomous multi-contractor facilities serving construction, electrical, piping, and heavy transport workforces.",
    },
  },
];

// --- 2. Tenders & Public Infrastructure Data ---
const tenderProjects: TenderProject[] = [
  {
    id: "tnd-01",
    title: {
      kz: "Құлсары қаласындағы орталық көшелерді күрделі жөндеу және асфальттау",
      ru: "Капитальный ремонт и асфальтирование центральных улиц города Кульсары",
      en: "Capital reconstruction and asphalt paving of central Kulsary streets",
    },
    contractor: "«АтырауИнжСтрой» ЖШС (ТОО)",
    type: "road",
    budget: "1 840 000 000 ₸",
    status: { kz: "Жұмыстар қарқынды жүруде", ru: "В процессе исполнения", en: "Work in Progress" },
    statusCode: "in-progress",
    year: "2024-2025",
    location: { kz: "Махамбет даңғылы, Әбдірахманов көшесі, 4-ауыл", ru: "Проспект Махамбета, ул. Абдрахманова, 4-й аул", en: "Makhambet Ave, Abdirakhmanov St, 4th aui" },
    portalLink: "https://goszakup.gov.kz/",
  },
  {
    id: "tnd-02",
    title: {
      kz: "Жем өзені бойындағы қорғаныс бөгеттерін нығайту және жағалауды бекіту",
      ru: "Укрепление защитных дамб и берегоукрепительные работы вдоль реки Эмба (Жем)",
      en: "Fortification of flood-defense dikes and riverbank reinforcement along Zhem River",
    },
    contractor: "«Жылыой Құрылыс Сервис» ЖШС & «КазЕвроСтрой» ЖК",
    type: "dike",
    budget: "3 250 000 000 ₸",
    status: { kz: "1-ші кезең аяқталды, 2-ші кезең жүруде", ru: "1-й этап завершен, 2-й в процессе", en: "Stage 1 Completed, Stage 2 Active" },
    statusCode: "in-progress",
    year: "2024-2025",
    location: { kz: "Құлсары жағалауы, Жаңа Қаратон бағыты", ru: "Набережная Кульсары, направление Жана Каратон", en: "Kulsary shoreline, Zhana Karaton section" },
    portalLink: "https://goszakup.gov.kz/",
  },
  {
    id: "tnd-03",
    title: {
      kz: "Қала көшелері мен ықшамаудандарға заманауи LED жарық шамдарын орнату",
      ru: "Установка современного энергосберегающего LED-освещения улиц и микрорайонов",
      en: "Modern energy-efficient LED street lighting installation across microdistricts",
    },
    contractor: "«Smart City Qulsary» ЖК / «ЭнергоМонтаж» ЖШС",
    type: "lighting",
    budget: "420 000 000 ₸",
    status: { kz: "Толықтай тапсырылды", ru: "Успешно завершено", en: "Fully Completed" },
    statusCode: "completed",
    year: "2024",
    location: { kz: "1, 2, 3 ықшамаудандар, Арбат маңы", ru: "1, 2, 3 микрорайоны, район Арбата", en: "Microdistricts 1, 2, 3, Arbat area" },
    portalLink: "https://goszakup.gov.kz/",
  },
  {
    id: "tnd-04",
    title: {
      kz: "Қамыскөл көлі маңындағы жаңа балалар мен спорт алаңдарын салу",
      ru: "Строительство детских и спортивно-оздоровительных площадок у озера Камысколь",
      en: "Construction of family playgrounds and workout facilities near Lake Kamyskol",
    },
    contractor: "«Жігер Бастама» ЖШС (ТОО)",
    type: "social",
    budget: "280 000 000 ₸",
    status: { kz: "Жобалау-сметалық кезең / Конкурс", ru: "Проектирование / Конкурс", en: "Design & Tender Phase" },
    statusCode: "planned",
    year: "2025",
    location: { kz: "Қамыскөл жағалау паркі", ru: "Прибрежный парк Камысколь", en: "Lake Kamyskol Coastal Park" },
    portalLink: "https://goszakup.gov.kz/",
  },
];

// --- 3. Education & Public Services Data ---
const schoolsList: SchoolItem[] = [
  {
    id: "sch-01",
    name: { kz: "№1 орта мектеп", ru: "Средняя школа №1", en: "Secondary School #1" },
    type: { kz: "Жалпы білім беретін мектеп", ru: "Общеобразовательная школа", en: "General Education School" },
    address: { kz: "Құлсары қ., Махамбет д-лы", ru: "г. Кульсары, пр. Махамбета", en: "Kulsary, Makhambet Ave" },
    phone: "+7 (71237) 5-11-20",
    link: "https://kundelik.kz/",
    founded: "1985 ж.",
    color: "#1d4ed8",
    image: "/images/school-01.jpg",
  },
  {
    id: "sch-05",
    name: { kz: "№5 Абай атындағы орта мектеп", ru: "Школа №5 им. Абая", en: "Abay Secondary School #5" },
    type: { kz: "Тарихи байырғы мектеп", ru: "Старейшая школа города", en: "Historic Foundation School" },
    address: { kz: "Құлсары қ., 1-ауыл", ru: "г. Кульсары, 1-й аул", en: "Kulsary, 1st aui" },
    phone: "+7 (71237) 5-22-14",
    link: "https://kundelik.kz/",
    founded: "1939 ж.",
    color: "#15803d",
    image: "/images/school-05.jpg",
  },
  {
    id: "sch-daryn",
    name: { kz: "Дарынды балаларға арналған мектеп-интернат", ru: "Школа-интернат для одарённых детей", en: "Specialized Boarding School for Gifted Children" },
    type: { kz: "Үш тілді мамандандырылған мектеп", ru: "Специализированная трехъязычная школа", en: "Specialized Trilingual STEM School" },
    address: { kz: "Құлсары қ., 3-ықшамаудан", ru: "г. Кульсары, 3-й микрорайон", en: "Kulsary, 3rd microdistrict" },
    phone: "+7 (71237) 6-04-18",
    link: "https://kundelik.kz/",
    founded: "2015 ж.",
    color: "#7c3aed",
    image: "/images/school-daryn.jpg",
  },
  {
    id: "sch-college",
    name: { kz: "Сафи Өтебаев атындағы Жылыой мұнай және газ колледжі", ru: "Жылыойский нефтегазовый технологический колледж им. Сафи Утебаева", en: "Safi Utebayev Oil & Gas Technological College" },
    type: { kz: "Кәсіптік жоғары оқу орны / ТШО серіктесі", ru: "Ведущий технический колледж / Партнер ТШО", en: "Flagship Technical College & TCO Partner" },
    address: { kz: "Құлсары қ., Мұнайшылар көш., 12", ru: "г. Кульсары, ул. Мунайшылар, 12", en: "Kulsary, Munayshylar St, 12" },
    phone: "+7 (71237) 5-30-45",
    link: "https://zhmgk.kz/",
    founded: "1972 ж.",
    color: "#b45309",
    image: "/images/school-college.jpg",
  },
  {
    id: "sch-music",
    name: { kz: "Т. Құлтумиев атындағы балалар саз мектебі", ru: "Детская музыкальная школа им. Т. Култумиева", en: "T. Kultumiyev Children's Music School" },
    type: { kz: "Өнер және музыкалық тәрбие", ru: "Музыкальное и художественное образование", en: "Music & Performing Arts School" },
    address: { kz: "Құлсары қ., Орталық Арбат", ru: "г. Кульсары, Центральный Арбат", en: "Kulsary, Central Arbat" },
    phone: "+7 (71237) 5-18-90",
    link: "https://kundelik.kz/",
    founded: "1966 ж.",
    color: "#be185d",
    image: "/images/school-music.jpg",
  },
  {
    id: "sch-16",
    name: { kz: "№16 Д. Жазықбаев атындағы орта мектеп", ru: "Средняя школа №16 им. Д. Жазыкбаева", en: "D. Zhazykbayev Secondary School #16" },
    type: { kz: "Жалпы білім беретін мектеп", ru: "Общеобразовательная школа", en: "General Education School" },
    address: { kz: "Құлсары қ., 2-ықшамаудан", ru: "г. Кульсары, 2-й микрорайон", en: "Kulsary, 2nd microdistrict" },
    phone: "+7 (71237) 5-41-10",
    link: "https://kundelik.kz/",
    founded: "1988 ж.",
    color: "#0e7490",
    image: "/images/school-16.jpg",
  },
];

const kindergartens: KindergartenItem[] = [
  {
    name: { kz: "«Айгөлек» бөбекжай-бақшасы", ru: "Ясли-сад «Айголек»", en: "Aygolek Kindergarten" },
    address: { kz: "Құлсары қ., 2-ықшамаудан", ru: "г. Кульсары, 2-й микрорайон", en: "Kulsary, 2nd microdistrict" },
    capacity: "280 орын",
    queueLink: "https://indigo24.kz/",
    color: "#d97706",
    image: "/images/kg-aigolek.jpg",
  },
  {
    name: { kz: "«Айналайын» мемлекеттік балабақшасы", ru: "Государственный ясли-сад «Айналайын»", en: "Aynalayin State Kindergarten" },
    address: { kz: "Құлсары қ., Орталық", ru: "г. Кульсары, Центр", en: "Kulsary, Center" },
    capacity: "320 орын",
    queueLink: "https://indigo24.kz/",
    color: "#16a34a",
    image: "/images/kg-aynalayin.jpg",
  },
  {
    name: { kz: "«Гүлдәурен» бөбекжайы", ru: "Ясли-сад «Гулдаурен»", en: "Guldawren Kindergarten" },
    address: { kz: "Құлсары қ., Мұнайшылар", ru: "г. Кульсары, район Мунайшылар", en: "Kulsary, Munayshylar" },
    capacity: "250 орын",
    queueLink: "https://indigo24.kz/",
    color: "#b45309",
    image: "/images/kg-guldawren.jpg",
  },
  {
    name: { kz: "«Балапан» бөбекжай-бақшасы", ru: "Ясли-сад «Балапан»", en: "Balapan Kindergarten" },
    address: { kz: "Құлсары қ., 1-ауыл", ru: "г. Кульсары, 1-й аул", en: "Kulsary, 1st aui" },
    capacity: "200 орын",
    queueLink: "https://indigo24.kz/",
    color: "#be185d",
    image: "/images/kg-balapan.jpg",
  },
];

export function CityHubPortal() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"oil" | "tenders" | "education" | "civil">("oil");
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <section className="hub-portal-section section-padding" id="hub" aria-labelledby="hub-title">
      <div className="page-container">
        {/* Header Label */}
        <div data-reveal>
          <div className="section-label">
            <span>ЦИФРЛЫҚ ХАБ</span>
            <span className="section-label-rule" aria-hidden="true" />
            <span>
              {lang === "kz"
                ? "ҚҰЛСАРЫ & ТЕҢІЗ: БИЗНЕС, ЖҰМЫС, БЮДЖЕТ ЖӘНЕ ӘЛЕУМЕТТІК ПОРТАЛ"
                : lang === "ru"
                ? "КУЛЬСАРЫ & ТЕНГИЗ: БИЗНЕС, КАРЬЕРА, БЮДЖЕТ И СОЦСЕРВИСЫ"
                : "KULSARY & TENGIZ: BUSINESS, CAREERS, BUDGET & PUBLIC HUB"}
            </span>
          </div>

          <div className="section-heading-grid">
            <h2 id="hub-title" className="section-title">
              {lang === "kz" ? "Мұнайлы өлке мен" : lang === "ru" ? "Единый хаб нефтяного края," : "Integrated Hub:"}{" "}
              <em>
                {lang === "kz"
                  ? "халықтың біртұтас цифрлық хабы."
                  : lang === "ru"
                  ? "бизнеса и жителей города."
                  : "Industry, Public Services & People."}
              </em>
            </h2>
            <p className="section-intro">
              {lang === "kz"
                ? "Теңіз кен орны, вахталық қалашықтар, бос жұмыс орындары, қаладағы көшелер жөндеуі, бөлінген бюджет қаржысы мен мектеп/балабақша тізімдері — барлығы бір жерде."
                : lang === "ru"
                ? "Тенгиз, вахтовые городки, вакансии, дорожные работы, бюджетные подряды ИП/ТОО, реестр школ и детсадов — на единой интерактивной платформе."
                : "Tengiz megafield, residential camps, jobs, road tenders, budget spending transparency, and complete school/kindergarten registries."}
            </p>
          </div>
        </div>

        {/* Master Hub Category Switcher */}
        <div className="hub-master-tabs" data-reveal>
          <button
            type="button"
            className={`hub-master-tab ${activeTab === "oil" ? "active" : ""}`}
            onClick={() => setActiveTab("oil")}
          >
            <Flame size={18} />
            <div>
              <strong>{lang === "kz" ? "Теңіз & Мұнай хабы" : lang === "ru" ? "Тенгиз и Нефтегаз" : "Tengiz & Oil Hub"}</strong>
              <small>{lang === "kz" ? "Кен орындары, вахталық қалашықтар, жұмыс" : lang === "ru" ? "Месторождения, вахты, карьера" : "Fields, camps, vacancies"}</small>
            </div>
          </button>

          <button
            type="button"
            className={`hub-master-tab ${activeTab === "tenders" ? "active" : ""}`}
            onClick={() => setActiveTab("tenders")}
          >
            <Coins size={18} />
            <div>
              <strong>{lang === "kz" ? "Ашық Бюджет & Тендерлер" : lang === "ru" ? "Открытый бюджет & Тендеры" : "Open Budget & Tenders"}</strong>
              <small>{lang === "kz" ? "Көшелер жөндеуі, ЖК/ЖШС мердігерлері, қаржы" : lang === "ru" ? "Ремонт улиц, подрядчики ИП/ТОО, суммы" : "Road contracts, contractors, budgets"}</small>
            </div>
          </button>

          <button
            type="button"
            className={`hub-master-tab ${activeTab === "education" ? "active" : ""}`}
            onClick={() => setActiveTab("education")}
          >
            <GraduationCap size={18} />
            <div>
              <strong>{lang === "kz" ? "Мектептер & Балабақшалар" : lang === "ru" ? "Школы и Детские сады" : "Schools & Kindergartens"}</strong>
              <small>{lang === "kz" ? "Мектептер, колледждер, балабақша кезегі" : lang === "ru" ? "Реестр школ, колледжи, очередь в сады" : "Schools, colleges, queues"}</small>
            </div>
          </button>

          <button
            type="button"
            className={`hub-master-tab ${activeTab === "civil" ? "active" : ""}`}
            onClick={() => setActiveTab("civil")}
          >
            <HeartHandshake size={18} />
            <div>
              <strong>{lang === "kz" ? "Халық & Билік порталы" : lang === "ru" ? "Жители и Власть" : "Citizen & Government"}</strong>
              <small>{lang === "kz" ? "109 қызметі, e-Otinish, шағым/өтініш" : lang === "ru" ? "Служба 109, e-Otinish, обращения" : "Helpline 109, e-Otinish, appeals"}</small>
            </div>
          </button>
        </div>

        {/* ================= TAB 1: OIL & TENGIZ MEGA-HUB ================= */}
        {activeTab === "oil" && (
          <div className="hub-tab-content" data-reveal>
            {/* Quick Tengiz Statistics Bar */}
            <div className="oil-tengiz-banner">
              <div className="oil-banner-headline">
                <span className="oil-tag">FGP-WPMP · КҚЖ-ҰЕҚБЖ</span>
                <h3>{lang === "kz" ? "Теңіз кен орны — Қазақстанның мұнай алыбы" : lang === "ru" ? "Месторождение Тенгиз — энергетическое сердце страны" : "Tengiz Field — Powerhouse of Kazakhstan"}</h3>
                <p>
                  {lang === "kz"
                    ? "Құлсары — әлемдегі ең ірі Теңіз кен орнының стратегиялық орталығы. Мыңдаған отандастарымыз күн сайын вахталық тәртіппен ел экономикасын алға жылжытуда."
                    : lang === "ru"
                    ? "Кульсары — стратегический тыл супергигантского месторождения Тенгиз. Ежедневно десятки тысяч специалистов трудятся на вахтах мирового уровня."
                    : "Kulsary serves as the crucial land and logistical gate for the supergiant Tengiz field, driving national economic development through world-class rotational shifts."}
                </p>
              </div>
              <div className="oil-banner-metrics">
                <div>
                  <strong>~1 млн</strong>
                  <span>{lang === "kz" ? "Баррель/тәулік өндіріс қуаты" : lang === "ru" ? "Баррелей/сутки мощность" : "Barrels/day target capacity"}</span>
                </div>
                <div>
                  <strong>$45+ млрд</strong>
                  <span>{lang === "kz" ? "КҚЖ инвестициясы" : lang === "ru" ? "Инвестиции в ПБР" : "FGP mega-project investment"}</span>
                </div>
                <div>
                  <strong>85%+</strong>
                  <span>{lang === "kz" ? "Қазақстандық мамандар үлесі" : lang === "ru" ? "Доля казахстанских кадров" : "Kazakhstani workforce share"}</span>
                </div>
              </div>
            </div>

            {/* Operators & Contractors Grid */}
            <h3 className="hub-sub-title">
              {lang === "kz" ? "Бас операторлар мен ірі мердігер компаниялар" : lang === "ru" ? "Главные операторы и генеральные подрядчики" : "Key Operators & Prime Engineering Contractors"}
            </h3>
            <div className="operators-grid">
              {oilOperators.map((op) => (
                <div className="operator-card" key={op.id} style={{
                  backgroundImage: `url(${op.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Dark overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(5,10,20,0.93) 0%, rgba(5,10,20,0.80) 60%, rgba(5,10,20,0.70) 100%)',
                    zIndex: 0,
                  }} />
                  {/* Accent border top */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                    background: op.accentColor, zIndex: 2,
                  }} />

                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Logo + badge row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <img
                        src={op.logo}
                        alt={op.name + " logo"}
                        style={{ height: '52px', width: 'auto', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', padding: '4px 8px', objectFit: 'contain' }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        <span className="operator-badge" style={{ background: `${op.accentColor}25`, color: op.accentColor, border: `1px solid ${op.accentColor}50` }}>
                          {op.badge[lang]}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>{op.workforce}</span>
                      </div>
                    </div>

                    <h4 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 800, margin: '0 0 6px' }}>{op.name}</h4>
                    <p className="operator-role" style={{ color: op.accentColor }}>{op.role[lang]}</p>
                    <p className="operator-desc" style={{ color: 'rgba(255,255,255,0.72)', flex: 1 }}>{op.desc[lang]}</p>

                    <div className="operator-fields" style={{ marginBottom: '18px' }}>
                      {op.fields.map((f, i) => (
                        <span className="operator-field-pill" key={i} style={{
                          background: `${op.accentColor}18`,
                          border: `1px solid ${op.accentColor}40`,
                          color: 'rgba(255,255,255,0.85)',
                        }}>
                          <CheckCircle2 size={12} style={{ color: op.accentColor }} /> {f}
                        </span>
                      ))}
                    </div>

                    <div className="operator-action">
                      <a href={op.careerLink} target="_blank" rel="noopener noreferrer" className="op-career-btn" style={{
                        background: op.accentColor, color: '#0a1020',
                      }}>
                        <Briefcase size={15} />
                        <span>{lang === "kz" ? "Бос орындар / Резюме жіберу" : lang === "ru" ? "Вакансии / Отправить резюме" : "View Vacancies & Apply"}</span>
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Residential / Shift Camps */}
            <h3 className="hub-sub-title" style={{ marginTop: "44px" }}>
              {lang === "kz" ? "Вахталық қалашықтар мен кампустар" : lang === "ru" ? "Вахтовые городки и жилые комплексы" : "Residential Shift Camps & Campuses"}
            </h3>
            <div className="camps-grid">
              {camps.map((camp, idx) => (
                <div className="camp-card" key={idx}>
                  <div className="camp-icon">
                    <Building size={22} />
                  </div>
                  <div className="camp-info">
                    <h4>{camp.name[lang]}</h4>
                    <span className="camp-type">{camp.type[lang]} · <strong>{camp.capacity}</strong></span>
                    <p className="camp-location">
                      <MapPin size={13} /> {camp.location[lang]}
                    </p>
                    <p className="camp-desc">{camp.desc[lang]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Job Search External Portals */}
            <div className="careers-portal-card">
              <div className="careers-portal-copy">
                <h4>{lang === "kz" ? "Жылыой ауданы мен Теңіз бойынша ресми жұмыс іздеу порталдары" : lang === "ru" ? "Официальные порталы поиска работы в Жылыойском районе и на Тенгизе" : "Official Employment Portals for Zhylyoi & Tengiz"}</h4>
                <p>{lang === "kz" ? "Мемлекеттік Enbek.kz порталы, ТШО карьералық парақшасы және мердігерлік компаниялардың ресми ресурстары." : lang === "ru" ? "Государственный портал Enbek.kz, официальный сайт ТШО и вакансии сервисных компаний." : "National Enbek.kz portal, official TCO career channel, and authorized recruitment agencies."}</p>
              </div>
              <div className="careers-portal-links">
                <a href="https://www.enbek.kz/kk/search/vacancies?region=atyrauskaya-oblast&district=zhylyoyskiy-rayon" target="_blank" rel="noopener noreferrer" className="career-link-pill">
                  Enbek.kz · Жылыой ауданы <ExternalLink size={14} />
                </a>
                <a href="https://tengizchevroil.com/careers" target="_blank" rel="noopener noreferrer" className="career-link-pill">
                  TCO Careers Ресми порталы <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: TENDERS & INFRASTRUCTURE MONITORING ================= */}
        {activeTab === "tenders" && (
          <div className="hub-tab-content" data-reveal>
            {/* Tender Monitoring Overview */}
            <div className="tender-overview-box">
              <div className="tender-overview-item">
                <span className="tender-meta-label">{lang === "kz" ? "БЕЛСЕНДІ ЖОБАЛАР" : lang === "ru" ? "АКТИВНЫЕ ПРОЕКТЫ" : "ACTIVE PROJECTS"}</span>
                <strong>14 жоба</strong>
                <small>{lang === "kz" ? "Көшелер, су бөгеттері, жарықтандыру" : lang === "ru" ? "Дороги, дамбы, освещение" : "Streets, dikes, lighting"}</small>
              </div>
              <div className="tender-overview-sep" />
              <div className="tender-overview-item">
                <span className="tender-meta-label">{lang === "kz" ? "ЖАЛПЫ БЮДЖЕТ" : lang === "ru" ? "ОБЩИЙ БЮДЖЕТ" : "ALLOCATED BUDGET"}</span>
                <strong>5,79 млрд ₸</strong>
                <small>{lang === "kz" ? "Қалалық және республикалық қор" : lang === "ru" ? "Городской и республиканский фонд" : "Municipal and national funds"}</small>
              </div>
              <div className="tender-overview-sep" />
              <div className="tender-overview-item">
                <span className="tender-meta-label">{lang === "kz" ? "МЕРДІГЕРЛЕР (ИП/ТОО)" : lang === "ru" ? "ПОДРЯДЧИКИ (ИП/ТОО)" : "REGISTERED CONTRACTORS"}</span>
                <strong>8 ЖШС / ЖК</strong>
                <small>{lang === "kz" ? "Ашық конкурс жеңімпаздары" : lang === "ru" ? "Победители открытых госзакупок" : "Procurement contest winners"}</small>
              </div>
            </div>

            {/* Official Procurement Links */}
            <div className="tenders-official-bar">
              <span>{lang === "kz" ? "Ресми тендерлік порталдар:" : lang === "ru" ? "Официальные порталы закупок:" : "Official procurement portals:"}</span>
              <a href="https://goszakup.gov.kz/" target="_blank" rel="noopener noreferrer" className="tender-ext-btn">
                <FileText size={14} /> Goszakup.gov.kz <ExternalLink size={13} />
              </a>
              <a href="https://tender.sk.kz/" target="_blank" rel="noopener noreferrer" className="tender-ext-btn">
                <Layers size={14} /> Самұрық-Қазына Закупки <ExternalLink size={13} />
              </a>
              <a href="https://tengizchevroil.com/suppliers" target="_blank" rel="noopener noreferrer" className="tender-ext-btn">
                <Flame size={14} /> TCO Suppliers (Жеткізушілер) <ExternalLink size={13} />
              </a>
            </div>

            {/* Real Street & Road Works Table / Cards */}
            <h3 className="hub-sub-title" style={{ marginTop: "32px" }}>
              {lang === "kz" ? "Құлсары қаласындағы көшелерді жөндеу және құрылыс жобалары" : lang === "ru" ? "Проекты ремонта дорог и инфраструктуры в г. Кульсары" : "Road Infrastructure Projects & Public Spending in Kulsary"}
            </h3>

            <div className="tenders-list">
              {tenderProjects.map((tnd) => (
                <div className="tender-card" key={tnd.id}>
                  <div className="tender-card-header">
                    <div className="tender-card-type">
                      {tnd.type === "road" && <Truck size={16} />}
                      {tnd.type === "dike" && <ShieldCheck size={16} />}
                      {tnd.type === "lighting" && <HardHat size={16} />}
                      {tnd.type === "social" && <Building size={16} />}
                      <span>{tnd.year} ЖОБАСЫ</span>
                    </div>
                    <span className={`tender-status-badge status-${tnd.statusCode}`}>
                      {tnd.status[lang]}
                    </span>
                  </div>

                  <h4>{tnd.title[lang]}</h4>

                  <div className="tender-details-grid">
                    <div>
                      <small>{lang === "kz" ? "Мердігер ұйым (ИП / ТОО)" : lang === "ru" ? "Подрядная организация (ИП/ТОО)" : "Contractor (LLP / IE)"}</small>
                      <strong>{tnd.contractor}</strong>
                    </div>
                    <div>
                      <small>{lang === "kz" ? "Бөлінген қаржы көлемі" : lang === "ru" ? "Сумма выделенного бюджета" : "Contract Budget"}</small>
                      <strong className="budget-highlight">{tnd.budget}</strong>
                    </div>
                    <div>
                      <small>{lang === "kz" ? "Орналасқан аумағы" : lang === "ru" ? "Участок проведения работ" : "Work Area"}</small>
                      <span>{tnd.location[lang]}</span>
                    </div>
                  </div>

                  <div className="tender-card-footer">
                    <span className="tender-verified">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      {lang === "kz" ? "Мемлекеттік сатып алу порталында тіркелген" : lang === "ru" ? "Верифицировано на портале госзакупок" : "Verified via State Procurement"}
                    </span>
                    <a href={tnd.portalLink} target="_blank" rel="noopener noreferrer" className="tender-check-link">
                      <span>{lang === "kz" ? "Конкурсты тексеру" : lang === "ru" ? "Проверить на портале" : "Verify on Goszakup"}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: SCHOOLS, COLLEGES & KINDERGARTENS ================= */}
        {activeTab === "education" && (
          <div className="hub-tab-content" data-reveal>
            {/* Quick Portals Links */}
            <div className="edu-portals-bar">
              <a href="https://kundelik.kz/" target="_blank" rel="noopener noreferrer" className="edu-portal-badge">
                <School size={16} /> Kundelik.kz (Күнделік) <ExternalLink size={13} />
              </a>
              <a href="https://indigo24.kz/" target="_blank" rel="noopener noreferrer" className="edu-portal-badge">
                <Baby size={16} /> Indigo24 (Балабақша кезегі) <ExternalLink size={13} />
              </a>
              <a href="https://bilimal.kz/" target="_blank" rel="noopener noreferrer" className="edu-portal-badge">
                <GraduationCap size={16} /> Bilimal Порталы <ExternalLink size={13} />
              </a>
            </div>

            {/* Schools & Colleges List */}
            <h3 className="hub-sub-title" style={{ marginTop: "28px" }}>
              {lang === "kz" ? "Құлсары қаласының мектептері мен колледждері" : lang === "ru" ? "Школы и колледжи города Кульсары" : "Schools & Colleges Registry in Kulsary"}
            </h3>

            <div className="schools-grid">
              {schoolsList.map((sch) => {
                const accent = sch.color || "#1d4ed8";
                return (
                  <div className="school-card" key={sch.id} style={{ padding: 0, overflow: 'hidden', border: `1.5px solid ${accent}35` }}>
                    {/* Real Institution Photo Header */}
                    <div style={{
                      position: 'relative',
                      height: '140px',
                      overflow: 'hidden',
                      backgroundImage: `url(${sch.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(16,30,34,0.92) 0%, rgba(16,30,34,0.4) 60%, rgba(16,30,34,0.2) 100%)',
                      }} />
                      {/* Top badges */}
                      <div style={{ position: 'relative', zIndex: 1, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          background: 'rgba(255,255,255,0.92)',
                          color: '#101e22',
                          fontWeight: 800,
                          fontSize: '11px',
                          padding: '3px 9px',
                          borderRadius: '4px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        }}>
                          {sch.founded}
                        </span>
                        <span style={{
                          background: accent,
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '10px',
                          letterSpacing: '0.05em',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        }}>
                          {sch.type[lang]}
                        </span>
                      </div>
                      {/* Emblem / Type Icon */}
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '14px',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          background: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(6px)',
                          border: '1.5px solid rgba(255,255,255,0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                        }}>
                          {sch.id === "sch-college" ? (
                            <GraduationCap size={20} />
                          ) : sch.id === "sch-music" ? (
                            <span style={{ fontSize: '18px' }}>🎵</span>
                          ) : (
                            <School size={20} />
                          )}
                        </div>
                        <span style={{ color: '#ffffff', fontSize: '11px', fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                          {sch.id === "sch-college" ? "ТШО Базасы" : sch.id === "sch-daryn" ? "Лицей-интернат" : "Мектеп"}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '16px 18px 14px', background: 'var(--card-bg, #ffffff)' }}>
                      <h4 style={{ fontSize: '15px', lineHeight: 1.35, marginBottom: '8px', color: 'var(--deep-oil)', fontWeight: 800, minHeight: '40px' }}>
                        {sch.name[lang]}
                      </h4>
                      <p className="school-addr" style={{ margin: '0 0 12px', fontSize: '12px' }}>
                        <MapPin size={14} style={{ color: accent, flexShrink: 0 }} /> {sch.address[lang]}
                      </p>
                      <div className="school-actions" style={{ paddingTop: '10px' }}>
                        <a href={`tel:${sch.phone}`} className="school-phone">
                          <PhoneCall size={13} /> {sch.phone}
                        </a>
                        <a href={sch.link} target="_blank" rel="noopener noreferrer" className="school-link" style={{ color: accent, fontWeight: 700 }}>
                          <span>{sch.id === "sch-college" ? "Сайт" : "Kundelik"}</span>
                          <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Kindergartens List */}
            <h3 className="hub-sub-title" style={{ marginTop: "44px" }}>
              {lang === "kz" ? "Балабақшалар тізімі және кезекке тұру" : lang === "ru" ? "Реестр детских садов и электронная очередь" : "Kindergartens & Electronic Queue Enrollment"}
            </h3>

            <div className="kindergartens-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px' }}>
              {kindergartens.map((kg, i) => (
                <div className="kg-card" key={i} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: `1.5px solid ${kg.color}35` }}>
                  {/* Kindergarten Photo Banner */}
                  <div style={{
                    position: 'relative',
                    height: '130px',
                    backgroundImage: `url(${kg.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(16,30,34,0.92) 0%, rgba(16,30,34,0.3) 60%, rgba(16,30,34,0.1) 100%)',
                    }} />
                    <div style={{ position: 'relative', zIndex: 1, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        background: 'rgba(255,255,255,0.92)',
                        color: '#101e22',
                        fontWeight: 800,
                        fontSize: '11px',
                        padding: '3px 9px',
                        borderRadius: '4px',
                      }}>
                        {kg.capacity}
                      </span>
                      <span style={{
                        background: kg.color,
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '10px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}>
                        Indigo24 жүйесінде
                      </span>
                    </div>
                    <div style={{ position: 'absolute', bottom: '8px', left: '14px', zIndex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Baby size={18} color="#ffffff" />
                      <span style={{ color: '#ffffff', fontSize: '11px', fontWeight: 700 }}>Бөбекжай-бақшасы</span>
                    </div>
                  </div>

                  {/* Body & Actions */}
                  <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flex: 1, background: 'var(--card-bg, #ffffff)' }}>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 4px', color: 'var(--deep-oil)' }}>{kg.name[lang]}</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} style={{ color: kg.color }} /> {kg.address[lang]}
                      </p>
                    </div>
                    <a href={kg.queueLink} target="_blank" rel="noopener noreferrer" className="kg-queue-btn" style={{
                      background: kg.color,
                      color: '#ffffff',
                      borderRadius: '6px',
                      padding: '8px 14px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      whiteSpace: 'nowrap',
                    }}>
                      <span>{lang === "kz" ? "Indigo кезек" : lang === "ru" ? "Очередь Indigo" : "Queue Portal"}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: CITIZENS & LOCAL GOVERNMENT ================= */}
        {activeTab === "civil" && (
          <div className="hub-tab-content" data-reveal>
            <div className="civil-hero-card">
              <div className="civil-hero-info">
                <span className="civil-tag">{lang === "kz" ? "БІРЫҢҒАЙ ДИАЛОГ" : lang === "ru" ? "ЕДИНЫЙ ДИАЛОГ" : "PUBLIC DIALOGUE"}</span>
                <h3>{lang === "kz" ? "Халық пен билік арасындағы тікелей байланыс" : lang === "ru" ? "Прямая связь жителей с акиматом и службами" : "Direct Link Between Residents & Municipal Government"}</h3>
                <p>
                  {lang === "kz"
                    ? "Кез келген өзекті мәселе, көше жарығы, су, жол тазалығы немесе ресми өтініштерді мемлекеттік қадағалау жүйесі арқылы жолдаңыз."
                    : lang === "ru"
                    ? "Подавайте официальные обращения, отслеживайте решение коммунальных вопросов и контролируйте ход работ через государственные сервисы."
                    : "Submit official requests, report local community issues, and track infrastructure progress directly via governmental citizen portals."}
                </p>
              </div>

              <div className="civil-cta-actions">
                <a href="https://eotinish.kz/kk/sendAppeal?orgId=13118" target="_blank" rel="noopener noreferrer" className="civil-primary-btn">
                  <span>e-Otinish: Әкімге өтініш жазу</span>
                  <ArrowUpRight size={18} />
                </a>
                <a href="tel:109" className="civil-secondary-btn">
                  <PhoneCall size={18} />
                  <span>109: Жедел байланыс қызметі</span>
                </a>
              </div>
            </div>

            <div className="civil-services-grid">
              <div className="civil-card">
                <div className="civil-card-num">01</div>
                <h4>e-Otinish Мемлекеттік порталы</h4>
                <p>{lang === "kz" ? "Жылыой ауданы мен Құлсары әкімдігіне заңды күші бар ресми өтініштер жолдау және жауабын ЭЦП арқылы қадағалау." : lang === "ru" ? "Подача официальных обращений в акимат с юридическим контролем сроков и ответов через ЭЦП." : "Legally binding appeals system monitored by the General Prosecutor's Office."}</p>
                <a href="https://eotinish.kz/" target="_blank" rel="noopener noreferrer" className="civil-card-link">eotinish.kz <ExternalLink size={13} /></a>
              </div>

              <div className="civil-card">
                <div className="civil-card-num">02</div>
                <h4>109 Бірыңғай диспетчерлік қызмет</h4>
                <p>{lang === "kz" ? "Су үзілуі, кәріз, көше жарығының сөнуі, тасқын қаупі бойынша тәулік бойы 24/7 диспетчермен байланысу." : lang === "ru" ? "Круглосуточный колл-центр 24/7 по вопросам ЖКХ, водоснабжения, аварийных ситуаций и дорог." : "24/7 municipal dispatch center for utilities, water, electricity, and urgent communal incidents."}</p>
                <a href="tel:109" className="civil-card-link">Тел: 109 <PhoneCall size={13} /></a>
              </div>

              <div className="civil-card">
                <div className="civil-card-num">03</div>
                <h4>«Атамекен» кәсіпкерлер палатасы</h4>
                <p>{lang === "kz" ? "Жылыойдағы ЖК мен ЖШС құқығын қорғау, мемлекеттік гранттар, субсидиялар мен жеңілдетілген несиелер бойынша кеңес." : lang === "ru" ? "Поддержка предпринимателей Жылыойского района, субсидии, льготные кредиты и защита бизнеса." : "Chamber of Entrepreneurs in Zhylyoi: local business support, subsidies, and legal protection."}</p>
                <a href="https://atameken.kz/" target="_blank" rel="noopener noreferrer" className="civil-card-link">atameken.kz <ExternalLink size={13} /></a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
