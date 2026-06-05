import { useTranslation } from 'react-i18next';
import type { TranslationKey } from './translations';

export function useLang() {
  const { t: i18nT, i18n } = useTranslation();

  const t = (key: TranslationKey, vars?: Record<string, string | number>) => {
    return i18nT(key, vars);
  };

  const lang = i18n.language as 'uk' | 'ru' | 'en';
  const setLang = (l: string) => i18n.changeLanguage(l);
  const langs = ['uk', 'ru', 'en'];

  return { lang, setLang, t, langs };
}
