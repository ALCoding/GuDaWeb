'use client';

import { useState } from 'react';
import { MatchCategory, MatchCategoryLabel } from '@/types';
import { getMatchesByCategory } from '@/data/matches';
import MatchRow from './MatchRow';

const categoryLabels: Record<MatchCategory, string> = {
  MD: "Men's",
  WD: "Women's",
  XD: 'Mixed',
};

export default function ScheduleTabs() {
  const [activeCategory, setActiveCategory] = useState<MatchCategory>('MD');

  const categories: MatchCategory[] = ['MD', 'WD', 'XD'];
  const matches = getMatchesByCategory(activeCategory);

  return (
    <section>
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-1 h-6 sm:h-8 bg-brand-secondary rounded-full"></div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">详细赛程</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 sm:gap-6 mb-4 sm:mb-6 border-b border-white/10 overflow-x-auto pb-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`pb-2 sm:pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap text-sm sm:text-base ${
              activeCategory === category
                ? 'text-brand-secondary border-brand-secondary font-bold'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            <span>{MatchCategoryLabel[category]}</span>
            <span className="text-[10px] sm:text-xs bg-white/10 px-1 sm:px-1.5 rounded text-gray-400">
              {categoryLabels[category]}
            </span>
          </button>
        ))}
      </div>

      {/* Schedule Content */}
      <div className="space-y-4">
        <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm min-w-[600px]">
              <thead className="bg-white/5 text-gray-400 text-[10px] sm:text-xs uppercase">
                <tr>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">轮次 / 对阵</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-right w-1/4">选手 A</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-center w-24 sm:w-32">比分</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left w-1/4">选手 B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {matches.map((match) => (
                  <MatchRow key={match.id} match={match} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

