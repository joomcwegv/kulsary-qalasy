import { useState, useEffect } from "react";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  Wind,
  Droplets,
  Thermometer,
  ChevronDown,
} from "lucide-react";
import { Language, translations } from "../i18n/translations";
import { useLanguage } from "./LanguageContext";

const WEATHER_API_KEY = "a1ec03a2e6f789a2df13796ff0ee07fc";
const WEATHER_CITY = "Kulsary";

export interface WeatherData {
  temp: number;
  feelsLike: number;
  rawDesc: string;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export function useWeatherData(lang: Language = "kz") {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      try {
        setLoading(true);
        const apiLang = lang === "kz" ? "kz" : lang;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&appid=${WEATHER_API_KEY}&units=metric&lang=${apiLang}`;
        const res = await fetch(url);

        if (res.ok) {
          const data = await res.json();
          const desc = data.weather?.[0]?.description?.toLowerCase() || "";
          const main = data.weather?.[0]?.main?.toLowerCase() || "clear";

          if (isMounted) {
            setWeather({
              temp: Math.round(data.main.temp),
              feelsLike: Math.round(data.main.feels_like),
              rawDesc: desc,
              condition: main,
              humidity: data.main.humidity,
              windSpeed: Math.round((data.wind?.speed || 0) * 10) / 10,
            });
            setError(false);
          }
        } else {
          // Fallback: Open-Meteo for Kulsary (lat 46.95, lon 54.01)
          const fallbackRes = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=46.9508&longitude=54.0082&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m"
          );
          if (fallbackRes.ok) {
            const fbData = await fallbackRes.json();
            const curr = fbData.current;
            if (isMounted && curr) {
              setWeather({
                temp: Math.round(curr.temperature_2m),
                feelsLike: Math.round(curr.apparent_temperature),
                rawDesc: "clear sky",
                condition: "clear",
                humidity: Math.round(curr.relative_humidity_2m),
                windSpeed: Math.round(curr.wind_speed_10m * 10) / 10,
              });
              setError(false);
            }
          } else {
            throw new Error("Both weather APIs failed");
          }
        }
      } catch (err) {
        console.error("Weather fetch error:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadWeather();
    const interval = setInterval(loadWeather, 10 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [lang]);

  return { weather, loading, error };
}

export function getWeatherIcon(condition: string, size = 18) {
  const cond = condition.toLowerCase();
  if (cond.includes("rain") || cond.includes("drizzle")) {
    return <CloudRain size={size} className="text-sky-300" />;
  }
  if (cond.includes("thunder")) {
    return <CloudLightning size={size} className="text-amber-400" />;
  }
  if (cond.includes("snow")) {
    return <Snowflake size={size} className="text-blue-200" />;
  }
  if (cond.includes("fog") || cond.includes("mist") || cond.includes("haze")) {
    return <CloudFog size={size} className="text-gray-300" />;
  }
  if (cond.includes("cloud")) {
    return <CloudSun size={size} className="text-amber-200" />;
  }
  return <Sun size={size} className="text-amber-400" />;
}

export function getLocalizedDescription(rawDesc: string, lang: Language): string {
  const tConditions = translations[lang].weather.conditions;
  const lower = rawDesc.toLowerCase();
  return tConditions[lower] || tConditions[lower.replace("sky", "").trim()] || rawDesc;
}

export function HeaderWeather({
  weather,
  loading,
  isScrolled = false,
}: {
  weather: WeatherData | null;
  loading: boolean;
  isScrolled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { lang, t } = useLanguage();

  if (loading) {
    return (
      <div className="header-weather-pill header-weather-loading">
        <Sun size={15} className="animate-spin text-amber-300" style={{ animationDuration: "3s" }} />
        <span>{t.weather.city}...</span>
      </div>
    );
  }

  if (!weather) return null;

  const desc = getLocalizedDescription(weather.rawDesc, lang);

  return (
    <div className={`header-weather-wrapper ${isScrolled ? "header-weather-scrolled" : ""}`}>
      <button
        type="button"
        className={`header-weather-pill ${isScrolled ? "pill-scrolled-expanded" : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        title={`${t.weather.city} · ${desc}`}
      >
        <span className="weather-icon-box">{getWeatherIcon(weather.condition, 16)}</span>
        <span className="weather-temp">{weather.temp > 0 ? `+${weather.temp}` : weather.temp}°C</span>
        <span className="weather-city-label">{t.weather.city}</span>

        {/* When page is scrolled, show full live weather stats right at the top so it never disappears! */}
        {isScrolled && (
          <span className="weather-scrolled-stats">
            <span className="weather-scrolled-desc">{desc}</span>
            <span className="weather-scrolled-item" title={t.weather.wind}>
              <Wind size={12} /> {weather.windSpeed} {t.weather.windUnit}
            </span>
            <span className="weather-scrolled-item" title={t.weather.humidity}>
              <Droplets size={12} /> {weather.humidity}%
            </span>
          </span>
        )}

        <ChevronDown size={13} className={`weather-chevron ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="weather-backdrop" onClick={() => setOpen(false)} />
          <div className="weather-dropdown" role="dialog" aria-label={t.weather.detailsTitle}>
            <div className="weather-dropdown-header">
              <div>
                <strong>{t.weather.detailsTitle}</strong>
                <p>{desc}</p>
              </div>
              <div className="weather-big-temp">
                {getWeatherIcon(weather.condition, 24)}
                <span>{weather.temp > 0 ? `+${weather.temp}` : weather.temp}°C</span>
              </div>
            </div>
            <div className="weather-details-grid">
              <div className="weather-detail-item">
                <Thermometer size={14} />
                <span>{t.weather.feelsLike}:</span>
                <strong>{weather.feelsLike > 0 ? `+${weather.feelsLike}` : weather.feelsLike}°C</strong>
              </div>
              <div className="weather-detail-item">
                <Wind size={14} />
                <span>{t.weather.wind}:</span>
                <strong>
                  {weather.windSpeed} {t.weather.windUnit}
                </strong>
              </div>
              <div className="weather-detail-item">
                <Droplets size={14} />
                <span>{t.weather.humidity}:</span>
                <strong>{weather.humidity}%</strong>
              </div>
            </div>
            <div className="weather-dropdown-footer">{t.weather.source}</div>
          </div>
        </>
      )}
    </div>
  );
}

export function HeroWeatherCard({ weather, loading }: { weather: WeatherData | null; loading: boolean }) {
  const { lang, t } = useLanguage();

  if (loading) {
    return (
      <div className="hero-weather-card">
        <Sun size={20} className="animate-spin text-amber-300" style={{ animationDuration: "3s" }} />
        <span>{t.weather.loading}</span>
      </div>
    );
  }

  if (!weather) return null;

  const desc = getLocalizedDescription(weather.rawDesc, lang);

  return (
    <div className="hero-weather-card" data-reveal>
      <div className="hero-weather-main">
        <div className="hero-weather-icon">{getWeatherIcon(weather.condition, 26)}</div>
        <div className="hero-weather-primary">
          <span className="hero-weather-temp">{weather.temp > 0 ? `+${weather.temp}` : weather.temp}°C</span>
          <span className="hero-weather-desc">{desc}</span>
        </div>
      </div>
      <div className="hero-weather-divider" />
      <div className="hero-weather-stats">
        <span title={t.weather.feelsLike}>
          <Thermometer size={13} /> {weather.feelsLike > 0 ? `+${weather.feelsLike}` : weather.feelsLike}°C
        </span>
        <span title={t.weather.wind}>
          <Wind size={13} /> {weather.windSpeed} {t.weather.windUnit}
        </span>
        <span title={t.weather.humidity}>
          <Droplets size={13} /> {weather.humidity}%
        </span>
      </div>
    </div>
  );
}
