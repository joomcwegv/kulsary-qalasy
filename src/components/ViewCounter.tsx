import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function ViewCounter({ className = "" }: { className?: string }) {
  const { lang } = useLanguage();
  const [views, setViews] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kulsary_views_count");
      return stored ? parseInt(stored, 10) : 2348;
    }
    return 2348;
  });

  useEffect(() => {
    const sessionKey = "kulsary_view_registered";
    const hasVisited = sessionStorage.getItem(sessionKey);

    // Increment locally
    if (!hasVisited) {
      sessionStorage.setItem(sessionKey, "1");
      setViews((prev) => {
        const next = prev + 1;
        try {
          localStorage.setItem("kulsary_views_count", String(next));
        } catch {}
        return next;
      });
    }

    // Also fetch from live public counter if available
    try {
      fetch("https://api.counterapi.dev/v1/kulsary-qalasy/views/up")
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data.count === "number") {
            const liveTotal = 2300 + data.count;
            setViews(liveTotal);
            localStorage.setItem("kulsary_views_count", String(liveTotal));
          }
        })
        .catch(() => {});
    } catch {}
  }, []);

  const tooltip =
    lang === "kz"
      ? `Сайтты қараушылар саны: ${views.toLocaleString()}`
      : lang === "ru"
      ? `Просмотров сайта: ${views.toLocaleString()}`
      : `Total page views: ${views.toLocaleString()}`;

  return (
    <div
      className={`view-counter-pill ${className}`}
      title={tooltip}
      aria-label={tooltip}
    >
      <Eye size={14} strokeWidth={2.2} className="view-counter-icon" aria-hidden="true" />
      <span className="view-counter-num">{views.toLocaleString()}</span>
    </div>
  );
}
