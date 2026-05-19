import FAQ from '../components/FAQ';

const modules = import.meta.glob('../data/faq/*.json', { eager: true }) as Record<string, any>;

const faqItems = Object.values(modules)
  .map((mod: any) => {
    const data = mod.default ?? mod;
    return {
      question: String(data.question ?? ''),
      answer: String(data.answer ?? ''),
    };
  })
  .filter(item => item.question);

export default function FaqPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      {faqItems.length === 0 ? (
        <div>
          <div className="mb-10">
            <p className="text-zinc-600 font-mono text-xs tracking-widest uppercase mb-3">ПИТАННЯ</p>
            <h1 className="text-white font-black text-5xl md:text-6xl tracking-tight leading-none uppercase">FAQ</h1>
          </div>
          <div className="flex items-center justify-center py-20 border border-dashed border-zinc-900 rounded-xl">
            <p className="text-zinc-600 font-mono text-xs tracking-widest uppercase">
              [ Питань поки немає. Додайте їх через панель керування ]
            </p>
          </div>
        </div>
      ) : (
        <FAQ items={faqItems} />
      )}
    </div>
  );
}
