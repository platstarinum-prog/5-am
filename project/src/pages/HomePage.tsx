import { Link } from 'react-router-dom';
import homeData from '../data/home.json';
import { useLang } from '../i18n/LanguageContext';
import SEO, { orgSchema } from '../components/SEO';

export default function HomePage() {
  const { t } = useLang();
  const content = (homeData as any)?.home_page ?? homeData ?? {};

  return (
    <>
      <SEO
        title="5AM STORE"
        description={t('home.subtitle')}
        jsonLd={orgSchema()}
      />
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 selection:bg-white selection:text-black">
        <div className="max-w-3xl">
          <p className="text-zinc-600 font-mono text-xs tracking-[0.3em] uppercase mb-4">
            {t('home.welcome')}
          </p>
          <h1 className="text-white font-black text-5xl md:text-8xl tracking-tighter uppercase leading-none mb-6">
            {content.heroTitle || t('home.title')}
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-medium max-w-md mx-auto mb-10 leading-relaxed">
            {content.heroSubtitle || t('home.subtitle')}
          </p>
          <Link
            to="/catalog"
            className="inline-block bg-white text-black text-xs md:text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-zinc-200 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {content.ctaText || t('home.cta')}
          </Link>
        </div>
      </div>
    </>
  );
}
