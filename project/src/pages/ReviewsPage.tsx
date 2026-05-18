import { useState, useEffect } from 'react';
import Reviews from '../components/Reviews';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/reviews.json', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Помилка завантаження відгуків:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase animate-pulse">
          Завантаження відгуків...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <Reviews reviews={reviews} />
    </div>
  );
}
