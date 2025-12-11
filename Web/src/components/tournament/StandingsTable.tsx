'use client';

import { standings } from '@/data/standings';
import { getTeam } from '@/data/teams';
import RankBadge from '@/components/ui/RankBadge';
import { Share2 } from 'lucide-react';

interface StandingsTableProps {
  onGeneratePoster: () => void;
}

export default function StandingsTable({ onGeneratePoster }: StandingsTableProps) {
  const getRankLabel = (rank: number) => {
    const labels: Record<number, string> = {
      1: '冠军 Champion',
      2: '亚军 Runner-up',
      3: '季军 Third',
      4: '',
    };
    return labels[rank] || '';
  };

  const getRankBgClass = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500/5 to-transparent';
    return '';
  };

  return (
    <section>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-1 h-6 sm:h-8 bg-brand-accent rounded-full"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">最终积分榜</h2>
        </div>
        <button
          onClick={onGeneratePoster}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/20 text-brand-accent text-xs sm:text-sm font-medium transition-all hover:scale-105 whitespace-nowrap"
        >
          <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
          生成海报
        </button>
      </div>

      <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-white/5 text-gray-400 text-xs sm:text-sm uppercase tracking-wider">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-center w-16 sm:w-20">排名</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold">战队</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-center">场次</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-center">胜负</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-center">净胜</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-center text-brand-accent">
                  积分
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {standings.map((standing) => {
                const team = getTeam(standing.team);
                const rankLabel = getRankLabel(standing.rank);

                return (
                  <tr
                    key={standing.team}
                    className={`table-row-hover transition-colors ${getRankBgClass(standing.rank)}`}
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4 flex justify-center">
                      <RankBadge rank={standing.rank} size="sm" />
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-${team.theme.primary} flex items-center justify-center text-xs font-bold text-white relative overflow-hidden shrink-0`}
                        >
                          {team.logo}
                          {standing.rank === 1 && (
                            <div className="absolute inset-0 bg-yellow-400 mix-blend-overlay opacity-50"></div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`font-bold ${standing.rank <= 3 ? 'text-white text-base sm:text-lg' : 'text-gray-400 text-sm sm:text-base'} flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2`}
                          >
                            <span className="truncate">{team.name}</span>
                            {rankLabel && (
                              <span
                                className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full inline-block w-fit ${
                                  standing.rank === 1
                                    ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                                    : standing.rank === 2
                                      ? 'bg-gray-400/20 text-gray-400 border border-gray-400/30'
                                      : 'bg-orange-700/20 text-orange-600 border border-orange-700/30'
                                }`}
                              >
                                {rankLabel.split(' ')[0]}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-300 text-center text-sm sm:text-base">
                      {standing.played}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-white text-center font-medium text-sm sm:text-base">
                      {standing.won}-{standing.lost}
                    </td>
                    <td
                      className={`px-3 sm:px-6 py-3 sm:py-4 text-center text-sm sm:text-base ${standing.pointsDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {standing.pointsDiff >= 0 ? '+' : ''}
                      {standing.pointsDiff}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-brand-accent text-center font-bold text-lg sm:text-xl">
                      {standing.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

