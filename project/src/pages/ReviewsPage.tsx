import { useState } from 'react';
import Reviews from '../components/Reviews';
import reviewsData from '../data/reviews.json';
import SEO from '../components/SEO';

export default function ReviewsPage() {
  const [reviews] = useState<any[]>((reviewsData as any)?.items || []);

  return (
    <>
      <SEO title={reviews.length > 0 ? 'Відгуки' : 'Reviews'} path="/reviews" />
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
        <Reviews reviews={reviews} />
      </div>
    </>
  );
}
