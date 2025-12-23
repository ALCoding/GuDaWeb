'use client';

import { useState, useEffect } from 'react';
import { standings, tournamentStatus, tournamentStartDate } from '@/data/standings';
import { getTeam, getAllTeams } from '@/data/teams';
import RankBadge from '@/components/ui/RankBadge';
import { Share2, Trophy, Clock, Zap, Maximize2, X } from 'lucide-react';
import { calculateStandingsFromJSON } from '@/utils/calculateStandings';
import { TeamId } from '@/types';

interface StandingsTableProps {
  onGeneratePoster: () => void;
}

interface CalculatedStanding {
  team: TeamId;
  played: number;
  won: number;
  lost: number;
  pointsDiff: number;
  points: number;
}

export default function StandingsTable({ onGeneratePoster }: StandingsTableProps) {
  const [calculatedStandings, setCalculatedStandings] = useState<CalculatedStanding[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 加载并计算积分榜（ongoing 和 finished 状态都需要）
  useEffect(() => {
    if (tournamentStatus === 'ongoing' || tournamentStatus === 'finished') {
      setIsLoading(true);
      calculateStandingsFromJSON()
        .then((data) => {
          setCalculatedStandings(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // tournamentStatus 是常量导入，不需要作为依赖

  // 定期刷新（每30秒）
  useEffect(() => {
    if (tournamentStatus === 'ongoing') {
      const interval = setInterval(() => {
        calculateStandingsFromJSON().then(setCalculatedStandings);
      }, 30000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // tournamentStatus 是常量导入，不需要作为依赖

  // ESC 键关闭全屏
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreen]);
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

  // 渲染积分榜表格内容
  const renderStandingsTable = (isFullscreenMode = false) => (
    <div className={`glass-panel ${isFullscreenMode ? 'rounded-2xl' : 'rounded-xl sm:rounded-2xl'} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className={`w-full text-left ${isFullscreenMode ? 'min-w-[800px]' : 'min-w-[600px]'}`}>
          <thead className="bg-white/5 text-gray-400 text-xs sm:text-sm uppercase tracking-wider">
            <tr>
              <th className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'} font-semibold text-center w-16 sm:w-20`}>排名</th>
              <th className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'} font-semibold`}>战队</th>
              <th className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'} font-semibold text-center`}>场次</th>
              <th className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'} font-semibold text-center`}>胜负</th>
              <th className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'} font-semibold text-center`}>净胜</th>
              <th className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'} font-semibold text-center text-brand-accent`}>积分</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  加载中...
                </td>
              </tr>
            ) : calculatedStandings.length > 0 ? (
              calculatedStandings.map((standing, index) => {
                const team = getTeam(standing.team);
                const rank = index + 1;
                
                return (
                  <tr key={standing.team} className="table-row-hover transition-colors">
                    <td className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'} flex justify-center`}>
                      <div className={`${isFullscreenMode ? 'w-10 h-10' : 'w-8 h-8'} rounded-full bg-white/10 flex items-center justify-center text-gray-400 font-bold ${isFullscreenMode ? 'text-base' : 'text-sm'}`}>
                        {rank}
                      </div>
                    </td>
                    <td className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'}`}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`${isFullscreenMode ? 'w-10 h-10' : 'w-7 h-7 sm:w-8 sm:h-8'} rounded-lg bg-${team.theme.primary} flex items-center justify-center ${isFullscreenMode ? 'text-sm' : 'text-xs'} font-bold text-white shrink-0`}>
                          {team.logo}
                        </div>
                        <span className={`font-bold text-white ${isFullscreenMode ? 'text-lg' : 'text-sm sm:text-base'}`}>{team.name}</span>
                      </div>
                    </td>
                    <td className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'} text-gray-300 text-center ${isFullscreenMode ? 'text-base' : 'text-sm sm:text-base'}`}>
                      {standing.played}
                    </td>
                    <td className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'} text-white text-center font-medium ${isFullscreenMode ? 'text-base' : 'text-sm sm:text-base'}`}>
                      {standing.won}-{standing.lost}
                    </td>
                    <td className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'} text-center ${isFullscreenMode ? 'text-base' : 'text-sm sm:text-base'} ${standing.pointsDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {standing.pointsDiff >= 0 ? '+' : ''}{standing.pointsDiff}
                    </td>
                    <td className={`px-3 sm:px-6 ${isFullscreenMode ? 'py-4' : 'py-3 sm:py-4'} text-brand-accent text-center font-bold ${isFullscreenMode ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
                      {standing.points}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 比赛进行中时显示实时积分榜
  if (tournamentStatus === 'ongoing') {

    return (
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1 h-6 sm:h-8 bg-brand-secondary rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">实时积分榜</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
              </span>
              <span className="text-brand-secondary text-xs sm:text-sm font-medium">比赛进行中</span>
            </div>
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/20 text-brand-accent text-xs sm:text-sm font-medium transition-all hover:scale-105 whitespace-nowrap"
            >
              <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
              全屏查看
            </button>
          </div>
        </div>

        {renderStandingsTable(false)}

        {/* 全屏模态框 */}
        {isFullscreen && (
          <div 
            className="fixed inset-0 z-50 bg-brand-dark flex items-center justify-center p-4 landscape:items-start landscape:pt-4 landscape:pb-4"
            onClick={() => setIsFullscreen(false)}
            style={{ 
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          >
            <div 
              className="w-full max-w-7xl relative landscape:max-h-[95vh] portrait:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="fixed top-4 right-4 sm:absolute sm:-top-10 sm:right-4 text-white hover:text-brand-accent transition-colors p-2 z-10 bg-brand-dark/80 rounded-full backdrop-blur-sm"
                aria-label="关闭全屏"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* 全屏内容 */}
              <div className="bg-brand-dark">
                <div className="mb-4 sm:mb-6 text-center landscape:mb-3">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl landscape:text-3xl font-bold text-white mb-2 landscape:mb-1">实时积分榜</h2>
                  <p className="text-gray-400 text-sm sm:text-base landscape:text-xs">横屏查看效果更佳 · 按 ESC 退出</p>
                </div>
                {renderStandingsTable(true)}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  // 比赛未开始时显示的面板
  if (tournamentStatus === 'upcoming') {
    return (
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1 h-6 sm:h-8 bg-brand-secondary rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">赛事积分榜</h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
            </span>
            <span className="text-brand-secondary text-xs sm:text-sm font-medium">即将开赛</span>
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
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">18</div>
                <div className="text-xs sm:text-sm text-gray-500">总场次</div>
              </div>
              <div className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">3</div>
                <div className="text-xs sm:text-sm text-gray-500">比赛项目</div>
              </div>
              <div className="p-4 sm:p-6 text-center flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-bold text-brand-accent mb-1 flex items-center justify-center h-[1.875rem] sm:h-[2.25rem]">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
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
          <div className="w-1 h-6 sm:h-8 bg-brand-secondary rounded-full"></div>
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    加载中...
                  </td>
                </tr>
              ) : calculatedStandings.length > 0 ? (
                calculatedStandings.map((standing, index) => {
                  const team = getTeam(standing.team);
                  const rank = index + 1;
                  const rankLabel = getRankLabel(rank);

                  return (
                    <tr
                      key={standing.team}
                      className={`table-row-hover transition-colors ${getRankBgClass(rank)}`}
                    >
                      <td className="px-3 sm:px-6 py-3 sm:py-4 flex justify-center">
                        <RankBadge rank={rank} size="sm" />
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-${team.theme.primary} flex items-center justify-center text-xs font-bold text-white relative overflow-hidden shrink-0`}
                          >
                            {team.logo}
                            {rank === 1 && (
                              <div className="absolute inset-0 bg-yellow-400 mix-blend-overlay opacity-50"></div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div
                              className={`font-bold ${rank <= 3 ? 'text-white text-base sm:text-lg' : 'text-gray-400 text-sm sm:text-base'} flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2`}
                            >
                              <span className="truncate">{team.name}</span>
                              {rankLabel && (
                                <span
                                  className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full inline-block w-fit ${
                                    rank === 1
                                      ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                                      : rank === 2
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
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

