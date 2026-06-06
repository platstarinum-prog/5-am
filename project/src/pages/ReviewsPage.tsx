import { useState } from 'react';
import Reviews from '../components/Reviews';
import reviewsData from '../data/reviews.json';
import { useLang } from '../i18n/LanguageContext';
import SEO from '../components/SEO';

export default function ReviewsPage() {
  const { t } = useLang();
  const [reviews] = useState<any[]>((reviewsData as any)?.items || []);

  return (
    <>
      <SEO title={reviews.length > 0 ? t('reviews.title') : 'Reviews'} path="/reviews" />
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
        <Reviews reviews={reviews} />
      </div>
    </>
  );
}
