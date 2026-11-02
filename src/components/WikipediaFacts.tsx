import { BookOpen, Calendar, Users, Fuel, ArrowUpRight, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function WikipediaFacts() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Calendar,
      number: "1939",
      label: t.wiki.stats.year1939.label,
      detail: t.wiki.stats.year1939.detail,
    },
    {
      icon: Sparkles,
      number: "2001",
      label: t.wiki.stats.year2001.label,
      detail: t.wiki.stats.year2001.detail,
    },
    {
      icon: Users,
      number: "66 000+",
      label: t.wiki.stats.pop.label,
      detail: t.wiki.stats.pop.detail,
    },
    {
      icon: MapPin,
      number: "220 км",
      label: t.wiki.stats.dist.label,
      detail: t.wiki.stats.dist.detail,
    },
  ];

  const cardIcons = [Fuel, BookOpen, GraduationCap];

  return (
    <section className="wiki-section section-padding" id="wiki" aria-labelledby="wiki-title">
      <div className="page-container">
        <div data-reveal>
          <div className="section-label">
            <span>02</span>
            <span className="section-label-rule" aria-hidden="true" />
            <span>{t.wiki.label}</span>
          </div>
          <div className="section-heading-grid">
            <h2 id="wiki-title" className="section-title">
              {t.wiki.title} <em>{t.wiki.titleEm}</em>
            </h2>
            <p className="section-intro">{t.wiki.intro}</p>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="wiki-stats-grid" data-reveal>
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div className="wiki-stat-card" key={idx}>
                <div className="wiki-stat-top">
                  <span className="wiki-stat-number">{item.number}</span>
                  <div className="wiki-stat-icon">
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                </div>
                <strong className="wiki-stat-label">{item.label}</strong>
                <p className="wiki-stat-detail">{item.detail}</p>
              </div>
            );
          })}
        </div>

        {/* 3 Detail Cards */}
        <div className="wiki-cards-grid" data-reveal>
          {t.wiki.cards.map((card, idx) => {
            const Icon = cardIcons[idx] || BookOpen;
            return (
              <div className="wiki-card" key={idx}>
                <div className="wiki-card-icon">
                  <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Wikipedia Link Banner */}
        <div className="wiki-banner" data-reveal>
          <div className="wiki-banner-copy">
            <div className="wiki-badge">
              <span className="wiki-w-mark">W</span>
              <span>WIKIPEDIA · FREE ENCYCLOPEDIA</span>
            </div>
            <h3>{t.wiki.bannerTitle}</h3>
            <p>{t.wiki.bannerDesc}</p>
          </div>
          <div className="wiki-banner-actions">
            <a
              href="https://ru.wikipedia.org/wiki/%D0%9A%D1%83%D0%BB%D1%8C%D1%81%D0%B0%D1%80%D1%8B"
              target="_blank"
              rel="noopener noreferrer"
              className="wiki-btn wiki-btn-primary"
            >
              <span>{t.wiki.openRuBtn}</span>
              <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              href="https://kk.wikipedia.org/wiki/%D2%9A%D2%B1%D0%BB%D1%81%D0%B0%D1%80%D1%8B"
              target="_blank"
              rel="noopener noreferrer"
              className="wiki-btn wiki-btn-secondary"
            >
              <span>{t.wiki.openKzBtn}</span>
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
