'use client';

import { useState, useEffect } from 'react';
import { MatchCategory, MatchCategoryLabel, Match } from '@/types';
import { getMatchesByCategory, matches as baseMatches } from '@/data/matches';
import MatchRow from './MatchRow';

const categoryLabels: Record<MatchCategory, string> = {
  MD: "Men's",
  WD: "Women's",
  XD: 'Mixed',
};

export default function ScheduleTabs() {
  const [activeCategory, setActiveCategory] = useState<MatchCategory>('MD');
  const [matchesWithScores, setMatchesWithScores] = useState<Match[]>([]);

  const categories: MatchCategory[] = ['MD', 'WD', 'XD'];

  // 从 JSON 加载比分数据并合并
  useEffect(() => {
    const loadScores = async () => {
      try {
        const response = await fetch('/data/scores.json?t=' + Date.now());
        if (response.ok) {
          const scoreData: { matches: Array<{ id: string; info?: string; games: number[][] }> } = await response.json();
          
          // 合并比分数据到 matches
          const merged = baseMatches.map((match) => {
            const scoreMatch = scoreData.matches.find((m) => m.id === match.id);
            if (!scoreMatch || scoreMatch.games.length === 0) {
              return match;
            }
            
            // 转换比分格式，过滤掉平局情况
            const games = scoreMatch.games
              .map(([scoreA, scoreB], index) => {
                // 确定获胜方（如果平局，跳过该局）
                let winner: 'A' | 'B' | null = null;
                if (scoreA > scoreB) {
                  winner = 'A';
                } else if (scoreB > scoreA) {
                  winner = 'B';
                } else {
                  // 平局情况（不应该发生，但需要处理）
                  return null;
                }
                return {
                  gameNumber: index + 1,
                  scoreA,
                  scoreB,
                  winner,
                };
              })
              .filter((game): game is { gameNumber: number; scoreA: number; scoreB: number; winner: 'A' | 'B' } => game !== null);
            
            const winsA = games.filter((g) => g.winner === 'A').length;
            const winsB = games.filter((g) => g.winner === 'B').length;
            
            return {
              ...match,
              games,
              totalGamesPlayed: games.length,
              winner: winsA > winsB ? match.teamA : winsB > winsA ? match.teamB : null,
              status: match.status, // 保持原有状态，实际判断使用 games.length
            };
          });
          
          setMatchesWithScores(merged);
        } else {
          setMatchesWithScores(baseMatches);
        }
      } catch (error) {
        console.error('Failed to load scores:', error);
        setMatchesWithScores(baseMatches);
      }
    };
    
    loadScores();
    
    // 定期刷新（每30秒）
    const interval = setInterval(loadScores, 30000);
    return () => clearInterval(interval);
  }, []);

  const matches = matchesWithScores.length > 0 
    ? matchesWithScores.filter((m) => m.category === activeCategory)
    : getMatchesByCategory(activeCategory);

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

