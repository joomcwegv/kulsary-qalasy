import React, { createContext, useContext, useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kulsary_theme") as Theme | null;
      if (saved === "light" || saved === "dark") {
        return saved;
      }
      // Check system preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    localStorage.setItem("kulsary_theme", theme);

    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#0c1517" : "#17282b");
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export function ThemeToggle({ className = "", showLabel = false }: { className?: string; showLabel?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, t } = useLanguage();
  const isDark = theme === "dark";

  const label = isDark ? t.theme?.dayMode || "Күндізгі режим" : t.theme?.nightMode || "Түн режимі";

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${isDark ? "theme-dark" : "theme-light"} ${className}`}
      onClick={toggleTheme}
      title={label}
      aria-label={label}
      aria-pressed={isDark}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          {isDark ? (
            <Moon size={15} strokeWidth={2.2} className="theme-icon moon-icon" />
          ) : (
            <Sun size={15} strokeWidth={2.2} className="theme-icon sun-icon" />
          )}
        </div>
      </div>
      {showLabel && <span className="theme-toggle-text">{label}</span>}
    </button>
  );
}
