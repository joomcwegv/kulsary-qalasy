import { useState, useEffect } from "react";
import { ArrowUpRight, RefreshCw, Heart, Repeat2, MessageCircle } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface BskyPost {
  uri: string;
  cid: string;
  author: {
    handle: string;
    displayName?: string;
    avatar?: string;
  };
  record: {
    text: string;
    createdAt: string;
  };
  likeCount?: number;
  repostCount?: number;
  replyCount?: number;
  indexedAt: string;
}

function timeAgo(dateStr: string, lang: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (lang === "ru") {
    if (mins < 1) return "только что";
    if (mins < 60) return `${mins} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    return `${days} д назад`;
  } else if (lang === "en") {
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  } else {
    if (mins < 1) return "жаңа ғана";
    if (mins < 60) return `${mins} мин бұрын`;
    if (hours < 24) return `${hours} сағ бұрын`;
    return `${days} күн бұрын`;
  }
}

function highlightHashtags(text: string): React.ReactNode {
  const parts = text.split(/(#\w+)/g);
  return parts.map((part, i) =>
    part.startsWith("#") ? (
      <span key={i} style={{ color: "#0285FF", fontWeight: 700 }}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function BlueskyFeed() {
  const { lang } = useLanguage();
  const [posts, setPosts] = useState<BskyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const labels = {
    kz: {
      title: "🦋 Bluesky · Тікелей Лента",
      subtitle: "#Qulsary · #Zhylyoi · Соңғы посттар",
      empty: "Әзірге #Qulsary посттары жоқ. Бірінші болып жазыңыз!",
      error: "Лента жүктелмеді. Интернет байланысын тексеріңіз.",
      refresh: "Жаңарту",
      viewAll: "Барлығын Bluesky-де көру",
      updated: "Жаңартылды",
      postNow: "#Qulsary деп жазу",
    },
    ru: {
      title: "🦋 Bluesky · Прямая лента",
      subtitle: "#Qulsary · #Zhylyoi · Последние посты",
      empty: "Постов #Qulsary пока нет. Будьте первым!",
      error: "Лента не загружена. Проверьте интернет.",
      refresh: "Обновить",
      viewAll: "Смотреть все в Bluesky",
      updated: "Обновлено",
      postNow: "Написать #Qulsary",
    },
    en: {
      title: "🦋 Bluesky · Live Feed",
      subtitle: "#Qulsary · #Zhylyoi · Latest posts",
      empty: "No #Qulsary posts yet. Be the first!",
      error: "Feed failed to load. Check your internet.",
      refresh: "Refresh",
      viewAll: "View all on Bluesky",
      updated: "Updated",
      postNow: "Post #Qulsary",
    },
  };

  const t = labels[lang] || labels.kz;

  async function fetchPosts() {
    setLoading(true);
    setError(false);
    try {
      // Bluesky public API — авторизация керек емес
      const queries = ["#Qulsary", "#Zhylyoi", "Кулсары", "Qulsary"];
      const allPosts: BskyPost[] = [];
      const seen = new Set<string>();

      for (const q of queries) {
        try {
          const url = `https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=${encodeURIComponent(q)}&limit=8&sort=latest`;
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          for (const item of data.posts || []) {
            if (!seen.has(item.cid)) {
              seen.add(item.cid);
              allPosts.push(item);
            }
          }
        } catch {
          // ignore individual query errors
        }
      }

      // Уақыт бойынша сұрыптау
      allPosts.sort(
        (a, b) =>
          new Date(b.record.createdAt).getTime() -
          new Date(a.record.createdAt).getTime()
      );

      setPosts(allPosts.slice(0, 9));
      setLastUpdated(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
    // Әр 3 минут сайын жаңарту
    const interval = setInterval(fetchPosts, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const postUrl = (uri: string) => {
    // at://did:plc:xxx/app.bsky.feed.post/yyy → https://bsky.app/profile/did/post/yyy
    const parts = uri.replace("at://", "").split("/");
    return `https://bsky.app/profile/${parts[0]}/post/${parts[2]}`;
  };

  return (
    <div className="bsky-feed-wrapper">
      {/* Header */}
      <div className="bsky-feed-header">
        <div>
          <h3 className="bsky-feed-title">{t.title}</h3>
          <p className="bsky-feed-subtitle">{t.subtitle}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {lastUpdated && (
            <span className="bsky-updated-label">
              {t.updated}: {lastUpdated.toLocaleTimeString("kk-KZ", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <button
            className="bsky-refresh-btn"
            onClick={fetchPosts}
            disabled={loading}
            title={t.refresh}
          >
            <RefreshCw size={14} className={loading ? "bsky-spin" : ""} />
            {t.refresh}
          </button>
          <a
            href="https://bsky.app/intent/compose?text=%23Qulsary+%23Zhylyoi+"
            target="_blank"
            rel="noopener noreferrer"
            className="bsky-post-btn"
          >
            + {t.postNow}
          </a>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bsky-loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bsky-skeleton-card">
              <div className="bsky-skeleton-avatar" />
              <div className="bsky-skeleton-lines">
                <div className="bsky-skeleton-line" style={{ width: "60%" }} />
                <div className="bsky-skeleton-line" style={{ width: "90%" }} />
                <div className="bsky-skeleton-line" style={{ width: "75%" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bsky-error">
          <span>⚠️ {t.error}</span>
          <button onClick={fetchPosts} className="bsky-refresh-btn">
            <RefreshCw size={14} /> {t.refresh}
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && posts.length === 0 && (
        <div className="bsky-empty">
          <span>🦋</span>
          <p>{t.empty}</p>
          <a
            href="https://bsky.app/intent/compose?text=%23Qulsary+%23Zhylyoi+"
            target="_blank"
            rel="noopener noreferrer"
            className="bsky-post-btn"
          >
            + {t.postNow}
          </a>
        </div>
      )}

      {/* Posts Grid */}
      {!loading && !error && posts.length > 0 && (
        <>
          <div className="bsky-posts-grid">
            {posts.map((post) => (
              <a
                key={post.cid}
                href={postUrl(post.uri)}
                target="_blank"
                rel="noopener noreferrer"
                className="bsky-post-card"
              >
                {/* Author */}
                <div className="bsky-post-author">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.displayName || post.author.handle}
                      className="bsky-avatar"
                    />
                  ) : (
                    <div className="bsky-avatar-placeholder">
                      {(post.author.displayName || post.author.handle).charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="bsky-author-info">
                    <strong>{post.author.displayName || post.author.handle}</strong>
                    <span>@{post.author.handle}</span>
                  </div>
                  <span className="bsky-post-time">
                    {timeAgo(post.record.createdAt, lang)}
                  </span>
                </div>

                {/* Text */}
                <p className="bsky-post-text">
                  {highlightHashtags(post.record.text)}
                </p>

                {/* Stats */}
                <div className="bsky-post-stats">
                  <span>
                    <Heart size={12} /> {post.likeCount ?? 0}
                  </span>
                  <span>
                    <Repeat2 size={12} /> {post.repostCount ?? 0}
                  </span>
                  <span>
                    <MessageCircle size={12} /> {post.replyCount ?? 0}
                  </span>
                  <ArrowUpRight size={12} className="bsky-card-arrow" />
                </div>
              </a>
            ))}
          </div>

          {/* View All link */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <a
              href="https://bsky.app/search?q=%23Qulsary"
              target="_blank"
              rel="noopener noreferrer"
              className="bsky-view-all"
            >
              {t.viewAll} <ArrowUpRight size={14} />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
