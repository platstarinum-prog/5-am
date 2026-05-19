import { useState } from 'react';
import FAQ from '../components/FAQ';
// Импортируем JSON напрямую, избавляясь от fetch
import faqData from '../data/faq.json';

export default function FaqPage() {
  // Вытаскиваем массив "items" из нашего конфига. Если файла/поля нет — подстрахуемся пустым массивом.
  const rawItems = faqData?.items || [];

  // Мапим данные, чтобы твой старый компонент FAQ (который ждет обычные question и answer) 
  // не сломался из-за мультиязычных ключей из админки.
  // Пока захардкодим RU/UA версию, а если у тебя в приложении есть глобальный стейт языка, 
  // можно будет подставлять динамически (например: item.question_ru или item.question_en)
  const formattedFaqItems = rawItems.map((item: any) => ({
    question: item.question_ru || item.question_en || '',
    answer: item.answer_ru || item.answer_en || ''
  }));

  const [faqItems] = useState<any[]>(formattedFaqItems);

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <FAQ items={faqItems} />
    </div>
  );
}
