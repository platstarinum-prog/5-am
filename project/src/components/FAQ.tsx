import { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FaqItem[];
}

export default function FAQ({ items = [] }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-black text-white min-h-screen py-24 px-6 selection:bg-white selection:text-black">
      <div className="max-w-2xl mx-auto">
        
        {/* Шапка FAQ в агрессивном минимализме */}
        <div className="mb-12">
          <p className="text-zinc-600 font-mono text-xs tracking-[0.2em] uppercase mb-3">
            ПИТАННЯ
          </p>
          <h1 className="text-white font-black text-5xl md:text-6xl tracking-tight leading-none uppercase">
            FAQ
          </h1>
        </div>

        {/* Список вопросов */}
        <div className="flex flex-col gap-2">
          {items && items.length > 0 ? (
            items.map((item, i) => (
              <div 
                key={i} 
                className="border border-zinc-900 rounded-xl overflow-hidden bg-zinc-950/40 backdrop-blur-sm transition-all duration-300"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-zinc-900/30 transition-colors cursor-pointer group"
                >
                  <span className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                    open === i ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}>
                    {item.question}
                  </span>
                  <span className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-full border transition-all duration-300 ${
                    open === i 
                      ? 'border-white text-white rotate-45 bg-white/5' 
                      : 'border-zinc-800 text-zinc-600 group-hover:border-zinc-700'
                  }`}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 1v8M1 5h8"/>
                    </svg>
                  </span>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  open === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-zinc-900/50 pt-4 font-normal">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-600 text-xs font-mono tracking-wider py-6">
              [ Питань поки немає. Додайте їх через панель керування ]
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
