import { createContext, useContext, useState, type ReactNode } from 'react';
import translations, { type Language, type TranslationKey } from './translations';

interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  langs: Language[];
}

const LangContext = createContext<LangContextType | null>(null);

const LANGS: Language[] = ['uk', 'ru', 'en'];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('uk');

  const t = (key: TranslationKey, vars?: Record<string, string | number>) => {
    let value = translations[lang]?.[key] ?? translations.uk[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        value = value.replace(`{${k}}`, String(v));
      }
    }
    return value;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t, langs: LANGS }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be inside LanguageProvider');
  return ctx;
}
