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
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-brand-secondary rounded-full"></div>
        <h2 className="text-2xl font-bold text-white">详细赛程</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-white/10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeCategory === category
                ? 'text-brand-secondary border-brand-secondary font-bold'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            <span>{MatchCategoryLabel[category]}</span>
            <span className="text-xs bg-white/10 px-1.5 rounded text-gray-400">
              {categoryLabels[category]}
            </span>
          </button>
        ))}
      </div>

      {/* Schedule Content */}
      <div className="space-y-4">
        <div className="glass-panel rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-gray-400 text-xs uppercase">
              <tr>
                <th className="py-3 px-4 text-left">轮次 / 对阵</th>
                <th className="py-3 px-4 text-right w-1/4">选手 A</th>
                <th className="py-3 px-4 text-center w-32">比分</th>
                <th className="py-3 px-4 text-left w-1/4">选手 B</th>
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
    </section>
  );
}

