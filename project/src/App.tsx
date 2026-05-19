import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Добавь этот импорт:
import { LanguageProvider } from './context/LanguageContext'; 

import Navbar from './components/Navbar';
import LanguageSwitcher from './components/LanguageSwitcher';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ReviewsPage from './pages/ReviewsPage';
import FaqPage from './pages/FaqPage';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white font-sans antialiased">
          <Navbar />
          <LanguageSwitcher />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
