import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, Translations } from "../i18n/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "kz",
  setLang: () => {},
  t: translations.kz,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("kulsary_lang") as Language;
    return saved === "ru" || saved === "en" || saved === "kz" ? saved : "kz";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("kulsary_lang", newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`lang-switcher ${className}`} role="group" aria-label="Тіл таңдау / Выбор языка / Select Language">
      <button
        type="button"
        className={`lang-btn ${lang === "kz" ? "active" : ""}`}
        onClick={() => setLang("kz")}
        title="Қазақша"
      >
        KZ
      </button>
      <button
        type="button"
        className={`lang-btn ${lang === "ru" ? "active" : ""}`}
        onClick={() => setLang("ru")}
        title="Русский"
      >
        RU
      </button>
      <button
        type="button"
        className={`lang-btn ${lang === "en" ? "active" : ""}`}
        onClick={() => setLang("en")}
        title="English"
      >
        EN
      </button>
    </div>
  );
}
