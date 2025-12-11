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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-brand-accent rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">最终积分榜</h2>
        </div>
        <button
          onClick={onGeneratePoster}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/20 text-brand-accent text-sm font-medium transition-all hover:scale-105"
        >
          <Share2 className="w-4 h-4" />
          生成战报海报
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold text-center w-20">排名</th>
                <th className="px-6 py-4 font-semibold">战队</th>
                <th className="px-6 py-4 font-semibold text-center">场次</th>
                <th className="px-6 py-4 font-semibold text-center">胜 - 负</th>
                <th className="px-6 py-4 font-semibold text-center">净胜分</th>
                <th className="px-6 py-4 font-semibold text-center text-brand-accent">
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
                    <td className="px-6 py-4 flex justify-center">
                      <RankBadge rank={standing.rank} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-${team.theme.primary} flex items-center justify-center text-xs font-bold text-white relative overflow-hidden`}
                        >
                          {team.logo}
                          {standing.rank === 1 && (
                            <div className="absolute inset-0 bg-yellow-400 mix-blend-overlay opacity-50"></div>
                          )}
                        </div>
                        <div>
                          <span
                            className={`font-bold ${standing.rank <= 3 ? 'text-white text-lg' : 'text-gray-400'} flex items-center gap-2`}
                          >
                            {team.name}
                            {rankLabel && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  standing.rank === 1
                                    ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                                    : standing.rank === 2
                                      ? 'bg-gray-400/20 text-gray-400 border border-gray-400/30'
                                      : 'bg-orange-700/20 text-orange-600 border border-orange-700/30'
                                }`}
                              >
                                {rankLabel}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-center">
                      {standing.played}
                    </td>
                    <td className="px-6 py-4 text-white text-center font-medium">
                      {standing.won} - {standing.lost}
                    </td>
                    <td
                      className={`px-6 py-4 text-center ${standing.pointsDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {standing.pointsDiff >= 0 ? '+' : ''}
                      {standing.pointsDiff}
                    </td>
                    <td className="px-6 py-4 text-brand-accent text-center font-bold text-xl">
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

