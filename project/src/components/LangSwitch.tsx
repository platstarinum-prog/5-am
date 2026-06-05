import { useLang } from '../i18n/LanguageContext';

export default function LangSwitch() {
  const { lang, setLang, langs } = useLang();

  const nextIndex = (langs.indexOf(lang) + 1) % langs.length;
  const nextLang = langs[nextIndex];

  return (
    <button
      onClick={() => setLang(nextLang)}
      className="px-2.5 py-1 text-xs font-mono font-bold text-zinc-500 border border-zinc-800 rounded-md hover:border-zinc-600 hover:text-zinc-300 transition-all tracking-wider uppercase"
      aria-label="Switch language"
    >
      {lang}
    </button>
  );
}
