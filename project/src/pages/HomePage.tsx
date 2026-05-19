import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext'; // Импортируем хук
import homeData from '../data/home.json';

export default function HomePage() {
  const { lang } = useLang(); // Получаем текущий язык
  const content = (homeData as any)?.home_page ?? homeData ?? {};

  // Функция для выбора текста в зависимости от языка
  // Если у тебя в JSON есть поля для разных языков, можно брать их оттуда.
  // Пока сделаем переключение вручную:
  const getHeroTitle = () => content.heroTitle || '5AM STORE';
  
  const getHeroSubtitle = () => {
    if (content.heroSubtitle) return content.heroSubtitle;
    return lang === 'ua' 
      ? 'Преміальний дроп та аксесуари. Оновлення каталогу щотижня.' 
      : 'Премиальный дроп и аксессуары. Обновление каталога еженедельно.';
  };

  const getCtaText = () => {
    if (content.ctaText) return content.ctaText;
    return lang === 'ua' ? 'Перейти до каталогу' : 'Перейти в каталог';
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 selection:bg-white selection:text-black">
      <div className="max-w-3xl">
        <p className="text-zinc-600 font-mono text-xs tracking-[0.3em] uppercase mb-4">
          WELCOME TO 5AM
        </p>
        <h1 className="text-white font-black text-5xl md:text-8xl tracking-tighter uppercase leading-none mb-6">
          {getHeroTitle()}
        </h1>
        <p className="text-zinc-400 text-sm md:text-base font-medium max-w-md mx-auto mb-10 leading-relaxed">
          {getHeroSubtitle()}
        </p>
        <Link
          to="/catalog"
          className="inline-block bg-white text-black text-xs md:text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-zinc-200 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          {getCtaText()}
        </Link>
      </div>
    </div>
  );
}
