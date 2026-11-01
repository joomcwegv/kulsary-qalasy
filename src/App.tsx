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

const cityQuery = "Құлсары, Атырау облысы, Қазақстан";
const mapSearch = (place: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
const mapDirections = (origin: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(cityQuery)}&travelmode=driving`;

const navigation = [
  { label: "Тарихы", href: "#history" },
  { label: "Көрікті орындар", href: "#places" },
  { label: "Жастар мен үлкендерге", href: "#life" },
  { label: "Әкімдік & байланыс", href: "#services" },
  { label: "Әлеуметтік желілер", href: "#social" },
];

const historyPlaces = [
  {
    number: "01",
    title: "Құлсары ата кесенесі",
    description:
      "Қала атауына арқау болған киелі мекен. Тарихи қорым 6-ауыл аумағында орналасқан.",
    href: mapSearch("Құлсары ата қорымы, 6-ауыл, Құлсары"),
  },
  {
    number: "02",
    title: "Ақмешіт / Бекет ата",
    description:
      "Ақкиізтоғай маңындағы Жем бойында орналасқан рухани және тарихи мұра.",
    href: mapSearch("Ақмешіт қорымы Бекет ата Жылыой ауданы"),
  },
  {
    number: "03",
    title: "Жеңіс саябағы",
    description:
      "Майданнан оралмаған жерлестердің есімін сақтаған мемориалды орын.",
    href: mapSearch("Жеңіс саябағы Құлсары мемориал"),
  },
];

const cityPlaces = [
  {
    number: "01",
    title: "Арбат және орталық аллея",
    description: "Қаладағы серуен мен кездесуге арналған ашық кеңістік.",
    href: mapSearch("Арбат Құлсары қаласы"),
  },
  {
    number: "02",
    title: "Рәміздер алаңы",
    description: "Құлсары келбетін танытатын қоғамдық орындардың бірі.",
    href: mapSearch("Рәміздер алаңы Құлсары"),
  },
  {
    number: "03",
    title: "Қала қақпалары",
    description: "Атырау, Бейнеу және Теңіз бағытындағы кіреберіс белгілер.",
    href: mapSearch("Құлсары қаласына кіреберіс"),
  },
];

const youthActivities = [
  {
    number: "01",
    title: "Қозғалыс",
    description: "Жастар саябағы, футбол және street workout алаңдары.",
  },
  {
    number: "02",
    title: "Идеялар",
    description: "Коворкинг, жастар орталықтары және жаңа бастамалар.",
  },
  {
    number: "03",
    title: "Бос уақыт",
    description: "Кофеханалар, кино және PlayStation орындары.",
  },
  {
    number: "04",
    title: "Бірге әрекет",
    description: "Еріктілер қозғалысы мен қоғамдық жобалар.",
  },
];

const familyPlaces = [
  {
    number: "01",
    title: "Жасұлан саябағы",
    description: "Балалармен және жақындарыңызбен серуендеуге арналған орын.",
    href: mapSearch("Жасұлан саябағы Құлсары"),
  },
  {
    number: "02",
    title: "Орталық аллеялар",
    description: "Орындықтар, жасыл аймақтар мен субұрқақ маңындағы тыныш сәттер.",
    href: mapSearch("Құлсары орталық аллея саябақ"),
  },
  {
    number: "03",
    title: "Қамыскөл жағалауы",
    description: "Көл маңындағы табиғатты тамашалап, асықпай серуендеуге болады.",
    href: mapSearch("Қамыскөл көлі Құлсары"),
  },
];

const emergencyNumbers = [
  { number: "112", label: "ТЖД / бірыңғай жедел қызмет", href: "tel:112" },
  { number: "102", label: "Полиция", href: "tel:102" },
  { number: "103", label: "Жедел жәрдем", href: "tel:103" },
  { number: "101", label: "Өрт сөндіру қызметі", href: "tel:101" },
];

const socialLinks = [
  {
    icon: Camera,
    platform: "INSTAGRAM / РЕСМИ",
    title: "Құлсары қаласы әкімдігі",
    detail: "@qulsary_qalasy_akimdigi",
    href: "https://www.instagram.com/qulsary_qalasy_akimdigi/",
  },
  {
    icon: Camera,
    platform: "INSTAGRAM / РЕСМИ",
    title: "Жылыой ауданы әкімдігі",
    detail: "@jylyoi_audany_akimdigi",
    href: "https://www.instagram.com/jylyoi_audany_akimdigi/",
  },
  {
    icon: Camera,
    platform: "INSTAGRAM / ҚАЛАЛЫҚ ПАБЛИК",
    title: "Құлсары жаңалықтары",
    detail: "@kulsary_ze · тәуелсіз парақша",
    href: "https://www.instagram.com/kulsary_ze/",
  },
  {
    icon: Radio,
    platform: "ZELLO / ЖОЛ АҚПАРАТЫ",
    title: "Жол және такси арналары",
    detail: "Қолданбада «Құлсары» деп іздеңіз",
    href: "https://zello.com/",
  },
  {
    icon: SquarePlay,
    platform: "YOUTUBE / БЕЙНЕЛЕР",
    title: "Құлсары туралы видеолар",
    detail: "Деректі фильмдер мен қала шолулары",
    href: `https://www.youtube.com/results?search_query=${encodeURIComponent("Құлсары деректі фильм қала")}`,
  },
  {
    icon: Send,
    platform: "TELEGRAM / ХАБАРЛАМАЛАР",
    title: "ТЖМ ресми арнасы",
    detail: "Қауіпсіздік туралы жедел ақпарат",
    href: "https://t.me/qr_tjm",
  },
  {
    icon: MessageCircle,
    platform: "WHATSAPP / КОММУНАЛДЫҚ ҚЫЗМЕТ",
    title: "Жылыойсу байланысы",
    detail: "Су қызметіне тікелей жазу",
    href: "https://wa.me/77751951767",
  },
];

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a className="brand" href="#home" aria-label="Құлсары - басты бет" onClick={onClick}>
      <svg className="brand-mark" viewBox="0 0 46 46" fill="none" aria-hidden="true">
        <circle cx="23" cy="18" r="9" fill="currentColor" />
        <path d="M3 32H43M9 38H37" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 27H38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
      <a className="skip-link" href="#main">Негізгі мазмұнға өту</a>

      <header className={`site-header${isScrolled ? " site-header-scrolled" : ""}`}>
        <div className="site-header-inner page-container">
          <Brand />

          <nav className="desktop-nav" aria-label="Негізгі мәзір">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>{item.label}</a>
            ))}
          </nav>

          <a className="header-map" href={mapSearch(cityQuery)} target="_blank" rel="noopener noreferrer">
            <MapPin size={16} strokeWidth={1.8} aria-hidden="true" />
            <span>Карта</span>
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
      </header>

      {menuOpen && (
        <div className="mobile-menu" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Навигация мәзірі">
          <div className="mobile-menu-top">
            <Brand onClick={() => setMenuOpen(false)} />
            <button className="mobile-menu-close" type="button" aria-label="Мәзірді жабу" onClick={() => setMenuOpen(false)}>
              <X size={27} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
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
            <MapPin size={18} aria-hidden="true" /> Құлсарыны картадан ашу <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      )}

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content page-container">
            <div className="hero-copy">
              <p className="hero-eyebrow"><span aria-hidden="true" /> Атырау облысы · Жылыой ауданы</p>
              <h1 id="hero-title">
                <span className="hero-brand-name">Құлсары</span>
                <span className="hero-statement">— Мұнайлы өлке жүрегі,<br className="hero-line-break" /> тарих пен болашақ тоғысқан мекен!</span>
              </h1>
              <p className="hero-description">Қасиетті мекеннен бүгінгі қала өміріне дейін - Құлсарыны бір жерден таныңыз.</p>
              <div className="hero-actions">
                <a className="primary-button" href="#history">Қаланы таныңыз <ArrowUpRight size={19} strokeWidth={1.9} aria-hidden="true" /></a>
                <a className="hero-text-link" href={mapSearch(cityQuery)} target="_blank" rel="noopener noreferrer">Картадан қарау <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
          <a className="hero-scroll" href="#history" aria-label="Тарих бөліміне төмен жылжу">
            <span>ТӨМЕН ҚАРАЙ</span><ArrowDown size={17} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </section>

        <section className="history-section section-padding" id="history" aria-labelledby="history-title">
          <div className="page-container">
            <div data-reveal>
              <SectionLabel number="01">ТАРИХЫ МЕН КИЕЛІ МЕКЕНДЕР</SectionLabel>
              <div className="section-heading-grid">
                <h2 id="history-title" className="section-title">Бір атаудан басталған <em>үлкен тарих.</em></h2>
                <p className="section-intro">Құлсарының тамыры киелі далада, ал тарихы осы мекенді мекендеген адамдардың жадында сақталған.</p>
              </div>
            </div>

            <div className="history-grid">
              <figure className="history-figure" data-reveal>
                <div className="image-window history-image-window">
                  <img src="https://atyrau-heritage.kz/images/qr/30_1.jpg" alt="Құлсары ата қорымындағы кесене" />
                </div>
                <figcaption><span>ҚҰЛСАРЫ АТА ҚОРЫМЫ · 6-АУЫЛ</span><span>Фото: atyrau-heritage.kz</span></figcaption>
              </figure>

              <div className="history-right" data-reveal>
                <div className="place-list">
                  {historyPlaces.map((place) => <PlaceRow key={place.number} {...place} />)}
                </div>
                <figure className="akmeshit-figure">
                  <div className="image-window akmeshit-image-window">
                    <img src="https://visitatyrau.kz/wp-content/uploads/sites/7/2024/12/02-1.jpg" alt="Жылыой ауданындағы Ақмешіт қорымының әуеден көрінісі" />
                  </div>
                  <figcaption>АҚМЕШІТ ҚОРЫМЫ · Фото: Visit Atyrau</figcaption>
                </figure>
              </div>
            </div>

            <div className="history-source" data-reveal>
              <span>Туған өлкенің тарихы әр буынмен жалғасады.</span>
              <a href="https://atamura-zhmuzei.kz/?page_id=734" target="_blank" rel="noopener noreferrer">Жылыой тарихын оқу <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="places-section section-padding" id="places" aria-labelledby="places-title">
          <div className="page-container">
            <div data-reveal>
              <SectionLabel number="02">КӨРІКТІ ОРЫНДАР & ҚАЛАҒА ЖОЛ</SectionLabel>
              <div className="section-heading-grid">
                <h2 id="places-title" className="section-title">Әр бұрышта <em>қаланың өз үні бар.</em></h2>
                <p className="section-intro">Қала орталығынан кіреберіс қақпаларына дейін өз бағытыңызды табыңыз.</p>
              </div>
            </div>

            <div className="places-grid">
              <div className="place-list places-list" data-reveal>
                {cityPlaces.map((place) => <PlaceRow key={place.number} {...place} />)}
              </div>
              <figure className="entrance-figure" data-reveal>
                <div className="image-window entrance-image-window">
                  <img src="https://www.gov.kz/uploads/2025/1/31/cf7c900e23f20c5fb7e4655db2fb7323_1280x720.jpeg" alt="Құлсары қаласының кіреберісіндегі Qulsary жазуы" />
                </div>
                <figcaption><span>ҚАЛАҒА КІРЕБЕРІС БЕЛГІСІ</span><span>Фото: Жылыой ауданы әкімдігі</span></figcaption>
              </figure>
            </div>

            <div className="routes" data-reveal>
              <div className="routes-heading">ҚҰЛСАРЫҒА ЖОЛ <span>Қай бағыттан келесіз?</span></div>
              <a href={mapDirections("Атырау, Қазақстан")} target="_blank" rel="noopener noreferrer">Атырау бағыты <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href={mapDirections("Бейнеу, Маңғыстау облысы")} target="_blank" rel="noopener noreferrer">Бейнеу бағыты <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href={mapDirections("Теңіз кен орны, Атырау облысы")} target="_blank" rel="noopener noreferrer">Теңіз бағыты <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="youth-section" id="life" aria-labelledby="youth-title">
          <div className="youth-grid">
            <div className="youth-copy" data-reveal>
              <SectionLabel number="03" light>ЖАСТАРҒА · ACTIVE LIFE</SectionLabel>
              <h2 id="youth-title" className="section-title">Ертеңді бүгін <em>жасайтын қала.</em></h2>
              <p className="youth-intro">Қозғалыс, жаңа идея және өз ортаңды табуға мүмкіндік беретін қалалық өмір.</p>

              <div className="activity-grid">
                {youthActivities.map((activity) => (
                  <div className="activity-item" key={activity.number}>
                    <span>{activity.number}</span>
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                  </div>
                ))}
              </div>

              <div className="youth-links">
                <a className="underlined-link light-link" href={mapSearch("жастар орталығы спорт алаңы Құлсары")} target="_blank" rel="noopener noreferrer">Орындарды картадан көру <ArrowUpRight size={17} aria-hidden="true" /></a>
                <a className="underlined-link subtle-link" href="#family">Отбасылық демалыс <ArrowRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="youth-image" data-reveal>
              <img src="/images/youth-life.jpg" alt="Қаладағы ашық спорт алаңында ойнап жүрген жастардың иллюстрациялық көрінісі" />
            </div>
          </div>
        </section>

        <section className="family-section section-padding" id="family" aria-labelledby="family-title">
          <div className="page-container">
            <div data-reveal>
              <SectionLabel number="04">АҒА БУЫН МЕН ОТБАСЫҒА</SectionLabel>
              <div className="section-heading-grid">
                <h2 id="family-title" className="section-title">Асықпай серуендеуге <em>уақыт табыңыз.</em></h2>
                <p className="section-intro">Отбасымен бірге өткізген жайлы кештер мен тыныш демалысқа арналған мекендер.</p>
              </div>
            </div>

            <div className="family-grid">
              <figure className="family-figure" data-reveal>
                <div className="image-window family-image-window">
                  <img src="/images/lakeside-family.jpg" alt="Қамыскөл тақырыбындағы көл жағасымен серуендеп жүрген отбасының иллюстрациялық көрінісі" />
                </div>
                <figcaption>ҚАМЫСКӨЛ ТАҚЫРЫБЫНДАҒЫ ИЛЛЮСТРАЦИЯЛЫҚ КӨРІНІС</figcaption>
              </figure>
              <div className="place-list family-list" data-reveal>
                {familyPlaces.map((place) => <PlaceRow key={place.number} {...place} />)}
                <p className="family-note">Көл маңына барар алдында ауа райы мен жағалау жағдайын тексеріңіз.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section section-padding" id="services" aria-labelledby="services-title">
          <div className="page-container">
            <div data-reveal>
              <SectionLabel number="05" light>ӘКІМДІК & БАЙЛАНЫС</SectionLabel>
              <div className="section-heading-grid services-heading">
                <h2 id="services-title" className="section-title">Қажет ақпаратқа <em>бір қадам.</em></h2>
                <p className="section-intro">Ресми мекенжай, өтініш жолдау және жедел нөмірлер - бәрі бір жерде.</p>
              </div>
            </div>

            <div className="services-grid">
              <div className="official-info" data-reveal>
                <p className="column-label">РЕСМИ АҚПАРАТ</p>
                <h3>Жылыой ауданының әкімдігі</h3>
                <p className="official-description">Құлсары - Жылыой ауданының орталығы. Әкімдіктің жаңалықтары мен мемлекеттік қызметтері ресми порталда жарияланады.</p>
                <dl className="contact-details">
                  <div><dt>Мекенжай</dt><dd>Құлсары қ., Махамбет Өтемісұлы даңғылы, 26</dd></div>
                  <div><dt>Телефон</dt><dd><a href="tel:+77123750683">+7 (71237) 5-06-83</a></dd></div>
                  <div><dt>Электрондық пошта</dt><dd><a href="mailto:jylyoiakimat@atyrau.gov.kz">jylyoiakimat@atyrau.gov.kz</a></dd></div>
                </dl>
                <a className="underlined-link official-site-link" href="https://www.gov.kz/memleket/entities/atyrau-zhylyoy" target="_blank" rel="noopener noreferrer">Әкімдіктің ресми сайты <ArrowUpRight size={18} aria-hidden="true" /></a>
                <p className="city-office">Құлсары қаласы әкімі аппараты: Ұ. Әбдірахманов көшесі, 27.</p>
              </div>

              <div className="emergency-info" data-reveal>
                <p className="column-label">ЖЕДЕЛ ҚЫЗМЕТТЕР</p>
                <h3>Көмек керек пе?</h3>
                <p className="emergency-hint">Қоңырау шалу үшін нөмірді басыңыз.</p>
                <div className="emergency-list">
                  {emergencyNumbers.map((service) => (
                    <a href={service.href} key={service.number} className="emergency-row" aria-label={`${service.label}: ${service.number} нөміріне қоңырау шалу`}>
                      <strong>{service.number}</strong><span>{service.label}</span><Phone size={17} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <a className="utility-link" href="tel:+77123779089"><span>Коммуналдық су қызметі · Жылыойсу</span><strong>+7 (71237) 7-90-89</strong><Phone size={16} aria-hidden="true" /></a>
              </div>
            </div>

            <a className="petition-link" href="https://eotinish.kz/kk/sendAppeal?orgId=13118" target="_blank" rel="noopener noreferrer" data-reveal>
              <span className="petition-kicker">ТҰРҒЫНДАРҒА</span>
              <span className="petition-main"><strong>Өтінішіңіз бар ма?</strong><span>e-Otinish арқылы Жылыой ауданы әкімдігіне жолдаңыз.</span></span>
              <span className="petition-arrow"><ArrowUpRight size={27} strokeWidth={1.5} aria-hidden="true" /></span>
            </a>
          </div>
        </section>

        <section className="social-section section-padding" id="social" aria-labelledby="social-title">
          <div className="page-container social-grid">
            <div className="social-intro" data-reveal>
              <SectionLabel number="06">ӘЛЕУМЕТТІК ЖЕЛІЛЕР</SectionLabel>
              <h2 id="social-title" className="section-title">Қаламен <em>байланыста болыңыз.</em></h2>
              <p>Ресми парақшалар, жергілікті жаңалықтар мен пайдалы арналар. Жеке топтарға қосыларда сілтемесін тексеріңіз.</p>
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

      <footer className="footer" id="map">
        <div className="page-container">
          <div className="footer-main">
            <div className="footer-copy" data-reveal>
              <Brand />
              <h2>Жолымыз <em>Құлсарыда</em> тоғысады.</h2>
              <p>Қазақстан, Атырау облысы, Жылыой ауданы.</p>
              <a className="underlined-link light-link" href={mapSearch(cityQuery)} target="_blank" rel="noopener noreferrer">Google Maps-та ашу <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
            <div className="footer-map" data-reveal>
              <a className="map-main-link" href={mapSearch(cityQuery)} target="_blank" rel="noopener noreferrer" aria-label="Құлсары қаласының картасын Google Maps-та ашу">
                <img src="/images/qulsary-map.svg" alt="Құлсары мен Қамыскөл маңының схемалық картасы" />
                <span className="map-pin" aria-hidden="true"><MapPin size={27} strokeWidth={2.2} /></span>
                <span className="map-bottom"><span>Google Maps-та ашу <ArrowUpRight size={17} aria-hidden="true" /></span></span>
              </a>
              <span className="map-attribution">СХЕМАЛЫҚ КАРТА · 46.98° N</span>
            </div>
          </div>
          <div className="footer-divider" />
          <nav className="footer-nav" aria-label="Төменгі мәзір">
            {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
            <a href="#home">Жоғарыға <ArrowUpRight size={14} aria-hidden="true" /></a>
          </nav>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Құлсары туралы ақпараттық прототип</span>
            <span>Ресми ақпаратты <a href="https://www.gov.kz/memleket/entities/atyrau-zhylyoy" target="_blank" rel="noopener noreferrer">gov.kz</a> сайтынан нақтылаңыз.</span>
          </div>
          <p className="photo-note">Нақты нысан фотолары: atyrau-heritage.kz, Visit Atyrau және Жылыой ауданы әкімдігі. Қалған көріністер иллюстрациялық сипатта.</p>
        </div>
      </footer>
    </>
  );
}