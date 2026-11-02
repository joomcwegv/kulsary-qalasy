import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Camera,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Radio,
  Send,
  SquarePlay,
  X,
} from "lucide-react";
import {
  useWeatherData,
  HeaderWeather,
  HeroWeatherCard,
  getWeatherIcon,
  getLocalizedDescription,
} from "./components/WeatherWidget";
import { WikipediaFacts } from "./components/WikipediaFacts";
import { DistrictSettlements } from "./components/DistrictSettlements";
import { CityHubPortal } from "./components/CityHubPortal";
import { LanguageProvider, useLanguage, LanguageSwitcher } from "./components/LanguageContext";
import { ThemeProvider, ThemeToggle } from "./components/ThemeContext";
import { Language } from "./i18n/translations";

const cityQuery = "Құлсары, Атырау облысы, Қазақстан";
const mapSearch = (place: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
const mapDirections = (origin: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(cityQuery)}&travelmode=driving`;

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a className="brand" href="#home" aria-label="Құлсары - басты бет" onClick={onClick}>
      <img
        src="/images/zhylyoi-emblem.png"
        alt="Жылыой ауданының елтаңбасы"
        className="brand-emblem-img"
      />
      <span className="brand-words">
        <strong>ҚҰЛСАРЫ</strong>
        <small>ЖЫЛЫОЙ · АТЫРАУ</small>
      </span>
    </a>
  );
}

function SectionLabel({
  number,
  children,
  light = false,
}: {
  number: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-label${light ? " section-label-light" : ""}`}>
      <span>{number}</span>
      <span className="section-label-rule" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function PlaceRow({
  number,
  title,
  description,
  href,
}: {
  number: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a className="place-row" href={href} target="_blank" rel="noopener noreferrer">
      <span className="place-row-number">{number}</span>
      <span className="place-row-copy">
        <strong>{title}</strong>
        <span>{description}</span>
      </span>
      <ArrowUpRight className="place-row-arrow" size={21} strokeWidth={1.6} aria-hidden="true" />
    </a>
  );
}

function AppMain() {
  const { lang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { weather, loading } = useWeatherData(lang);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 35);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (!target) return;
    const frame = requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant", block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -35px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const navigation = [
    { label: t.nav.history, href: "#history" },
    { label: t.nav.wiki, href: "#wiki" },
    { label: t.nav.settlements, href: "#settlements" },
    {
      label:
        lang === "kz" ? "Мұнай & Инфра Хаб" : lang === "ru" ? "Тенгиз & Инфра Хаб" : "Industry & Hub",
      href: "#hub",
    },
    { label: t.nav.places, href: "#places" },
    { label: t.nav.life, href: "#life" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.social, href: "#social" },
  ];

  const historyPlaces = [
    {
      number: "01",
      title: lang === "kz" ? "Құлсары ата кесенесі" : lang === "ru" ? "Мавзолей Кульсары-ата" : "Kulsary-ata Mausoleum",
      description:
        lang === "kz"
          ? "Қала атауына арқау болған киелі мекен. Тарихи қорым 6-ауыл аумағында орналасқан."
          : lang === "ru"
          ? "Священное место, давшее имя городу. Исторический некрополь расположен в 6-м ауле."
          : "Sacred site giving name to the city. The historical necropolis is located in the 6th village.",
      href: mapSearch("Құлсары ата қорымы, 6-ауыл, Құлсары"),
    },
    {
      number: "02",
      title: lang === "kz" ? "Ақмешіт / Бекет ата" : lang === "ru" ? "Акмешит / Бекет-ата" : "Akmeshyt / Beket-ata",
      description:
        lang === "kz"
          ? "Ақкиізтоғай маңындағы Жем бойында орналасқан рухани және тарихи мұра."
          : lang === "ru"
          ? "Духовное и историческое наследие в пойме реки Эмба близ Аккиизтогая."
          : "Spiritual and historical heritage along the Zhem river near Akkiiztogai.",
      href: mapSearch("Ақмешіт қорымы Бекет ата Жылыой ауданы"),
    },
    {
      number: "03",
      title: lang === "kz" ? "Жеңіс саябағы" : lang === "ru" ? "Парк Победы" : "Victory Park",
      description:
        lang === "kz"
          ? "Майданнан оралмаған жерлестердің есімін сақтаған мемориалды орын."
          : lang === "ru"
          ? "Мемориальный комплекс в память о земляках, не вернувшихся с войны."
          : "Memorial site honoring local heroes who fought in the Second World War.",
      href: mapSearch("Жеңіс саябағы Құлсары мемориал"),
    },
  ];

  const cityPlaces = [
    {
      number: "01",
      title: lang === "kz" ? "Арбат және орталық аллея" : lang === "ru" ? "Арбат и центральная аллея" : "Arbat & Central Promenade",
      description:
        lang === "kz"
          ? "Қаладағы серуен мен кездесуге арналған ашық кеңістік."
          : lang === "ru"
          ? "Открытое городское пространство для прогулок и встреч."
          : "Open public promenade for strolls and social gatherings.",
      href: mapSearch("Арбат Құлсары қаласы"),
    },
    {
      number: "02",
      title: lang === "kz" ? "Рәміздер алаңы" : lang === "ru" ? "Площадь Госсимволов" : "State Symbols Square",
      description:
        lang === "kz"
          ? "Құлсары келбетін танытатын қоғамдық орындардың бірі."
          : lang === "ru"
          ? "Одна из главных визитных карточек и общественных площадей города."
          : "One of the landmark public squares defining the modern city look.",
      href: mapSearch("Рәміздер алаңы Құлсары"),
    },
    {
      number: "03",
      title: lang === "kz" ? "Қала қақпалары" : lang === "ru" ? "Въездные стелы города" : "City Entrance Gates",
      description:
        lang === "kz"
          ? "Атырау, Бейнеу және Теңіз бағытындағы кіреберіс белгілер."
          : lang === "ru"
          ? "Въездные монументальные знаки со стороны Атырау, Бейнеу и Тенгиза."
          : "Landmark gateway monuments on routes from Atyrau, Beyneu and Tengiz.",
      href: mapSearch("Құлсары қаласына кіреберіс"),
    },
  ];

  const familyPlaces = [
    {
      number: "01",
      title: lang === "kz" ? "Жасұлан саябағы" : lang === "ru" ? "Парк Жасулан" : "Zhasulan Park",
      description:
        lang === "kz"
          ? "Балалармен және жақындарыңызбен серуендеуге арналған орын."
          : lang === "ru"
          ? "Уютное место для отдыха и прогулок с детьми и близкими."
          : "Pleasant park for leisure and family walks with children.",
      href: mapSearch("Жасұлан саябағы Құлсары"),
    },
    {
      number: "02",
      title: lang === "kz" ? "Орталық аллеялар" : lang === "ru" ? "Центральные аллеи" : "Central Avenues",
      description:
        lang === "kz"
          ? "Орындықтар, жасыл аймақтар мен субұрқақ маңындағы тыныш сәттер."
          : lang === "ru"
          ? "Зелёные скверы, скамейки и фонтаны для приятного вечернего отдыха."
          : "Green zones, benches, and fountains for quiet evenings.",
      href: mapSearch("Құлсары орталық аллея саябақ"),
    },
    {
      number: "03",
      title: lang === "kz" ? "Қамыскөл жағалауы" : lang === "ru" ? "Набережная озера Камысколь" : "Lake Kamyskol Promenade",
      description:
        lang === "kz"
          ? "Көл маңындағы табиғатты тамашалап, асықпай серуендеуге болады."
          : lang === "ru"
          ? "Живописная водная акватория для созерцания природы и отдыха."
          : "Picturesque lakeshore area for peaceful scenic strolls.",
      href: mapSearch("Қамыскөл көлі Құлсары"),
    },
  ];

  const emergencyNumbers = [
    { number: "112", label: lang === "kz" ? "ТЖД / бірыңғай жедел қызмет" : lang === "ru" ? "ЧС / единая дежурная служба" : "Unified Emergency", href: "tel:112" },
    { number: "102", label: lang === "kz" ? "Полиция" : lang === "ru" ? "Полиция" : "Police", href: "tel:102" },
    { number: "103", label: lang === "kz" ? "Жедел жәрдем" : lang === "ru" ? "Скорая помощь" : "Ambulance", href: "tel:103" },
    { number: "101", label: lang === "kz" ? "Өрт сөндіру қызметі" : lang === "ru" ? "Пожарная служба" : "Fire Service", href: "tel:101" },
  ];

  const socialLinks = [
    {
      icon: Camera,
      platform: "INSTAGRAM / РЕСМИ",
      title: lang === "kz" ? "Құлсары қаласы әкімдігі" : lang === "ru" ? "Акимат города Кульсары" : "Kulsary City Akimat",
      detail: "@qulsary_qalasy_akimdigi",
      href: "https://www.instagram.com/qulsary_qalasy_akimdigi/",
    },
    {
      icon: Camera,
      platform: "INSTAGRAM / РЕСМИ",
      title: lang === "kz" ? "Жылыой ауданы әкімдігі" : lang === "ru" ? "Акимат Жылыойского района" : "Zhylyoi District Akimat",
      detail: "@jylyoi_audany_akimdigi",
      href: "https://www.instagram.com/jylyoi_audany_akimdigi/",
    },
    {
      icon: Camera,
      platform: "INSTAGRAM / ПАБЛИК",
      title: lang === "kz" ? "Құлсары жаңалықтары" : lang === "ru" ? "Новости Кульсары" : "Kulsary News",
      detail: "@kulsary_ze",
      href: "https://www.instagram.com/kulsary_ze/",
    },
    {
      icon: Radio,
      platform: "ZELLO / ЖОЛ",
      title: lang === "kz" ? "Жол және такси арналары" : lang === "ru" ? "Каналы дорог и такси" : "Road & Taxi Channels",
      detail: lang === "kz" ? "Қолданбада «Құлсары» деп іздеңіз" : "Поиск «Кульсары» в приложении",
      href: "https://zello.com/",
    },
    {
      icon: SquarePlay,
      platform: "YOUTUBE / БЕЙНЕ",
      title: lang === "kz" ? "Құлсары туралы видеолар" : lang === "ru" ? "Видео о Кульсары" : "Videos about Kulsary",
      detail: lang === "kz" ? "Деректі фильмдер мен қала шолулары" : "Документальные фильмы и обзоры",
      href: `https://www.youtube.com/results?search_query=${encodeURIComponent("Құлсары қала")}`,
    },
    {
      icon: Send,
      platform: "TELEGRAM",
      title: lang === "kz" ? "ТЖМ ресми арнасы" : lang === "ru" ? "Официальный канал МЧС" : "Emergency Telegram",
      detail: lang === "kz" ? "Қауіпсіздік жедел ақпараты" : "Оперативная сводка безопасности",
      href: "https://t.me/qr_tjm",
    },
    {
      icon: MessageCircle,
      platform: "WHATSAPP",
      title: "Жылыойсу байланысы",
      detail: lang === "kz" ? "Су қызметіне тікелей жазу" : "Чат аварийной службы воды",
      href: "https://wa.me/77751951767",
    },
  ];

  return (
    <>
      <a className="skip-link" href="#main">Негізгі мазмұнға өту</a>

      {/* Sticky Top Header (Weather and Language stay pinned at the top when scrolling!) */}
      <header className={`site-header${isScrolled ? " site-header-scrolled" : ""}`}>
        <div className="site-header-inner page-container">
          <Brand />

          <nav className="desktop-nav" aria-label="Негізгі мәзір">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>{item.label}</a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Sticky live weather pill: Always pinned at the top! */}
            <HeaderWeather weather={weather} loading={loading} isScrolled={isScrolled} />

            {/* 3-Language Switcher (KZ / RU / EN) */}
            <LanguageSwitcher />

            {/* Night / Day Mode Toggle */}
            <ThemeToggle />

            <a className="header-map" href={mapSearch(cityQuery)} target="_blank" rel="noopener noreferrer">
              <MapPin size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>{t.nav.map}</span>
              <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </a>

            <button
              className="menu-toggle"
              type="button"
              aria-label="Мәзірді ашу"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={27} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="mobile-menu" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Навигация мәзірі">
          <div className="mobile-menu-top">
            <Brand onClick={() => setMenuOpen(false)} />
            <button className="mobile-menu-close" type="button" aria-label="Мәзірді жабу" onClick={() => setMenuOpen(false)}>
              <X size={27} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>

          <div style={{ padding: "8px 24px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>БАПТАУЛАР:</span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {weather && (
            <div style={{ padding: "8px 24px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.12)" }}>
                {getWeatherIcon(weather.condition, 22)}
                <div>
                  <div style={{ fontWeight: 700, color: "var(--gold)", fontSize: "14px" }}>
                    {t.weather.city}: {weather.temp > 0 ? `+${weather.temp}` : weather.temp}°C
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
                    {getLocalizedDescription(weather.rawDesc, lang)} · {t.weather.wind}: {weather.windSpeed} {t.weather.windUnit} · {t.weather.humidity}: {weather.humidity}%
                  </div>
                </div>
              </div>
            </div>
          )}

          <nav className="mobile-menu-links" aria-label="Мобильді мәзір">
            {navigation.map((item, index) => (
              <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                <span className="mobile-menu-index">0{index + 1}</span>
                <span>{item.label}</span>
                <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <a className="mobile-menu-map" href={mapSearch(cityQuery)} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            <MapPin size={18} aria-hidden="true" /> {t.nav.openMap} <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      )}

      <main id="main">
        {/* Hero Section */}
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content page-container">
            <div className="hero-copy">
              <p className="hero-eyebrow"><span aria-hidden="true" /> {t.hero.eyebrow}</p>
              <h1 id="hero-title">
                <span className="hero-brand-name">{t.hero.brandName}</span>
                <span className="hero-statement">{t.hero.statement}</span>
              </h1>
              <p className="hero-description">{t.hero.description}</p>
              <div className="hero-actions">
                <a className="primary-button" href="#history">{t.hero.exploreBtn} <ArrowUpRight size={19} strokeWidth={1.9} aria-hidden="true" /></a>
                <a className="hero-text-link" href={mapSearch(cityQuery)} target="_blank" rel="noopener noreferrer">{t.hero.mapBtn} <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" /></a>
              </div>
              <HeroWeatherCard weather={weather} loading={loading} />
            </div>
          </div>
          <a className="hero-scroll" href="#history" aria-label="Төмен жылжу">
            <span>{t.hero.scrollDown}</span><ArrowDown size={17} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </section>

        {/* 01. History Section */}
        <section className="history-section section-padding" id="history" aria-labelledby="history-title">
          <div className="page-container">
            <div data-reveal>
              <SectionLabel number="01">
                {lang === "kz" ? "ТАРИХЫ МЕН КИЕЛІ МЕКЕНДЕР" : lang === "ru" ? "ИСТОРИЯ И СВЯЩЕННЫЕ МЕСТА" : "HISTORY & SACRED SITES"}
              </SectionLabel>
              <div className="section-heading-grid">
                <h2 id="history-title" className="section-title">
                  {lang === "kz" ? "Бір атаудан басталған" : lang === "ru" ? "Большая история," : "A great history"}{" "}
                  <em>{lang === "kz" ? "үлкен тарих." : lang === "ru" ? "начавшаяся с одного имени." : "born from a sacred name."}</em>
                </h2>
                <p className="section-intro">
                  {lang === "kz"
                    ? "Құлсарының тамыры киелі далада, ал тарихы осы мекенді мекендеген адамдардың жадында сақталған."
                    : lang === "ru"
                    ? "Корни Кульсары уходят в древние степи, а история бережно хранится в памяти поколений."
                    : "The roots of Kulsary stem from the ancient steppe, safeguarded in generations of memory."}
                </p>
              </div>
            </div>

            <div className="history-grid">
              <figure className="history-figure" data-reveal>
                <div className="image-window history-image-window">
                  <img src="https://atyrau-heritage.kz/images/qr/30_1.jpg" alt="Құлсары ата кесенесі" />
                </div>
                <figcaption><span>ҚҰЛСАРЫ АТА ҚОРЫМЫ · 6-АУЫЛ</span><span>Фото: atyrau-heritage.kz</span></figcaption>
              </figure>

              <div className="history-right" data-reveal>
                <div className="place-list">
                  {historyPlaces.map((place) => <PlaceRow key={place.number} {...place} />)}
                </div>
                <figure className="akmeshit-figure">
                  <div className="image-window akmeshit-image-window">
                    <img src="https://visitatyrau.kz/wp-content/uploads/sites/7/2024/12/02-1.jpg" alt="Ақмешіт қорымы" />
                  </div>
                  <figcaption>АҚМЕШІТ ҚОРЫМЫ · Фото: Visit Atyrau</figcaption>
                </figure>
              </div>
            </div>

            <div className="history-source" data-reveal>
              <span>{lang === "kz" ? "Туған өлкенің тарихы әр буынмен жалғасады." : lang === "ru" ? "История края продолжается с каждым поколением." : "The heritage of our native land carries forward."}</span>
              <a href="https://atamura-zhmuzei.kz/?page_id=734" target="_blank" rel="noopener noreferrer">
                {lang === "kz" ? "Жылыой тарихын оқу" : lang === "ru" ? "Читать историю Жылыоя" : "Read Zhylyoi history"} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>

            {/* Historical 1990s Photo Archive & Kazakhstan Locator Map */}
            <div className="history-archive-showcase" data-reveal>
              <figure className="archive-photo-figure">
                <div className="image-window archive-image-window">
                  <img src="/images/kulsary-1990s.jpg" alt="Құлсары. 1990 жылдардағы тарихи көрініс" />
                  <span className="archive-photo-badge">
                    {lang === "kz" ? "ТАРИХИ ФОТО · 1990 ЖЫЛДАР" : lang === "ru" ? "АРХИВНОЕ ФОТО · 1990-Е ГОДЫ" : "HISTORIC PHOTO · 1990s"}
                  </span>
                </div>
                <figcaption>
                  <strong>{lang === "kz" ? "ҚҰЛСАРЫ. 1990 ЖЫЛДАРДАҒЫ ҚАЛА КЕЛБЕТІ" : lang === "ru" ? "КУЛЬСАРЫ. ОБЛИК ГОРОДА В 1990-Е ГОДЫ" : "KULSARY CITYSCAPE IN THE 1990s"}</strong>
                  <span>
                    {lang === "kz"
                      ? "Уикипедия ашық қорынан алынған тарихи фотошежіре. Кенттен бүгінгі заманауи өндірістік қалаға дейінгі өсу белесі."
                      : lang === "ru"
                      ? "Архивный исторический снимок из открытого фонда Википедии. Путь становления от рабочего посёлка до современного города."
                      : "Archival historical photograph from Wikipedia archives documenting the town's evolution into a modern energy center."}
                  </span>
                </figcaption>
              </figure>

              <figure className="kazakhstan-map-figure">
                <div className="image-window map-image-window">
                  <img src="/images/kazakhstan-map.png" alt="Қазақстан картасындағы Құлсары" />
                  <div className="map-pinpoint-kulsary" title="Құлсары қаласы (46°59′ с. ш., 54°01′ в. д.)">
                    <span className="pinpoint-pulse" />
                    <span className="pinpoint-dot" />
                    <span className="pinpoint-label">Құлсары · Qulsary</span>
                  </div>
                </div>
                <figcaption>
                  <strong>{lang === "kz" ? "ҚАЗАҚСТАН КАРТАСЫНДАҒЫ ОРНЫ" : lang === "ru" ? "ПОЛОЖЕНИЕ НА КАРТЕ КАЗАХСТАНА" : "LOCATION ON THE MAP OF KAZAKHSTAN"}</strong>
                  <span>
                    {lang === "kz"
                      ? "Атырау облысы, Жылыой ауданы (46°59′ N, 54°01′ E). Батыс Қазақстанның мұнайлы қақпасы."
                      : lang === "ru"
                      ? "Атырауская область, Жылыойский район (46°59′ N, 54°01′ E). Западные энергетические ворота страны."
                      : "Atyrau Region, Zhylyoi District (46°59′ N, 54°01′ E). The western energy crossroads of Kazakhstan."}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 02. Wikipedia Facts Section */}
        <WikipediaFacts />

        {/* 03. District Settlements (11 settlements as states) */}
        <DistrictSettlements />

        {/* 04. Digital City & Industrial Hub Portal */}
        <CityHubPortal />

        {/* 05. Places & Routes */}
        <section className="places-section section-padding" id="places" aria-labelledby="places-title">
          <div className="page-container">
            <div data-reveal>
              <SectionLabel number="05">{t.places.label}</SectionLabel>
              <div className="section-heading-grid">
                <h2 id="places-title" className="section-title">
                  {t.places.title} <em>{t.places.titleEm}</em>
                </h2>
                <p className="section-intro">{t.places.intro}</p>
              </div>
            </div>

            <div className="places-grid">
              <div className="place-list places-list" data-reveal>
                {cityPlaces.map((place) => <PlaceRow key={place.number} {...place} />)}
              </div>
              <figure className="entrance-figure" data-reveal>
                <div className="image-window entrance-image-window">
                  <img src="https://www.gov.kz/uploads/2025/1/31/cf7c900e23f20c5fb7e4655db2fb7323_1280x720.jpeg" alt="Құлсары кіреберісі" />
                </div>
                <figcaption><span>ҚАЛАҒА КІРЕБЕРІС БЕЛГІСІ</span><span>Фото: gov.kz</span></figcaption>
              </figure>
            </div>

            <div className="routes" data-reveal>
              <div className="routes-heading">{t.places.routesHeading} <span>{t.places.routesSub}</span></div>
              <a href={mapDirections("Атырау, Қазақстан")} target="_blank" rel="noopener noreferrer">{t.places.atyrauRoute} <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href={mapDirections("Бейнеу, Маңғыстау облысы")} target="_blank" rel="noopener noreferrer">{t.places.beyneuRoute} <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href={mapDirections("Теңіз кен орны, Атырау облысы")} target="_blank" rel="noopener noreferrer">{t.places.tengizRoute} <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        {/* 06. Youth Section */}
        <section className="youth-section" id="life" aria-labelledby="youth-title">
          <div className="youth-grid">
            <div className="youth-copy" data-reveal>
              <SectionLabel number="06" light>{t.youth.label}</SectionLabel>
              <h2 id="youth-title" className="section-title">
                {t.youth.title} <em>{t.youth.titleEm}</em>
              </h2>
              <p className="youth-intro">{t.youth.intro}</p>

              <div className="activity-grid">
                {t.youth.items.map((activity) => (
                  <div className="activity-item" key={activity.number}>
                    <span>{activity.number}</span>
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                  </div>
                ))}
              </div>

              <div className="youth-links">
                <a className="underlined-link light-link" href={mapSearch("жастар орталығы спорт алаңы Құлсары")} target="_blank" rel="noopener noreferrer">
                  {t.youth.mapLink} <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <a className="underlined-link subtle-link" href="#family">
                  {t.youth.familyLink} <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="youth-image" data-reveal>
              <img src="/images/youth-life.jpg" alt="Жастар алаңы" />
            </div>
          </div>
        </section>

        {/* 07. Family Section */}
        <section className="family-section section-padding" id="family" aria-labelledby="family-title">
          <div className="page-container">
            <div data-reveal>
              <SectionLabel number="07">{t.family.label}</SectionLabel>
              <div className="section-heading-grid">
                <h2 id="family-title" className="section-title">
                  {t.family.title} <em>{t.family.titleEm}</em>
                </h2>
                <p className="section-intro">{t.family.intro}</p>
              </div>
            </div>

            <div className="family-grid">
              <figure className="family-figure" data-reveal>
                <div className="image-window family-image-window">
                  <img src="/images/lakeside-family.jpg" alt="Қамыскөл жағалауы" />
                </div>
                <figcaption>{t.family.caption}</figcaption>
              </figure>
              <div className="place-list family-list" data-reveal>
                {familyPlaces.map((place) => <PlaceRow key={place.number} {...place} />)}
                <p className="family-note">{t.family.note}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 08. Services Section */}
        <section className="services-section section-padding" id="services" aria-labelledby="services-title">
          <div className="page-container">
            <div data-reveal>
              <SectionLabel number="08" light>{t.services.label}</SectionLabel>
              <div className="section-heading-grid services-heading">
                <h2 id="services-title" className="section-title">
                  {t.services.title} <em>{t.services.titleEm}</em>
                </h2>
                <p className="section-intro">{t.services.intro}</p>
              </div>
            </div>

            <div className="services-grid">
              <div className="official-info" data-reveal>
                <p className="column-label">{t.services.officialTitle}</p>
                <h3>{t.services.officialAkimat}</h3>
                <p className="official-description">{t.services.officialDesc}</p>
                <dl className="contact-details">
                  <div><dt>{t.services.addressLabel}</dt><dd>{t.services.addressVal}</dd></div>
                  <div><dt>{t.services.phoneLabel}</dt><dd><a href="tel:+77123750683">+7 (71237) 5-06-83</a></dd></div>
                  <div><dt>{t.services.emailLabel}</dt><dd><a href="mailto:jylyoiakimat@atyrau.gov.kz">jylyoiakimat@atyrau.gov.kz</a></dd></div>
                </dl>
                <a className="underlined-link official-site-link" href="https://www.gov.kz/memleket/entities/atyrau-zhylyoy" target="_blank" rel="noopener noreferrer">
                  {t.services.officialSiteBtn} <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <p className="city-office">{t.services.cityOffice}</p>
              </div>

              <div className="emergency-info" data-reveal>
                <p className="column-label">{t.services.emergencyTitle}</p>
                <h3>{t.services.emergencySub}</h3>
                <p className="emergency-hint">{t.services.emergencyHint}</p>
                <div className="emergency-list">
                  {emergencyNumbers.map((service) => (
                    <a href={service.href} key={service.number} className="emergency-row" aria-label={`${service.label}: ${service.number}`}>
                      <strong>{service.number}</strong><span>{service.label}</span><Phone size={17} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <a className="utility-link" href="tel:+77123779089">
                  <span>{t.services.utilityText}</span><strong>+7 (71237) 7-90-89</strong><Phone size={16} aria-hidden="true" />
                </a>
              </div>
            </div>

            <a className="petition-link" href="https://eotinish.kz/kk/sendAppeal?orgId=13118" target="_blank" rel="noopener noreferrer" data-reveal>
              <span className="petition-kicker">{t.services.petitionKicker}</span>
              <span className="petition-main"><strong>{t.services.petitionTitle}</strong><span>{t.services.petitionDesc}</span></span>
              <span className="petition-arrow"><ArrowUpRight size={27} strokeWidth={1.5} aria-hidden="true" /></span>
            </a>
          </div>
        </section>

        {/* 09. Social Section */}
        <section className="social-section section-padding" id="social" aria-labelledby="social-title">
          <div className="page-container social-grid">
            <div className="social-intro" data-reveal>
              <SectionLabel number="09">{t.social.label}</SectionLabel>
              <h2 id="social-title" className="section-title">
                {t.social.title} <em>{t.social.titleEm}</em>
              </h2>
              <p>{t.social.desc}</p>
            </div>
            <div className="social-list" data-reveal>
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="social-row" key={`${item.platform}-${item.title}`}>
                    <span className="social-icon"><Icon size={21} strokeWidth={1.7} aria-hidden="true" /></span>
                    <span className="social-row-copy"><small>{item.platform}</small><strong>{item.title}</strong><span>{item.detail}</span></span>
                    <ArrowUpRight className="social-arrow" size={21} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" id="map">
        <div className="page-container">
          <div className="footer-main">
            <div className="footer-copy" data-reveal>
              <Brand />
              <h2>{t.footer.title} <em>{t.footer.titleEm}</em></h2>
              <p>{t.footer.countryText}</p>
              <a className="underlined-link light-link" href={mapSearch(cityQuery)} target="_blank" rel="noopener noreferrer">
                {t.footer.mapOpen} <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="footer-map" data-reveal>
              <a className="map-main-link" href={mapSearch(cityQuery)} target="_blank" rel="noopener noreferrer" aria-label="Карта">
                <img src="/images/qulsary-map.svg" alt="Карта" />
                <span className="map-pin" aria-hidden="true"><MapPin size={27} strokeWidth={2.2} /></span>
                <span className="map-bottom"><span>{t.footer.mapOpen} <ArrowUpRight size={17} aria-hidden="true" /></span></span>
              </a>
              <span className="map-attribution">{t.footer.mapAttribution}</span>
            </div>
          </div>
          <div className="footer-divider" />
          <nav className="footer-nav" aria-label="Төменгі мәзір">
            {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
            <a href="#home">{t.nav.toTop} <ArrowUpRight size={14} aria-hidden="true" /></a>
          </nav>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {t.footer.copyright}</span>
            <span>{t.footer.govRef}</span>
          </div>
          <p className="photo-note">{t.footer.photoNote}</p>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppMain />
      </LanguageProvider>
    </ThemeProvider>
  );
}
