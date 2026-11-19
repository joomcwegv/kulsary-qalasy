import { useState, useEffect } from "react";
import {
  Lightbulb,
  Heart,
  Info,
  HandHeart,
  AlertTriangle,
  MessageSquare,
  ThumbsUp,
  Send,
  PlusCircle,
  X,
  MapPin,
  Clock,
  CheckCircle,
  Sparkles,
  Filter,
  Share2,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

export type ForumCorner = "all" | "proposal" | "wish" | "info" | "request" | "complaint";

export interface ForumComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  corner: "proposal" | "wish" | "info" | "request" | "complaint";
  title: string;
  author: string;
  location?: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  status: "new" | "discussing" | "reviewed" | "resolved";
  createdAt: string;
  comments: ForumComment[];
}

const STORAGE_KEY = "kulsary_forum_posts_v2";

const CORNER_CONFIG = {
  proposal: {
    key: "proposal",
    nameKz: "Ұсыныс бұрышы",
    nameRu: "Уголок предложений",
    nameEn: "Proposals Corner",
    descKz: "Қала дамуы мен жаңа бастамалар",
    color: "#d97706",
    bg: "rgba(217, 119, 6, 0.1)",
    border: "rgba(217, 119, 6, 0.3)",
    icon: Lightbulb,
  },
  wish: {
    key: "wish",
    nameKz: "Тілек бұрышы",
    nameRu: "Уголок пожеланий",
    nameEn: "Wishes & Thanks",
    descKz: "Алғыс, ізгі ниеттер мен құттықтаулар",
    color: "#059669",
    bg: "rgba(5, 150, 105, 0.1)",
    border: "rgba(5, 150, 105, 0.3)",
    icon: Heart,
  },
  info: {
    key: "info",
    nameKz: "Ақпарат бұрышы",
    nameRu: "Информационный уголок",
    nameEn: "Information Corner",
    descKz: "Хабарландырулар мен маңызды жайттар",
    color: "#2563eb",
    bg: "rgba(37, 99, 235, 0.1)",
    border: "rgba(37, 99, 235, 0.3)",
    icon: Info,
  },
  request: {
    key: "request",
    nameKz: "Өтініш бұрышы",
    nameRu: "Уголок обращений",
    nameEn: "Requests Corner",
    descKz: "Көмек сұрау, асар және сұрақтар",
    color: "#7c3aed",
    bg: "rgba(124, 58, 237, 0.1)",
    border: "rgba(124, 58, 237, 0.3)",
    icon: HandHeart,
  },
  complaint: {
    key: "complaint",
    nameKz: "Шағым бұрышы",
    nameRu: "Уголок жалоб",
    nameEn: "Complaints Corner",
    descKz: "Жол, жарық, су және сын-ескертпелер",
    color: "#dc2626",
    bg: "rgba(220, 38, 38, 0.1)",
    border: "rgba(220, 38, 38, 0.3)",
    icon: AlertTriangle,
  },
};

const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: "f-1",
    corner: "proposal",
    title: "Қамыскөл жағалауына күн батареясымен істейтін жарық пен веложолақ орнату",
    author: "Мұрат Жанұзақ",
    location: "Қамыскөл жағалау паркі",
    content:
      "Кешкі уақытта Қамыскөлге серуендеуге келетін тұрғындар мен жастар көп. Жағалау бойына энергия үнемдегіш LED шамдар мен велосипед жолын жасақтауды ұсынамын. Бұл қаламыздың көркін ашып, салауатты өмір салтын дамытады.",
    likes: 42,
    status: "discussing",
    createdAt: "Бүгін, 11:30",
    comments: [
      {
        id: "fc-1",
        author: "Айбек Құралов",
        text: "Өте жақсы ұсыныс! Әсіресе жастар үшін кешкі серуенге қауіпсіз әрі қолайлы болар еді.",
        createdAt: "30 мин бұрын",
      },
      {
        id: "fc-2",
        author: "Гүлнар Сағидолла",
        text: "Қоқыс жәшіктерін де қатар көбейтсе тіпті керемет болар еді.",
        createdAt: "15 мин бұрын",
      },
    ],
  },
  {
    id: "f-2",
    corner: "wish",
    title: "Жылыой халқына және барша ерікті азаматтарға мың алғыс!",
    author: "Ақмарал Сейітова",
    location: "Құлсары қаласы, 3-ауыл",
    content:
      "Қиын-қыстау сәтте бір жеңнен қол, бір жағадан бас шығарып ауызбіршілік танытқан барлық жылыойлық жерлестеріме зор денсаулық, отбасыларына амандық тілеймін! Құлсарымыз гүлдене берсін!",
    likes: 58,
    status: "reviewed",
    createdAt: "Кеше, 18:45",
    comments: [
      {
        id: "fc-3",
        author: "Ерлан Серікұлы",
        text: "Аумин! Бірлігіміз бекем болсын!",
        createdAt: "Кеше",
      },
    ],
  },
  {
    id: "f-3",
    corner: "info",
    title: "Аудандық емханада жаңа мамандар қабылдауы және цифрлық кезек",
    author: "Денсаулық хабаршысы",
    location: "Жылыой аудандық емханасы",
    content:
      "Құрметті қала тұрғындары! Емханада кардиолог және балалар неврологы қосымша қабылдау жүргізуде. Кезекке Damumed мобильді қосымшасы немесе тіркеу бөлімі арқылы жазылуға болады.",
    likes: 29,
    status: "resolved",
    createdAt: "19 қараша",
    comments: [],
  },
  {
    id: "f-4",
    corner: "request",
    title: "4-ауылдағы асар: жалғызбасты қарт анамыздың үйінің шатырын жөндеуге көмек",
    author: "Жылыой Жастары еріктілер тобы",
    location: "4-ауыл, Абай көшесі",
    content:
      "Осы демалыс күндері (сенбі) 4-ауылда тұратын зейнеткер анамызға қол ұшын созу мақсатында асар ұйымдастырамыз. Құрылыс құралдары бар және қол көмегін бере алатын ерікті жастарды қатарға шақырамыз.",
    likes: 37,
    status: "discussing",
    createdAt: "18 қараша",
    comments: [
      {
        id: "fc-4",
        author: "Дәурен",
        text: "Мен көлікпен бара аламын, құрал-саймандар бар. Байланыс нөмірін қалдырыңыздаршы.",
        createdAt: "1 күн бұрын",
      },
    ],
  },
  {
    id: "f-5",
    corner: "complaint",
    title: "№5 мектеп маңындағы жаяу жүргінші өткеліне жасанды кедергі (лежачий полицейский) қажет",
    author: "Ата-аналар комитеті",
    location: "Құлсары, №5 мектеп аумағы",
    content:
      "Сабақ уақытында көліктер өте қатты жылдамдықпен жүреді. Балалардың қауіпсіздігі үшін өткел маңына жылдамдықты шектейтін жол кедергісін және жарық шағылыстырғыш белгі қоюды сұраймыз.",
    likes: 51,
    status: "new",
    createdAt: "18 қараша",
    comments: [
      {
        id: "fc-5",
        author: "Серікбол",
        text: "Өте өзекті мәселе! Қала әкімдігі бұл мәселені тез арада шешуі тиіс.",
        createdAt: "2 күн бұрын",
      },
    ],
  },
];

export function CommunityForum() {
  const { lang } = useLanguage();
  const [activeCorner, setActiveCorner] = useState<ForumCorner>("all");
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [authorNameInput, setAuthorNameInput] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Жаңа жазба қалдыру формасының күйі
  const [newCorner, setNewCorner] = useState<"proposal" | "wish" | "info" | "request" | "complaint">("proposal");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newContent, setNewContent] = useState("");

  // localStorage-тен оқу
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPosts(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // localStorage-ке жазу
  const savePosts = (updated: ForumPost[]) => {
    setPosts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleLike = (id: string) => {
    const updated = posts.map((p) => {
      if (p.id === id) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
        };
      }
      return p;
    });
    savePosts(updated);
  };

  const handleAddComment = (postId: string) => {
    const text = (commentInputs[postId] || "").trim();
    if (!text) return;

    const author = authorNameInput.trim() || (lang === "kz" ? "Қала тұрғыны" : lang === "ru" ? "Житель города" : "City resident");

    const newComment: ForumComment = {
      id: `c-${Date.now()}`,
      author,
      text,
      createdAt: lang === "kz" ? "Жаңа ғана" : lang === "ru" ? "Только что" : "Just now",
    };

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment],
        };
      }
      return p;
    });

    savePosts(updated);
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const author = newAuthor.trim() || (lang === "kz" ? "Анонимді тұрғын" : lang === "ru" ? "Анонимный житель" : "Anonymous citizen");

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      corner: newCorner,
      title: newTitle.trim(),
      author,
      location: newLocation.trim() || undefined,
      content: newContent.trim(),
      likes: 1,
      isLiked: true,
      status: "new",
      createdAt: lang === "kz" ? "Жаңа ғана" : lang === "ru" ? "Только что" : "Just now",
      comments: [],
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    // reset form
    setNewTitle("");
    setNewLocation("");
    setNewContent("");
    setIsModalOpen(false);
  };

  const filteredPosts = activeCorner === "all" ? posts : posts.filter((p) => p.corner === activeCorner);

  const getStatusBadge = (status: ForumPost["status"]) => {
    switch (status) {
      case "new":
        return {
          text: lang === "kz" ? "Жаңа" : lang === "ru" ? "Новое" : "New",
          color: "#2563eb",
          bg: "rgba(37, 99, 235, 0.12)",
        };
      case "discussing":
        return {
          text: lang === "kz" ? "Талқылануда" : lang === "ru" ? "Обсуждается" : "Discussing",
          color: "#d97706",
          bg: "rgba(217, 119, 6, 0.12)",
        };
      case "reviewed":
        return {
          text: lang === "kz" ? "Қаралды" : lang === "ru" ? "Рассмотрено" : "Reviewed",
          color: "#059669",
          bg: "rgba(5, 150, 105, 0.12)",
        };
      case "resolved":
        return {
          text: lang === "kz" ? "Шешілді" : lang === "ru" ? "Решено" : "Resolved",
          color: "#16a34a",
          bg: "rgba(22, 163, 74, 0.12)",
        };
    }
  };

  return (
    <div className="community-forum-wrap" style={{ marginTop: "32px" }}>
      {/* Жоғарғы тақырыпша мен түсіндірме */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(23, 40, 43, 0.96) 0%, rgba(16, 30, 34, 0.98) 100%)",
          color: "#fff",
          borderRadius: "20px",
          padding: "clamp(24px, 3.5vw, 40px)",
          border: "1px solid rgba(232, 174, 88, 0.25)",
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.15)",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "30px",
                background: "rgba(232, 174, 88, 0.15)",
                color: "var(--gold)",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              <Sparkles size={15} />
              <span>
                {lang === "kz"
                  ? "Халық үні · Ашық қоғамдық мінбер"
                  : lang === "ru"
                  ? "Голос народа · Общественная трибуна"
                  : "Citizens' Voice · Community Board"}
              </span>
            </div>
            <h3
              style={{
                fontSize: "clamp(22px, 2.5vw, 32px)",
                fontWeight: 800,
                color: "#f7f4ed",
                margin: "0 0 8px 0",
                lineHeight: 1.25,
              }}
            >
              {lang === "kz"
                ? "Құлсары мен Жылыойдың Пікірталас Форумы"
                : lang === "ru"
                ? "Форум обсуждений города Кульсары и Жылыоя"
                : "Kulsary & Zhylyoi Discussion Forum"}
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "rgba(247, 244, 237, 0.75)",
                maxWidth: "720px",
                margin: 0,
                lineHeight: 1.55,
              }}
            >
              {lang === "kz"
                ? "Әрбір тұрғын ұсыныс білдіріп, тілегін жеткізіп, өзекті мәселелерді ашық талқылайтын интерактивті алаң. Мұнда 5 негізгі бұрыш жұмыс істейді."
                : lang === "ru"
                ? "Интерактивная площадка, где каждый житель может высказать предложение, пожелание или поднять важный вопрос."
                : "An open community platform for suggestions, wishes, announcements, requests, and issue discussions."}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, var(--gold) 0%, #d49a44 100%)",
              color: "#17282b",
              border: "none",
              borderRadius: "14px",
              padding: "14px 24px",
              fontSize: "15px",
              fontWeight: 800,
              boxShadow: "0 8px 24px rgba(232, 174, 88, 0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <PlusCircle size={20} />
            <span>
              {lang === "kz"
                ? "Жаңа жазба қалдыру"
                : lang === "ru"
                ? "Оставить запись"
                : "New Discussion Post"}
            </span>
          </button>
        </div>

        {/* 5 негізгі бұрыш батырмалары (Tabs) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "10px",
            marginTop: "26px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Барлығы */}
          <button
            onClick={() => setActiveCorner("all")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 14px",
              borderRadius: "12px",
              border: activeCorner === "all" ? "2px solid var(--gold)" : "1px solid rgba(255, 255, 255, 0.15)",
              background: activeCorner === "all" ? "rgba(232, 174, 88, 0.2)" : "rgba(255, 255, 255, 0.04)",
              color: activeCorner === "all" ? "var(--gold)" : "#f7f4ed",
              fontWeight: activeCorner === "all" ? 800 : 600,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <Filter size={16} />
            <span>{lang === "kz" ? "Барлығы" : lang === "ru" ? "Все" : "All"} ({posts.length})</span>
          </button>

          {/* 5 Бұрыш батырмалары */}
          {Object.entries(CORNER_CONFIG).map(([key, cfg]) => {
            const Icon = cfg.icon;
            const count = posts.filter((p) => p.corner === key).length;
            const isSelected = activeCorner === key;
            const name = lang === "kz" ? cfg.nameKz : lang === "ru" ? cfg.nameRu : cfg.nameEn;

            return (
              <button
                key={key}
                onClick={() => setActiveCorner(key as ForumCorner)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: isSelected ? `2px solid ${cfg.color}` : "1px solid rgba(255, 255, 255, 0.12)",
                  background: isSelected ? cfg.bg : "rgba(255, 255, 255, 0.04)",
                  color: isSelected ? cfg.color : "#f7f4ed",
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: "13.5px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Icon size={16} style={{ color: cfg.color }} />
                  <span>{name}</span>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.15)",
                    color: "#fff",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Жазбалар тізімі (Forum Cards Grid) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredPosts.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              textAlign: "center",
              background: "#fff",
              borderRadius: "16px",
              border: "1px dashed #d1d5db",
              color: "#6b7280",
            }}
          >
            <p style={{ fontSize: "16px", fontWeight: 600 }}>
              {lang === "kz"
                ? "Бұл бөлімде әзірге жазба жоқ. Алғашқы болып өз ойыңызды қосыңыз!"
                : lang === "ru"
                ? "В этом разделе пока нет записей. Будьте первыми!"
                : "No posts in this category yet. Be the first to share!"}
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const cornerCfg = CORNER_CONFIG[post.corner];
            const Icon = cornerCfg.icon;
            const cornerName = lang === "kz" ? cornerCfg.nameKz : lang === "ru" ? cornerCfg.nameRu : cornerCfg.nameEn;
            const statusBadge = getStatusBadge(post.status);
            const isExpanded = expandedPostId === post.id;

            return (
              <div
                key={post.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "clamp(18px, 2.5vw, 26px)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
                  border: `1px solid ${isExpanded ? cornerCfg.color : "#e5e7eb"}`,
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Карточканың жоғарғы жолы: Бұрыш тегі, орын, уақыт, статус */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        background: cornerCfg.bg,
                        color: cornerCfg.color,
                        fontWeight: 700,
                        fontSize: "12.5px",
                        border: `1px solid ${cornerCfg.border}`,
                      }}
                    >
                      <Icon size={14} />
                      <span>{cornerName}</span>
                    </span>

                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "14px",
                        background: statusBadge.bg,
                        color: statusBadge.color,
                        fontWeight: 700,
                        fontSize: "11.5px",
                      }}
                    >
                      {statusBadge.text}
                    </span>

                    {post.location && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#6b7280",
                          fontSize: "12.5px",
                        }}
                      >
                        <MapPin size={13} style={{ color: "var(--gold-deep)" }} />
                        <span>{post.location}</span>
                      </span>
                    )}
                  </div>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#9ca3af",
                      fontSize: "12px",
                    }}
                  >
                    <Clock size={12} />
                    <span>{post.createdAt}</span>
                  </span>
                </div>

                {/* Тақырыбы */}
                <h4
                  style={{
                    fontSize: "clamp(17px, 1.8vw, 20px)",
                    fontWeight: 800,
                    color: "#17282b",
                    margin: "0 0 10px 0",
                    lineHeight: 1.35,
                  }}
                >
                  {post.title}
                </h4>

                {/* Мәтіні */}
                <p
                  style={{
                    fontSize: "15px",
                    color: "#374151",
                    lineHeight: 1.6,
                    margin: "0 0 16px 0",
                    whiteSpace: "pre-line",
                  }}
                >
                  {post.content}
                </p>

                {/* Төменгі автор және әрекеттер жолы */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "14px",
                    borderTop: "1px solid #f3f4f6",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: cornerCfg.bg,
                        color: cornerCfg.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "13px",
                      }}
                    >
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong style={{ fontSize: "13.5px", color: "#111827", display: "block" }}>
                        {post.author}
                      </strong>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* Қолдау батырмасы */}
                    <button
                      onClick={() => handleLike(post.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 14px",
                        borderRadius: "10px",
                        border: post.isLiked ? "1px solid #059669" : "1px solid #e5e7eb",
                        background: post.isLiked ? "rgba(5, 150, 105, 0.1)" : "#f9fafb",
                        color: post.isLiked ? "#059669" : "#4b5563",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      <ThumbsUp size={15} style={{ fill: post.isLiked ? "currentColor" : "none" }} />
                      <span>{lang === "kz" ? "Қолдаймын" : lang === "ru" ? "Поддерживаю" : "Support"}</span>
                      <span style={{ fontWeight: 800 }}>({post.likes})</span>
                    </button>

                    {/* Пікірлерді ашу батырмасы */}
                    <button
                      onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 14px",
                        borderRadius: "10px",
                        border: "1px solid #e5e7eb",
                        background: isExpanded ? "rgba(23, 40, 43, 0.08)" : "#f9fafb",
                        color: "#17282b",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      <MessageSquare size={15} />
                      <span>{lang === "kz" ? "Талқылау" : lang === "ru" ? "Обсуждение" : "Replies"}</span>
                      <span style={{ fontWeight: 800 }}>({post.comments.length})</span>
                    </button>
                  </div>
                </div>

                {/* Кеңейтілген пікірталас бөлімі (Comments Thread) */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: "18px",
                      paddingTop: "16px",
                      borderTop: "1px dashed #e5e7eb",
                    }}
                  >
                    <h5
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#4b5563",
                        margin: "0 0 12px 0",
                      }}
                    >
                      {lang === "kz"
                        ? "Тұрғындардың пікірлері мен жауаптары:"
                        : lang === "ru"
                        ? "Мнения и ответы жителей:"
                        : "Citizens' Comments & Responses:"}
                    </h5>

                    {/* Пікірлер тізімі */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "14px" }}>
                      {post.comments.length === 0 ? (
                        <p style={{ fontSize: "13px", color: "#9ca3af", fontStyle: "italic", margin: 0 }}>
                          {lang === "kz"
                            ? "Әзірге пікір жоқ. Алғашқы болып өз пікіріңізді жазыңыз!"
                            : lang === "ru"
                            ? "Пока нет комментариев. Напишите первое мнение!"
                            : "No comments yet. Be the first to reply!"}
                        </p>
                      ) : (
                        post.comments.map((c) => (
                          <div
                            key={c.id}
                            style={{
                              background: "#f9fafb",
                              padding: "10px 14px",
                              borderRadius: "10px",
                              borderLeft: `3px solid ${cornerCfg.color}`,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "4px",
                              }}
                            >
                              <strong style={{ fontSize: "13px", color: "#111827" }}>{c.author}</strong>
                              <span style={{ fontSize: "11px", color: "#9ca3af" }}>{c.createdAt}</span>
                            </div>
                            <p style={{ fontSize: "13.5px", color: "#374151", margin: 0 }}>{c.text}</p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Жаңа пікір қосу формасы */}
                    <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                      <div style={{ flex: 1 }}>
                        <input
                          type="text"
                          placeholder={
                            lang === "kz"
                              ? "Атыңыз (мысалы: Нұрлан немесе Тұрғын)..."
                              : lang === "ru"
                              ? "Ваше имя..."
                              : "Your name..."
                          }
                          value={authorNameInput}
                          onChange={(e) => setAuthorNameInput(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "6px 12px",
                            fontSize: "12px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            marginBottom: "6px",
                            boxSizing: "border-box",
                          }}
                        />
                        <input
                          type="text"
                          placeholder={
                            lang === "kz"
                              ? "Өз ойыңызды немесе жауабыңызды жазыңыз..."
                              : lang === "ru"
                              ? "Напишите ваше мнение или ответ..."
                              : "Add your thought or response..."
                          }
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddComment(post.id);
                          }}
                          style={{
                            width: "100%",
                            padding: "9px 14px",
                            fontSize: "13.5px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <button
                        onClick={() => handleAddComment(post.id)}
                        style={{
                          background: "var(--oil)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          padding: "10px 16px",
                          fontSize: "13px",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Send size={14} />
                        <span>{lang === "kz" ? "Жіберу" : lang === "ru" ? "Отправить" : "Send"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ЖАҢА ЖАЗБА ҚАЛДЫРУ МОДАЛЬДІК ТЕРЕЗЕСІ (Create Discussion Post Modal) */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "clamp(20px, 3vw, 32px)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#17282b", margin: 0 }}>
                {lang === "kz"
                  ? "Қоғамдық бұрышқа жазба қосу"
                  : lang === "ru"
                  ? "Добавить запись в общественный угол"
                  : "Add New Community Post"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* 1. Қай бұрышқа жазасыз? */}
              <div>
                <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#374151", marginBottom: "8px" }}>
                  {lang === "kz" ? "1. Қай бұрышқа жазасыз?" : lang === "ru" ? "1. Выберите раздел:" : "1. Choose Category:"}
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px" }}>
                  {Object.entries(CORNER_CONFIG).map(([key, cfg]) => {
                    const isSelected = newCorner === key;
                    const Icon = cfg.icon;
                    const name = lang === "kz" ? cfg.nameKz : lang === "ru" ? cfg.nameRu : cfg.nameEn;
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setNewCorner(key as any)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "9px 10px",
                          borderRadius: "10px",
                          border: isSelected ? `2px solid ${cfg.color}` : "1px solid #d1d5db",
                          background: isSelected ? cfg.bg : "#f9fafb",
                          color: isSelected ? cfg.color : "#4b5563",
                          fontWeight: isSelected ? 800 : 600,
                          fontSize: "12.5px",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <Icon size={14} style={{ color: cfg.color }} />
                        <span>{name.replace(" бұрышы", "")}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Тақырыбы */}
              <div>
                <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                  {lang === "kz" ? "2. Тақырыбы / Қысқаша мәні:" : lang === "ru" ? "2. Тема:" : "2. Topic Title:"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    lang === "kz"
                      ? "Мысалы: 5-ауылдағы спорт алаңшасын жаңарту туралы..."
                      : lang === "ru"
                      ? "Например: Ремонт детской площадки в 5-м ауле..."
                      : "E.g. Playground renovation..."
                  }
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* 3. Атыңыз және Мекенжай (2 баған) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                    {lang === "kz" ? "Аты-жөніңіз:" : lang === "ru" ? "Ваше имя:" : "Your name:"}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === "kz" ? "Мысалы: Бауыржан (немесе бос қалдырыңыз)" : "Имя..."}
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "10px",
                      border: "1px solid #d1d5db",
                      fontSize: "13.5px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                    {lang === "kz" ? "Мекенжай / Орын:" : lang === "ru" ? "Адрес / Место:" : "Location:"}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === "kz" ? "Мысалы: 4-ауыл, Абай көшесі" : "Адрес..."}
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "10px",
                      border: "1px solid #d1d5db",
                      fontSize: "13.5px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* 4. Толық мәтіні */}
              <div>
                <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                  {lang === "kz" ? "3. Толық сипаттамасы:" : lang === "ru" ? "3. Описание:" : "3. Detailed Description:"}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    lang === "kz"
                      ? "Өз ұсынысыңызды, өтінішіңізді немесе шағымыңызды толық жазыңыз..."
                      : lang === "ru"
                      ? "Опишите ваше обращение подробно..."
                      : "Write your message in detail..."
                  }
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              {/* Батырмалар */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    background: "#f9fafb",
                    color: "#4b5563",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {lang === "kz" ? "Болдырмау" : lang === "ru" ? "Отмена" : "Cancel"}
                </button>

                <button
                  type="submit"
                  style={{
                    padding: "10px 22px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg, var(--gold) 0%, #d49a44 100%)",
                    color: "#17282b",
                    fontSize: "14px",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(232, 174, 88, 0.4)",
                  }}
                >
                  {lang === "kz" ? "Жариялау" : lang === "ru" ? "Опубликовать" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
