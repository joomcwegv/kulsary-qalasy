import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  User,
  Flame,
  Globe,
  Radio,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  badge?: string;
  content: string;
  image?: string;
  tag: string;
  likes: number;
  isLiked?: boolean;
  comments: Comment[];
  createdAt: string;
}

const STORAGE_KEY = "kulsary_community_posts_v1";

const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    author: "Жылыой Тынысы",
    handle: "@jylyoi.tynysy",
    avatar: "/images/zhylyoi-tynysy-emblem.jpg",
    badge: "Ресми қоғамдық қор",
    content:
      "Құлсары қаласы мен Жылыой ауданының цифрлық хабы іске қосылды! 🏛️ Бұл платформа — әрбір тұрғынның дауысы мен ұсынысына арналған ашық орта. Қаламызды бірге дамытайық!",
    image: "/images/kulsary-genplan.jpg",
    tag: "#Жаңалық",
    likes: 47,
    comments: [
      {
        id: "c-1",
        author: "Ерлан Қасымов",
        text: "Керемет бастама! Сайт өте заманауи және ыңғайлы шығыпты.",
        createdAt: "10 мин бұрын",
      },
      {
        id: "c-2",
        author: "Айгерім Б.",
        text: "Әсіресе ауылдар мен цифрлық карта бөлімі ұнады! 👏",
        createdAt: "5 мин бұрын",
      },
    ],
    createdAt: "25 мин бұрын",
  },
  {
    id: "post-2",
    author: "Құлсары Жастары",
    handle: "@qulsary_youth",
    avatar: "/images/zhylyoi-info-map.jpg",
    badge: "Жастар клубы",
    content:
      "Осы сенбіде Қамыскөл жағалауында Street Workout және жүгіру марафоны өтеді! 🏃‍♂️ Барлық спорт сүйер қала тұрғындарын қатысуға шақырамыз. Басталуы: 10:00-де.",
    tag: "#Спорт",
    likes: 32,
    comments: [
      {
        id: "c-3",
        author: "Бауыржан",
        text: "Біз достармен барамыз! Тіркелу қайда?",
        createdAt: "1 сағ бұрын",
      },
    ],
    createdAt: "2 сағ бұрын",
  },
  {
    id: "post-3",
    author: "Жылыой Авто · Жол хабары",
    handle: "@zhylyoi_auto",
    avatar: "/images/akimat-building.jpg",
    badge: "Қауымдастық",
    content:
      "⚠️ Жүргізушілер назарына: Құлсары — Доссор тасжолында техникалар жүріп жатыр, жол ашық бірақ жылдамдықты қалыпты ұстауды сұраймыз. Ақ жол баршаға!",
    tag: "#ЖолХабар",
    likes: 19,
    comments: [],
    createdAt: "3 сағ бұрын",
  },
];

export function CommunitySocialFeed() {
  const { lang } = useLanguage();
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_POSTS;
  });

  const [filter, setFilter] = useState<string>("all");
  const [newContent, setNewContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [selectedTag, setSelectedTag] = useState("#Жаңалық");
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [onlineCount] = useState(() => Math.floor(135 + Math.random() * 25));

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  // Handle new post submit
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const name = authorName.trim() || (lang === "kz" ? "Құлсары тұрғыны" : "Житель Кульсары");

    const newPost: Post = {
      id: "post-" + Date.now(),
      author: name,
      handle: "@" + name.toLowerCase().replace(/[^a-z0-9а-яәіңғүұқөһ_]/gi, "").slice(0, 15) || "@turghyn",
      avatar: "/images/zhylyoi-tynysy-emblem.jpg",
      content: newContent.trim(),
      tag: selectedTag,
      likes: 1,
      isLiked: true,
      comments: [],
      createdAt: lang === "kz" ? "Жаңа ғана" : "Только что",
    };

    setPosts([newPost, ...posts]);
    setNewContent("");
  };

  // Like toggle
  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );
  };

  // Add comment
  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;
    const author = authorName.trim() || (lang === "kz" ? "Құлсарылық" : "Кульсаринец");

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: "c-" + Date.now(),
                author,
                text: commentText.trim(),
                createdAt: lang === "kz" ? "Жаңа ғана" : "Только что",
              },
            ],
          };
        }
        return p;
      })
    );
    setCommentText("");
  };

  // Filtered posts
  const filteredPosts = posts.filter((p) => {
    if (filter === "all") return true;
    if (filter === "official") return p.badge?.includes("Ресми");
    if (filter === "youth") return p.tag === "#Спорт" || p.tag === "#Жастар";
    if (filter === "traffic") return p.tag === "#ЖолХабар";
    return true;
  });

  return (
    <div className="soc-network-container" id="community-hub">
      {/* Top Banner / Network Header */}
      <div className="soc-header-bar">
        <div className="soc-header-left">
          <div className="soc-network-icon-box">
            <Radio size={20} className="soc-pulse-icon" />
          </div>
          <div>
            <div className="soc-title-row">
              <h3>{lang === "kz" ? "ЖЫЛЫОЙ ҚАУЫМДАСТЫҒЫ" : "СООБЩЕСТВО ЖЫЛЫОЙ"}</h3>
              <span className="soc-live-pill">
                <span className="soc-green-dot"></span>
                {onlineCount} {lang === "kz" ? "тұрғын желіде" : "онлайн"}
              </span>
            </div>
            <p className="soc-network-sub">
              {lang === "kz"
                ? "Тікелей қалалық мінбер · Жаңалықтар, талқылаулар және пікір алмасу"
                : "Открытая трибуна города · Новости, обсуждения и живая лента"}
            </p>
          </div>
        </div>

        {/* Categories / Filter Pills */}
        <div className="soc-filter-pills">
          <button
            type="button"
            className={`soc-pill-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            <Globe size={14} />
            {lang === "kz" ? "Барлық лента" : "Вся лента"}
          </button>
          <button
            type="button"
            className={`soc-pill-btn ${filter === "official" ? "active" : ""}`}
            onClick={() => setFilter("official")}
          >
            <CheckCircle2 size={14} />
            {lang === "kz" ? "Ресми" : "Официально"}
          </button>
          <button
            type="button"
            className={`soc-pill-btn ${filter === "youth" ? "active" : ""}`}
            onClick={() => setFilter("youth")}
          >
            <Flame size={14} />
            {lang === "kz" ? "Жастар & Спорт" : "Молодежь"}
          </button>
          <button
            type="button"
            className={`soc-pill-btn ${filter === "traffic" ? "active" : ""}`}
            onClick={() => setFilter("traffic")}
          >
            <TrendingUp size={14} />
            {lang === "kz" ? "Жол хабары" : "Дороги"}
          </button>
        </div>
      </div>

      <div className="soc-grid-layout">
        {/* Left Side: Create Post Widget (Post Composer) */}
        <div className="soc-composer-card">
          <div className="soc-composer-header">
            <img
              src="/images/zhylyoi-tynysy-emblem.jpg"
              alt="Avatar"
              className="soc-composer-avatar"
            />
            <div className="soc-composer-user-meta">
              <strong>{authorName || (lang === "kz" ? "Құлсарылық дос" : "Друг из Кульсары")}</strong>
              <small>{lang === "kz" ? "Тікелей сайтқа жазу" : "Публикация в ленту"}</small>
            </div>
          </div>

          <form onSubmit={handlePublish} className="soc-form">
            <input
              type="text"
              placeholder={lang === "kz" ? "Есіміңіз немесе лақап атыңыз..." : "Ваше имя..."}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="soc-author-input"
            />

            <textarea
              rows={4}
              placeholder={
                lang === "kz"
                  ? "Құлсарыда не жаңалық? Ой-пікіріңізді немесе хабарландыруыңызды жазыңыз..."
                  : "Что нового в Кульсары? Поделитесь новостью или мыслью..."
              }
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="soc-textarea"
              required
            />

            {/* Tag Selector */}
            <div className="soc-tag-selector">
              <span className="soc-tag-label">{lang === "kz" ? "Тег таңдау:" : "Тег:"}</span>
              {["#Жаңалық", "#Спорт", "#Жастар", "#ЖолХабар", "#Ұсыныс"].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`soc-tag-btn ${selectedTag === tag ? "active" : ""}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="soc-composer-actions">
              <div className="soc-composer-hints">
                <Sparkles size={14} className="text-amber-400" />
                <span>{lang === "kz" ? "Барлық келушілерге көрінеді" : "Видно всем"}</span>
              </div>
              <button type="submit" className="soc-publish-btn">
                <Send size={15} />
                <span>{lang === "kz" ? "Жариялау" : "Опубликовать"}</span>
              </button>
            </div>
          </form>

          {/* Quick Cross-post hint to Bluesky */}
          <div className="soc-bluesky-cross">
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
              {lang === "kz" ? "Bluesky желісіне де қосу:" : "Также в Bluesky:"}
            </span>
            <a
              href={`https://bsky.app/intent/compose?text=${encodeURIComponent(
                newContent || "#Qulsary #Zhylyoi kulsary-qalasy.vercel.app"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="soc-bsky-mini-link"
            >
              🦋 Bluesky-ге жазу ↗
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Feed */}
        <div className="soc-feed-column">
          {filteredPosts.length === 0 ? (
            <div className="soc-empty-state">
              <p>{lang === "kz" ? "Әзірге жазба жоқ. Бірінші болып жазыңыз!" : "Пока нет постов. Напишите первым!"}</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article key={post.id} className="soc-post-card">
                {/* Author Info */}
                <div className="soc-post-header">
                  <img src={post.avatar} alt={post.author} className="soc-post-avatar" />
                  <div className="soc-post-author-box">
                    <div className="soc-author-title-line">
                      <strong>{post.author}</strong>
                      {post.badge && <span className="soc-badge">{post.badge}</span>}
                    </div>
                    <div className="soc-handle-time-line">
                      <span>{post.handle}</span>
                      <span className="soc-dot">·</span>
                      <time>{post.createdAt}</time>
                    </div>
                  </div>
                  <span className="soc-post-tag-pill">{post.tag}</span>
                </div>

                {/* Content */}
                <p className="soc-post-content">{post.content}</p>

                {/* Post Image (if any) */}
                {post.image && (
                  <div className="soc-post-image-box">
                    <img src={post.image} alt="Жазба суреті" />
                  </div>
                )}

                {/* Interactive Footer */}
                <div className="soc-post-actions-bar">
                  <button
                    type="button"
                    className={`soc-action-btn soc-like-btn ${post.isLiked ? "liked" : ""}`}
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart size={16} fill={post.isLiked ? "#ef4444" : "none"} />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    type="button"
                    className={`soc-action-btn ${activeCommentPostId === post.id ? "active" : ""}`}
                    onClick={() =>
                      setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                    }
                  >
                    <MessageCircle size={16} />
                    <span>{post.comments.length}</span>
                  </button>

                  <button
                    type="button"
                    className="soc-action-btn"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: "Құлсары қалалық жазбасы",
                          text: post.content,
                          url: window.location.href,
                        }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(post.content);
                        alert(lang === "kz" ? "Мәтін көшірілді!" : "Скопировано!");
                      }
                    }}
                    title="Бөлісу"
                  >
                    <Share2 size={16} />
                  </button>
                </div>

                {/* Expandable Comments Drawer */}
                {activeCommentPostId === post.id && (
                  <div className="soc-comments-section">
                    <div className="soc-comments-list">
                      {post.comments.length === 0 ? (
                        <p className="soc-no-comments">
                          {lang === "kz"
                            ? "Әзірге пікір жазылмаған. Бірінші болып пікір қалдырыңыз!"
                            : "Комментариев пока нет. Будьте первым!"}
                        </p>
                      ) : (
                        post.comments.map((c) => (
                          <div key={c.id} className="soc-comment-item">
                            <div className="soc-comment-avatar-mini">
                              <User size={12} />
                            </div>
                            <div className="soc-comment-bubble">
                              <div className="soc-comment-header">
                                <strong>{c.author}</strong>
                                <small>{c.createdAt}</small>
                              </div>
                              <p>{c.text}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* New comment input */}
                    <div className="soc-comment-input-row">
                      <input
                        type="text"
                        placeholder={lang === "kz" ? "Пікір жазыңыз..." : "Оставить комментарий..."}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddComment(post.id);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentText.trim()}
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
