export type Language = "kz" | "ru" | "en";

export interface Translations {
  nav: {
    history: string;
    wiki: string;
    settlements: string;
    places: string;
    life: string;
    services: string;
    social: string;
    map: string;
    openMap: string;
    toTop: string;
  };
  hero: {
    eyebrow: string;
    brandName: string;
    statement: string;
    description: string;
    exploreBtn: string;
    mapBtn: string;
    scrollDown: string;
  };
  weather: {
    city: string;
    feelsLike: string;
    wind: string;
    windUnit: string;
    humidity: string;
    loading: string;
    detailsTitle: string;
    source: string;
    conditions: Record<string, string>;
  };
  wiki: {
    label: string;
    title: string;
    titleEm: string;
    intro: string;
    stats: {
      year1939: { label: string; detail: string };
      year2001: { label: string; detail: string };
      pop: { label: string; detail: string };
      dist: { label: string; detail: string };
    };
    cards: Array<{ title: string; desc: string }>;
    bannerTitle: string;
    bannerDesc: string;
    openRuBtn: string;
    openKzBtn: string;
  };
  settlements: {
    sectionNum: string;
    sectionLabel: string;
    title: string;
    titleEm: string;
    intro: string;
    summary: {
      city: string;
      towns: string;
      villages: string;
      historic: string;
    };
    tabs: {
      all: string;
      cityTown: string;
      village: string;
      historic: string;
    };
    searchPlaceholder: string;
    openMapBtn: string;
  };
  places: {
    label: string;
    title: string;
    titleEm: string;
    intro: string;
    routesHeading: string;
    routesSub: string;
    atyrauRoute: string;
    beyneuRoute: string;
    tengizRoute: string;
  };
  youth: {
    label: string;
    title: string;
    titleEm: string;
    intro: string;
    items: Array<{ number: string; title: string; description: string }>;
    mapLink: string;
    familyLink: string;
  };
  family: {
    label: string;
    title: string;
    titleEm: string;
    intro: string;
    caption: string;
    note: string;
  };
  services: {
    label: string;
    title: string;
    titleEm: string;
    intro: string;
    officialTitle: string;
    officialAkimat: string;
    officialDesc: string;
    addressLabel: string;
    addressVal: string;
    phoneLabel: string;
    emailLabel: string;
    officialSiteBtn: string;
    cityOffice: string;
    emergencyTitle: string;
    emergencySub: string;
    emergencyHint: string;
    utilityText: string;
    petitionKicker: string;
    petitionTitle: string;
    petitionDesc: string;
  };
  social: {
    label: string;
    title: string;
    titleEm: string;
    desc: string;
  };
  footer: {
    title: string;
    titleEm: string;
    countryText: string;
    mapOpen: string;
    mapAttribution: string;
    copyright: string;
    govRef: string;
    photoNote: string;
  };
}

export const translations: Record<Language, Translations> = {
  kz: {
    nav: {
      history: "Тарихы",
      wiki: "Деректер",
      settlements: "Елді мекендер",
      places: "Көрікті орындар",
      life: "Жастарға",
      services: "Әкімдік & байланыс",
      social: "Әлеуметтік желілер",
      map: "Карта",
      openMap: "Құлсарыны картадан ашу",
      toTop: "Жоғарыға",
    },
    hero: {
      eyebrow: "Атырау облысы · Жылыой ауданы",
      brandName: "Құлсары",
      statement: "— Мұнайлы өлке жүрегі, тарих пен болашақ тоғысқан мекен!",
      description: "Қасиетті мекеннен бүгінгі қала өміріне дейін - Құлсарыны бір жерден таныңыз.",
      exploreBtn: "Қаланы таныңыз",
      mapBtn: "Картадан қарау",
      scrollDown: "ТӨМЕН ҚАРАЙ",
    },
    weather: {
      city: "Құлсары",
      feelsLike: "Сезілуі",
      wind: "Жел",
      windUnit: "м/с",
      humidity: "Ылғалдылық",
      loading: "Ауа райы анықталуда...",
      detailsTitle: "Құлсары қаласының ауа райы",
      source: "OpenWeather API дерегі",
      conditions: {
        "clear sky": "Ашық аспан",
        "clear": "Ашық аспан",
        "few clouds": "Аздап бұлтты",
        "scattered clouds": "Шашыраңқы бұлтты",
        "broken clouds": "Бұлтты",
        "overcast clouds": "Тұтас бұлтты",
        "clouds": "Бұлтты",
        "shower rain": "Нөсерлі жаңбыр",
        "rain": "Жаңбыр",
        "light rain": "Жеңіл жаңбыр",
        "moderate rain": "Қалыпты жаңбыр",
        "heavy intensity rain": "Қатты жаңбыр",
        "thunderstorm": "Найзағайлы жаңбыр",
        "snow": "Қар",
        "light snow": "Аздаған қар",
        "heavy snow": "Қалың қар",
        "mist": "Тұман",
        "fog": "Қалың тұман",
        "haze": "Мұнар",
        "dust": "Шаңды дауыл",
        "sand": "Құмды дауыл",
      },
    },
    wiki: {
      label: "ЭНЦИКЛОПЕДИЯ · WIKIPEDIA ДЕРЕКТЕРІ",
      title: "Құлсары",
      titleEm: "цифрлар мен нақты деректерде.",
      intro: "Википедияның ресми ақпараттық қорынан жинақталған қаланың тарихи шежіресі, даму кезеңдері мен маңызды көрсеткіштері.",
      stats: {
        year1939: {
          label: "ҚАЛА НЕГІЗІ ҚАЛАНҒАН ЖЫЛ",
          detail: "Алғашқы №10 ұңғымадан мұнай атқылап, өндіріс басталды",
        },
        year2001: {
          label: "РЕСМИ ҚАЛА МӘРТЕБЕСІ",
          detail: "22 қыркүйектегі ҚР Үкіметінің №685 қаулысымен қала дәрежесі берілді",
        },
        pop: {
          label: "ҚАЛА ТҰРҒЫНДАРЫНЫҢ САНЫ",
          detail: "Жылыой ауданының қарқынды дамып келе жатқан әкімшілік орталығы",
        },
        dist: {
          label: "АТЫРАУ ОРТАЛЫҒЫНА ДЕЙІН",
          detail: "Қамыскөл жағалауында, Мақат–Бейнеу теміржолының бойында",
        },
      },
      cards: [
        {
          title: "Мұнайлы өлке жүрегі",
          desc: "Құлсары — әлемдегі ең ірі Теңіз кен орнын игерудің басты логистикалық орталығы. Қала арқылы «Орталық Азия — Орталық» құбырлары мен теміржол өтеді.",
        },
        {
          title: "Тарихи ерлік пен тағылым",
          desc: "Қала атауы XIX ғасырдағы беделді Құлсары ата есімімен байланысты. ҰОС кезінде мұндағы шағын бензин зауыты тікелей майданға жанармай жөнелткен.",
        },
        {
          title: "Мәдениет пен білім",
          desc: "Әлемге әйгілі сирек контратенор опера әншісі Ерік Құрманғалиев осы топырақта туған. Қалада Сафи Өтебаев атындағы мұнай-газ колледжі бар.",
        },
      ],
      bannerTitle: "«Кульсары» мақаласының толық нұсқасы",
      bannerDesc: "Географиялық координаттары (46°59′ с. ш. 54°01′ в. д.), климаты, экологиясы мен толық библиографиясын оқыңыз.",
      openRuBtn: "Википедияда ашу (Орысша)",
      openKzBtn: "Қазақша Википедия",
    },
    settlements: {
      sectionNum: "03",
      sectionLabel: "ЖЫЛЫОЙ АУДАНЫНЫҢ АУМАҚТЫҚ ҚҰРАМЫ · 11 ЕЛДІ МЕКЕН",
      title: "Жылыойдың",
      titleEm: "елді мекендері мен өңірлері.",
      intro: "Құлсары қаласынан бастап іргелес кенттерге, Жем бойындағы ауылдар мен тарихи мекендерге дейін — әр өлкенің өз тарихы бар.",
      summary: {
        city: "ҚАЛА (ҚҰЛСАРЫ)",
        towns: "КЕНТ (ЖАҢА ҚАРАТОН, ҚОСШАҒЫЛ)",
        villages: "АУЫЛДЫҚ ОКРУГ & ЕЛДІ МЕКЕН",
        historic: "ТАРИХИ КЕНТ (САРЫҚАМЫС)",
      },
      tabs: {
        all: "Барлығы (11)",
        cityTown: "Қала & Кенттер (3)",
        village: "Ауылдық округтер (7)",
        historic: "Тарихи мекендер (1)",
      },
      searchPlaceholder: "Елді мекенді іздеу (мысалы: Ақкиізтоғай)...",
      openMapBtn: "Картадан ашу",
    },
    places: {
      label: "КӨРІКТІ ОРЫНДАР & ҚАЛАҒА ЖОЛ",
      title: "Әр бұрышта",
      titleEm: "қаланың өз үні бар.",
      intro: "Қала орталығынан кіреберіс қақпаларына дейін өз бағытыңызды табыңыз.",
      routesHeading: "ҚҰЛСАРЫҒА ЖОЛ",
      routesSub: "Қай бағыттан келесіз?",
      atyrauRoute: "Атырау бағыты",
      beyneuRoute: "Бейнеу бағыты",
      tengizRoute: "Теңіз бағыты",
    },
    youth: {
      label: "ЖАСТАРҒА · ACTIVE LIFE",
      title: "Ертеңді бүгін",
      titleEm: "жасайтын қала.",
      intro: "Қозғалыс, жаңа идея және өз ортаңды табуға мүмкіндік беретін қалалық өмір.",
      items: [
        { number: "01", title: "Қозғалыс", description: "Жастар саябағы, футбол және street workout алаңдары." },
        { number: "02", title: "Идеялар", description: "Коворкинг, жастар орталықтары және жаңа бастамалар." },
        { number: "03", title: "Бос уақыт", description: "Кофеханалар, кино және PlayStation орындары." },
        { number: "04", title: "Бірге әрекет", description: "Еріктілер қозғалысы мен қоғамдық жобалар." },
      ],
      mapLink: "Орындарды картадан көру",
      familyLink: "Отбасылық демалыс",
    },
    family: {
      label: "АҒА БУЫН МЕН ОТБАСЫҒА",
      title: "Асықпай серуендеуге",
      titleEm: "уақыт табыңыз.",
      intro: "Отбасымен бірге өткізген жайлы кештер мен тыныш демалысқа арналған мекендер.",
      caption: "ҚАМЫСКӨЛ ТАҚЫРЫБЫНДАҒЫ ИЛЛЮСТРАЦИЯЛЫҚ КӨРІНІС",
      note: "Көл маңына барар алдында ауа райы мен жағалау жағдайын тексеріңіз.",
    },
    services: {
      label: "ӘКІМДІК & БАЙЛАНЫС",
      title: "Қажет ақпаратқа",
      titleEm: "бір қадам.",
      intro: "Ресми мекенжай, өтініш жолдау және жедел нөмірлер - бәрі бір жерде.",
      officialTitle: "РЕСМИ АҚПАРАТ",
      officialAkimat: "Жылыой ауданының әкімдігі",
      officialDesc: "Құлсары - Жылыой ауданының орталығы. Әкімдіктің жаңалықтары мен қызметтері ресми порталда жарияланады.",
      addressLabel: "Мекенжай",
      addressVal: "Құлсары қ., Махамбет Өтемісұлы даңғылы, 26",
      phoneLabel: "Телефон",
      emailLabel: "Электрондық пошта",
      officialSiteBtn: "Әкімдіктің ресми сайты",
      cityOffice: "Құлсары қаласы әкімі аппараты: Ұ. Әбдірахманов көшесі, 27.",
      emergencyTitle: "ЖЕДЕЛ ҚЫЗМЕТТЕР",
      emergencySub: "Көмек керек пе?",
      emergencyHint: "Қоңырау шалу үшін нөмірді басыңыз.",
      utilityText: "Коммуналдық су қызметі · Жылыойсу",
      petitionKicker: "ТҰРҒЫНДАРҒА",
      petitionTitle: "Өтінішіңіз бар ма?",
      petitionDesc: "e-Otinish арқылы Жылыой ауданы әкімдігіне жолдаңыз.",
    },
    social: {
      label: "ӘЛЕУМЕТТІК ЖЕЛІЛЕР",
      title: "Қаламен",
      titleEm: "байланыста болыңыз.",
      desc: "Ресми парақшалар, жергілікті жаңалықтар мен пайдалы арналар. Жеке топтарға қосыларда сілтемесін тексеріңіз.",
    },
    footer: {
      title: "Жолымыз",
      titleEm: "Құлсарыда тоғысады.",
      countryText: "Қазақстан, Атырау облысы, Жылыой ауданы.",
      mapOpen: "Google Maps-та ашу",
      mapAttribution: "СХЕМАЛЫҚ КАРТА · 46.98° N",
      copyright: "Құлсары туралы ақпараттық визитка-сайт",
      govRef: "Ресми ақпаратты gov.kz сайтынан нақтылаңыз.",
      photoNote: "Нақты нысан фотолары: atyrau-heritage.kz, Visit Atyrau және Жылыой ауданы әкімдігі.",
    },
  },
  ru: {
    nav: {
      history: "История",
      wiki: "Факты",
      settlements: "Населённые пункты",
      places: "Достопримечательности",
      life: "Молодёжи",
      services: "Акимат & Контакты",
      social: "Соцсети",
      map: "Карта",
      openMap: "Открыть Кульсары на карте",
      toTop: "Наверх",
    },
    hero: {
      eyebrow: "Атырауская область · Жылыойский район",
      brandName: "Кульсары",
      statement: "— Сердце нефтяного края, перекрёсток истории и будущего!",
      description: "От священных истоков до современного ритма — откройте для себя Кульсары в одном месте.",
      exploreBtn: "Узнать город",
      mapBtn: "Смотреть на карте",
      scrollDown: "ВНИЗ",
    },
    weather: {
      city: "Кульсары",
      feelsLike: "Ощущается",
      wind: "Ветер",
      windUnit: "м/с",
      humidity: "Влажность",
      loading: "Определение погоды...",
      detailsTitle: "Погода в городе Кульсары",
      source: "Данные OpenWeather API",
      conditions: {
        "clear sky": "Ясно",
        "clear": "Ясно",
        "few clouds": "Малооблачно",
        "scattered clouds": "Переменная облачность",
        "broken clouds": "Облачно с прояснениями",
        "overcast clouds": "Пасмурно",
        "clouds": "Облачно",
        "shower rain": "Ливневый дождь",
        "rain": "Дождь",
        "light rain": "Небольшой дождь",
        "moderate rain": "Умеренный дождь",
        "heavy intensity rain": "Сильный дождь",
        "thunderstorm": "Гроза",
        "snow": "Снег",
        "light snow": "Небольшой снег",
        "heavy snow": "Снегопад",
        "mist": "Туман",
        "fog": "Густой туман",
        "haze": "Мгла",
        "dust": "Пыльная буря",
        "sand": "Песчаная буря",
      },
    },
    wiki: {
      label: "ЭНЦИКЛОПЕДИЯ · ДАННЫЕ WIKIPEDIA",
      title: "Кульсары",
      titleEm: "в цифрах и фактах.",
      intro: "Историческая летопись, ключевые вехи развития и важнейшие показатели города из открытой энциклопедии Википедия.",
      stats: {
        year1939: {
          label: "ГОД ОСНОВАНИЯ ГОРОДА",
          detail: "Начало добычи нефти из скважины №10 и заложение рабочего посёлка",
        },
        year2001: {
          label: "ОФИЦИАЛЬНЫЙ СТАТУС ГОРОДА",
          detail: "Присвоен статус города постановлением Правительства РК №685 от 22 сентября",
        },
        pop: {
          label: "ЧИСЛЕННОСТЬ НАСЕЛЕНИЯ",
          detail: "66 000+ жителей, динамично развивающийся районный центр",
        },
        dist: {
          label: "РАССТОЯНИЕ ДО АТЫРАУ",
          detail: "220 км к востоку от областного центра, у озера Камысколь",
        },
      },
      cards: [
        {
          title: "Сердце нефтяного промысла",
          desc: "Кульсары — ключевой логистический хаб гигантского месторождения Тенгиз. Через город проходят магистрали «Средняя Азия — Центр» и ветка Макат-Бейнеу.",
        },
        {
          title: "История и подвиг",
          desc: "Город назван в честь почитаемого батыра и провидца Кульсары-ата. В годы ВОВ местный завод отправлял высокооктановый бензин прямо на фронт.",
        },
        {
          title: "Культура и образование",
          desc: "Родина оперного певца с уникальным голосом контртенора Эрика Курмангалиева. Здесь действует колледж нефти и газа им. Сафи Утебаева.",
        },
      ],
      bannerTitle: "Полная статья «Кульсары» в Википедии",
      bannerDesc: "Узнайте подробнее о координатах (46°59′ с. ш. 54°01′ в. д.), климате, геологии и источниках.",
      openRuBtn: "Открыть на Википедии (Русский)",
      openKzBtn: "Казахская Википедия",
    },
    settlements: {
      sectionNum: "03",
      sectionLabel: "ТЕРРИТОРИАЛЬНОЕ ДЕЛЕНИЕ ЖЫЛЫОЙСКОГО РАЙОНА · 11 ПУНКТОВ",
      title: "Населённые пункты",
      titleEm: "и регионы Жылыоя.",
      intro: "От столицы района Кульсары до нефтяных посёлков, сёл вдоль реки Эмба и памятных мест — каждое имеет своё значение.",
      summary: {
        city: "ГОРОД (КУЛЬСАРЫ)",
        towns: "ПОСЁЛКА (ЖАНА КАРАТОН, КОСЧАГИЛ)",
        villages: "СЕЛЬСКИХ ОКРУГОВ И СЁЛ",
        historic: "ИСТОРИЧЕСКИЙ ПОСЁЛОК (САРЫКАМЫС)",
      },
      tabs: {
        all: "Все (11)",
        cityTown: "Город и посёлки (3)",
        village: "Сельские округа (7)",
        historic: "Исторические (1)",
      },
      searchPlaceholder: "Поиск населённого пункта (напр: Аккиизтогай)...",
      openMapBtn: "На карте",
    },
    places: {
      label: "ДОСТОПРИМЕЧАТЕЛЬНОСТИ & ДОРОГА",
      title: "В каждом уголке",
      titleEm: "свой ритм города.",
      intro: "От центральных аллей до въездных ворот города — выберите свой маршрут.",
      routesHeading: "ДОРОГА В КУЛЬСАРЫ",
      routesSub: "С какого направления путь?",
      atyrauRoute: "Из Атырау",
      beyneuRoute: "Из Бейнеу",
      tengizRoute: "С Тенгиза",
    },
    youth: {
      label: "МОЛОДЁЖИ · ACTIVE LIFE",
      title: "Город,",
      titleEm: "созидающий завтрашний день.",
      intro: "Движение, спорт, свежие идеи и площадка для самореализации.",
      items: [
        { number: "01", title: "Движение", description: "Молодёжный парк, футбольные поля и площадки street workout." },
        { number: "02", title: "Идеи", description: "Коворкинги, центры молодёжи и творческие инициативы." },
        { number: "03", title: "Досуг", description: "Кофейни, кинотеатры и игровые зоны." },
        { number: "04", title: "Вместе", description: "Волонтёрское движение и общественные проекты." },
      ],
      mapLink: "Смотреть локации на карте",
      familyLink: "Семейный отдых",
    },
    family: {
      label: "СТАРШЕМУ ПОКОЛЕНИЮ И СЕМЬЯМ",
      title: "Найдите время",
      titleEm: "для неспешных прогулок.",
      intro: "Уютные вечера и спокойный отдых рядом с близкими.",
      caption: "ИЛЛЮСТРАЦИЯ: НАБЕРЕЖНАЯ ОЗЕРА КАМЫСКОЛЬ",
      note: "Перед прогулкой у озера проверьте погоду и состояние набережной.",
    },
    services: {
      label: "АКИМАТ & КОНТАКТЫ",
      title: "Вся важная информация",
      titleEm: "в один клик.",
      intro: "Официальные контакты, подача обращений и телефоны экстренных служб.",
      officialTitle: "ОФИЦИАЛЬНАЯ ИНФОРМАЦИЯ",
      officialAkimat: "Акимат Жылыойского района",
      officialDesc: "Кульсары — районный центр Жылыойского района. Новости и услуги публикуются на официальном госпортале.",
      addressLabel: "Адрес",
      addressVal: "г. Кульсары, проспект Махамбета Утемисулы, 26",
      phoneLabel: "Телефон",
      emailLabel: "Электронная почта",
      officialSiteBtn: "Официальный сайт акимата",
      cityOffice: "Аппарат акима города Кульсары: ул. У. Абдрахманова, 27.",
      emergencyTitle: "ЭКСТРЕННЫЕ СЛУЖБЫ",
      emergencySub: "Нужна помощь?",
      emergencyHint: "Нажмите на номер для вызова.",
      utilityText: "Коммунальная служба водоснабжения · Жылыойсу",
      petitionKicker: "ЖИТЕЛЯМ",
      petitionTitle: "Есть обращение?",
      petitionDesc: "Отправьте заявку в акимат через портал e-Otinish.",
    },
    social: {
      label: "СОЦИАЛЬНЫЕ СЕТИ",
      title: "Оставайтесь",
      titleEm: "на связи с городом.",
      desc: "Официальные аккаунты, городские паблики и полезные каналы.",
    },
    footer: {
      title: "Все дороги",
      titleEm: "ведут в Кульсары.",
      countryText: "Казахстан, Атырауская область, Жылыойский район.",
      mapOpen: "Открыть в Google Maps",
      mapAttribution: "СХЕМАТИЧЕСКАЯ КАРТА · 46.98° N",
      copyright: "Информационный сайт-визитка города Кульсары",
      govRef: "Официальную информацию уточняйте на gov.kz",
      photoNote: "Фотографии: atyrau-heritage.kz, Visit Atyrau и акимат Жылыойского района.",
    },
  },
  en: {
    nav: {
      history: "History",
      wiki: "Facts",
      settlements: "Settlements",
      places: "Attractions",
      life: "Youth",
      services: "Akimat & Contacts",
      social: "Social Media",
      map: "Map",
      openMap: "Open Kulsary on Map",
      toTop: "To top",
    },
    hero: {
      eyebrow: "Atyrau Region · Zhylyoi District",
      brandName: "Kulsary",
      statement: "— The Heart of the Oil Country, where history meets the future!",
      description: "From sacred heritage to the vibrant pulse of today — explore Kulsary in one unified guide.",
      exploreBtn: "Discover City",
      mapBtn: "View on Map",
      scrollDown: "SCROLL DOWN",
    },
    weather: {
      city: "Kulsary",
      feelsLike: "Feels like",
      wind: "Wind",
      windUnit: "m/s",
      humidity: "Humidity",
      loading: "Fetching weather...",
      detailsTitle: "Weather in Kulsary",
      source: "Live data via OpenWeather API",
      conditions: {
        "clear sky": "Clear sky",
        "clear": "Clear sky",
        "few clouds": "Few clouds",
        "scattered clouds": "Scattered clouds",
        "broken clouds": "Broken clouds",
        "overcast clouds": "Overcast",
        "clouds": "Cloudy",
        "shower rain": "Shower rain",
        "rain": "Rain",
        "light rain": "Light rain",
        "moderate rain": "Moderate rain",
        "heavy intensity rain": "Heavy rain",
        "thunderstorm": "Thunderstorm",
        "snow": "Snow",
        "light snow": "Light snow",
        "heavy snow": "Heavy snowfall",
        "mist": "Mist",
        "fog": "Dense fog",
        "haze": "Haze",
        "dust": "Dust storm",
        "sand": "Sandstorm",
      },
    },
    wiki: {
      label: "ENCYCLOPEDIA · WIKIPEDIA FACTS",
      title: "Kulsary",
      titleEm: "in numbers and facts.",
      intro: "Historical chronicles, economic significance, and key figures from the official open encyclopedia.",
      stats: {
        year1939: {
          label: "FOUNDATION YEAR",
          detail: "Oil exploration started at well #10 and industrial settlement began",
        },
        year2001: {
          label: "OFFICIAL CITY STATUS",
          detail: "Granted town status by RK Government Decree #685 on September 22",
        },
        pop: {
          label: "POPULATION",
          detail: "66,000+ residents, rapid growth administrative hub",
        },
        dist: {
          label: "DISTANCE TO ATYRAU",
          detail: "220 km east of the regional center, by Lake Kamyskol",
        },
      },
      cards: [
        {
          title: "Heart of the Oil Industry",
          desc: "Kulsary is the crucial logistics and transport hub for the giant Tengiz oilfield, intersected by the Central Asia–Center pipelines and railway.",
        },
        {
          title: "Sacred Heritage & Valour",
          desc: "Named after the venerated 19th-century leader Kulsary-ata. During WWII, the local refinery supplied military aviation gasoline directly to the front line.",
        },
        {
          title: "Culture & Education",
          desc: "Birthplace of world-renowned countertenor opera singer Erik Kurmangaliev. Home to the Safi Utebayev Oil & Gas College.",
        },
      ],
      bannerTitle: "Full Wikipedia Article on Kulsary",
      bannerDesc: "Read more about coordinates (46°59′ N 54°01′ E), climate, ecology, and bibliography.",
      openRuBtn: "Open Wikipedia (Russian)",
      openKzBtn: "Kazakh Wikipedia",
    },
    settlements: {
      sectionNum: "03",
      sectionLabel: "TERRITORIAL COMPOSITION OF ZHYLYOI DISTRICT · 11 SETTLEMENTS",
      title: "Settlements",
      titleEm: "and regions of Zhylyoi.",
      intro: "From the capital city Kulsary to oil settlements, villages along the Zhem river, and historical sites — each holds a unique story.",
      summary: {
        city: "CITY (KULSARY)",
        towns: "TOWNS (ZHANA KARATON, KOSCHAGYL)",
        villages: "RURAL DISTRICTS & VILLAGES",
        historic: "HISTORICAL TOWN (SARYKAMYS)",
      },
      tabs: {
        all: "All (11)",
        cityTown: "City & Towns (3)",
        village: "Rural Districts (7)",
        historic: "Historic (1)",
      },
      searchPlaceholder: "Search settlement (e.g. Akkiiztogai)...",
      openMapBtn: "Open Map",
    },
    places: {
      label: "SIGHTSEEING & ROUTES",
      title: "In every corner,",
      titleEm: "the city has its own voice.",
      intro: "From central alleys to the city gates, find your route.",
      routesHeading: "ROUTES TO KULSARY",
      routesSub: "Where are you coming from?",
      atyrauRoute: "Atyrau direction",
      beyneuRoute: "Beyneu direction",
      tengizRoute: "Tengiz direction",
    },
    youth: {
      label: "FOR YOUTH · ACTIVE LIFE",
      title: "A city",
      titleEm: "shaping tomorrow today.",
      intro: "Action, sports, new ideas, and finding your community in urban life.",
      items: [
        { number: "01", title: "Motion", description: "Youth park, soccer pitches, and street workout grounds." },
        { number: "02", title: "Ideas", description: "Coworking spaces, youth activity centers, and startups." },
        { number: "03", title: "Leisure", description: "Coffee shops, cinemas, and gaming lounges." },
        { number: "04", title: "Together", description: "Volunteer movements and civic community projects." },
      ],
      mapLink: "Explore places on map",
      familyLink: "Family recreation",
    },
    family: {
      label: "FOR SENIORS & FAMILIES",
      title: "Take time",
      titleEm: "for relaxed walks.",
      intro: "Cozy evenings and peaceful recreation with loved ones.",
      caption: "ILLUSTRATIVE VIEW OF LAKE KAMYSKOL PROMENADE",
      note: "Check local weather and shoreline conditions before visiting the lake.",
    },
    services: {
      label: "AKIMAT & CONTACTS",
      title: "Essential services",
      titleEm: "one click away.",
      intro: "Official addresses, petition submissions, and emergency hotlines in one place.",
      officialTitle: "OFFICIAL INFORMATION",
      officialAkimat: "Akimat of Zhylyoi District",
      officialDesc: "Kulsary is the administrative center of Zhylyoi district. News and state services are updated on gov.kz.",
      addressLabel: "Address",
      addressVal: "Kulsary, Makhambet Utemisuly Ave, 26",
      phoneLabel: "Phone",
      emailLabel: "Email",
      officialSiteBtn: "Official Akimat Website",
      cityOffice: "Kulsary City Akim Office: U. Abdirakhmanov St, 27.",
      emergencyTitle: "EMERGENCY SERVICES",
      emergencySub: "Need assistance?",
      emergencyHint: "Tap number to call directly.",
      utilityText: "Municipal water service · Zhylyoisu",
      petitionKicker: "FOR RESIDENTS",
      petitionTitle: "Have an official request?",
      petitionDesc: "Submit an official appeal to the akimat via e-Otinish.",
    },
    social: {
      label: "SOCIAL MEDIA",
      title: "Stay",
      titleEm: "connected with the city.",
      desc: "Official pages, municipal updates, and community channels.",
    },
    footer: {
      title: "All roads",
      titleEm: "meet in Kulsary.",
      countryText: "Kazakhstan, Atyrau Region, Zhylyoi District.",
      mapOpen: "Open in Google Maps",
      mapAttribution: "SCHEMATIC MAP · 46.98° N",
      copyright: "Kulsary City Information Showcase",
      govRef: "Verify official services on gov.kz",
      photoNote: "Photos courtesy of atyrau-heritage.kz, Visit Atyrau and Zhylyoi Akimat.",
    },
  },
};
