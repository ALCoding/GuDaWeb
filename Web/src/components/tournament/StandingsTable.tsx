'use client';

import { standings, tournamentStatus, tournamentStartDate } from '@/data/standings';
import { getTeam, getAllTeams } from '@/data/teams';
import RankBadge from '@/components/ui/RankBadge';
import { Share2, Trophy, Clock, Zap } from 'lucide-react';

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

  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // 比赛未开始或进行中时显示的面板
  if (tournamentStatus === 'upcoming' || tournamentStatus === 'ongoing') {
    return (
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1 h-6 sm:h-8 bg-brand-accent rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">赛事积分榜</h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
            </span>
            <span className="text-brand-secondary text-xs sm:text-sm font-medium">
              {tournamentStatus === 'upcoming' ? '即将开赛' : '比赛进行中'}
            </span>
          </div>
        </div>

        <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden">
          {/* 顶部状态区域 */}
          <div className="relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 via-transparent to-brand-secondary/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative p-6 sm:p-10 text-center">
              {/* 图标 */}
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 border border-white/10 mb-4 sm:mb-6">
                {tournamentStatus === 'upcoming' ? (
                  <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-brand-accent" />
                ) : (
                  <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-brand-secondary animate-pulse" />
                )}
              </div>
              
              {/* 标题 */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {tournamentStatus === 'upcoming' ? '比赛即将开始' : '比赛激烈进行中'}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-6">
                {tournamentStatus === 'upcoming' 
                  ? `开赛日期：${formatDate(tournamentStartDate)}` 
                  : '积分榜将在比赛结束后更新'}
              </p>
              
              {/* 参赛队伍预览 */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                {getAllTeams().map((team, index) => (
                  <div key={team.id} className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-${team.theme.primary} flex items-center justify-center text-lg sm:text-xl font-bold text-white shadow-lg transition-transform hover:scale-110 cursor-default`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {team.logo}
                    </div>
                    <span className="text-xs text-gray-500 hidden sm:block">{team.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 底部统计预览 */}
          <div className="border-t border-white/5 bg-black/20">
            <div className="grid grid-cols-4 divide-x divide-white/5">
              <div className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">4</div>
                <div className="text-xs sm:text-sm text-gray-500">参赛队伍</div>
              </div>
              <div className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">36</div>
                <div className="text-xs sm:text-sm text-gray-500">总场次</div>
              </div>
              <div className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">3</div>
                <div className="text-xs sm:text-sm text-gray-500">比赛项目</div>
              </div>
              <div className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-brand-accent mb-1">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" />
                </div>
                <div className="text-xs sm:text-sm text-gray-500">待揭晓</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 比赛结束后显示完整积分榜
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

