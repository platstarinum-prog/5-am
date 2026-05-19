import { useState } from 'react';
import Reviews from '../components/Reviews';
// Импортируем JSON напрямую. Vite сам отследит изменения при пересборке.
import reviewsData from '../data/reviews.json';

export default function ReviewsPage() {
  // Забираем массив из поля "items" (как мы настроили в config.yml)
  // Если файла или поля еще нет, подстрахуемся пустым массивом
  const [reviews] = useState<any[]>(reviewsData?.items || []);

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <Reviews reviews={reviews} />
    </div>
  );
}
