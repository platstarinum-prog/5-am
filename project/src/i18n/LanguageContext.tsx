import { useTranslation } from 'react-i18next';
import type { TranslationKey } from './translations';

export function useLang() {
  const { t: i18nT, i18n } = useTranslation();

  const t = (key: TranslationKey, vars?: Record<string, string | number>) => {
    return i18nT(key, vars);
  };

  const loc = (obj: Record<string, any> | null | undefined, field: string): string => {
    if (!obj) return '';
    const lang = i18n.language as string;
    const langField = obj[`${field}_${lang}`];
    if (langField && String(langField).trim()) return String(langField);
    const baseField = obj[field];
    if (baseField && String(baseField).trim()) return String(baseField);
    const ukField = obj[`${field}_uk`];
    if (ukField && String(ukField).trim()) return String(ukField);
    return '';
  };

  const lang = i18n.language as 'uk' | 'ru' | 'en';
  const setLang = (l: string) => i18n.changeLanguage(l);
  const langs = ['uk', 'ru', 'en'];

  return { lang, setLang, t, loc, langs };
}
