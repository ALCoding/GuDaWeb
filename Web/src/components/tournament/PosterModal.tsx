'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { TeamId } from '@/types';
import { getTeam } from '@/data/teams';
import { getStandingByTeam, tournamentStatus } from '@/data/standings';
import { calculateStandingsFromJSON } from '@/utils/calculateStandings';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CalculatedStanding {
  team: TeamId;
  played: number;
  won: number;
  lost: number;
  pointsDiff: number;
  points: number;
}

export default function PosterModal({ isOpen, onClose }: PosterModalProps) {
  const [selectedTeam, setSelectedTeam] = useState<TeamId | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [posterImage, setPosterImage] = useState<string | null>(null);
  const [calculatedStandings, setCalculatedStandings] = useState<CalculatedStanding[]>([]);
  const posterRef = useRef<HTMLDivElement>(null);

  const teams: TeamId[] = ['A', 'B', 'C', 'D'];

  // 加载计算出的积分榜（finished 状态需要）
  useEffect(() => {
    if (isOpen && tournamentStatus === 'finished') {
      calculateStandingsFromJSON().then(setCalculatedStandings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // tournamentStatus 是常量导入，不需要作为依赖

  // 获取队伍的积分榜数据（优先使用计算出的数据）
  const getStandingData = (teamId: TeamId) => {
    if (tournamentStatus === 'finished' && calculatedStandings.length > 0) {
      const calculated = calculatedStandings.find((s) => s.team === teamId);
      if (calculated) {
        // 找到排名
        const rank = calculatedStandings
          .map((s, index) => ({ team: s.team, rank: index + 1 }))
          .find((s) => s.team === teamId)?.rank || 4;
        
        return {
          rank,
          played: calculated.played,
          won: calculated.won,
          lost: calculated.lost,
          pointsDiff: calculated.pointsDiff,
          points: calculated.points,
        };
      }
    }
    // 回退到静态数据
    const staticStanding = getStandingByTeam(teamId);
    if (staticStanding) {
      return {
        rank: staticStanding.rank,
        played: staticStanding.played,
        won: staticStanding.won,
        lost: staticStanding.lost,
        pointsDiff: staticStanding.pointsDiff,
        points: staticStanding.points,
      };
    }
    return null;
  };

  const generatePoster = async (teamId: TeamId) => {
    setSelectedTeam(teamId);
    setIsGenerating(true);

    // 等待 DOM 更新
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (posterRef.current) {
      try {
        const canvas = await html2canvas(posterRef.current, {
          scale: 2,
          backgroundColor: '#0F1115',
          useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        setPosterImage(imgData);
      } catch (error) {
        console.error('生成海报失败:', error);
      }
    }

    setIsGenerating(false);
  };

  const resetModal = () => {
    setSelectedTeam(null);
    setPosterImage(null);
    setIsGenerating(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  const getRankEmoji = (rank: number) => {
    const emojis: Record<number, string> = {
      1: '👑',
      2: '🥈',
      3: '🥉',
      4: '',
    };
    return emojis[rank] || '';
  };

  const getRankText = (rank: number) => {
    const texts: Record<number, string> = {
      1: '年度总冠军 Champion',
      2: '年度亚军 Runner-up',
      3: '年度季军 Third Place',
      4: '殿军 Fourth Place',
    };
    return texts[rank] || '';
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 modal-backdrop transition-opacity"
        onClick={handleClose}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-[#1F2937] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-10 transform transition-all scale-100">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-xl font-bold text-white mb-6">生成战报海报</h3>

          {/* Step 1: Select Team */}
          {!posterImage && (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm mb-4">请选择要生成战报的队伍：</p>
              <div className="grid grid-cols-2 gap-4">
                {teams.map((teamId) => {
                  const team = getTeam(teamId);
                  const standing = getStandingData(teamId);
                  if (!standing) return null;

                  return (
                    <button
                      key={teamId}
                      onClick={() => generatePoster(teamId)}
                      disabled={isGenerating}
                      className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl border border-white/5 hover:border-brand-accent/50 transition-all group text-left disabled:opacity-50"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-8 h-8 rounded bg-${team.theme.primary} flex items-center justify-center text-xs font-bold text-white`}
                        >
                          {team.logo}
                        </div>
                        <span className="font-bold text-white">{team.name}</span>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          standing.rank === 1
                            ? 'text-yellow-500'
                            : standing.rank === 2
                              ? 'text-gray-400'
                              : standing.rank === 3
                                ? 'text-orange-600'
                                : 'text-gray-500'
                        }`}
                      >
                        {getRankEmoji(standing.rank)} {getRankText(standing.rank)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Preview */}
          {posterImage && (
            <div className="text-center">
              <div className="mb-4 rounded-lg overflow-hidden shadow-lg mx-auto bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={posterImage} alt="战报海报" className="w-full h-auto" />
              </div>
              <p className="text-xs text-gray-500 mb-4">长按图片保存或分享给朋友</p>
              <button
                onClick={resetModal}
                className="text-sm text-gray-400 hover:text-white underline"
              >
                重新选择队伍
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Poster Template */}
      {selectedTeam && (
        <div
          ref={posterRef}
          className="fixed left-[-9999px] top-0 w-[375px] bg-[#0F1115] text-white p-0 overflow-hidden font-sans"
          style={{ height: '667px' }}
        >
          <PosterContent teamId={selectedTeam} />
        </div>
      )}
    </div>
  );
}

function PosterContent({ teamId }: { teamId: TeamId }) {
  const team = getTeam(teamId);
  
  // 获取积分榜数据（需要在组件内部重新获取，因为这是独立的组件）
  const [standing, setStanding] = useState<{
    rank: number;
    played: number;
    won: number;
    lost: number;
    pointsDiff: number;
    points: number;
  } | null>(null);

  useEffect(() => {
    const loadStanding = async () => {
      if (tournamentStatus === 'finished') {
        const calculated = await calculateStandingsFromJSON();
        const calculatedStanding = calculated.find((s) => s.team === teamId);
        if (calculatedStanding) {
          const rank = calculated
            .map((s, index) => ({ team: s.team, rank: index + 1 }))
            .find((s) => s.team === teamId)?.rank || 4;
          setStanding({
            rank,
            played: calculatedStanding.played,
            won: calculatedStanding.won,
            lost: calculatedStanding.lost,
            pointsDiff: calculatedStanding.pointsDiff,
            points: calculatedStanding.points,
          });
        }
      } else {
        const staticStanding = getStandingByTeam(teamId);
        if (staticStanding) {
          setStanding({
            rank: staticStanding.rank,
            played: staticStanding.played,
            won: staticStanding.won,
            lost: staticStanding.lost,
            pointsDiff: staticStanding.pointsDiff,
            points: staticStanding.points,
          });
        }
      }
    };
    loadStanding();
  }, [teamId]);

  if (!standing) return null;

  // 获取排名信息
  const getRankInfo = (rank: number) => {
    const configs = {
      1: {
        emoji: '👑',
        title: '冠军',
        subtitle: 'CHAMPION',
        bgGradient: 'from-yellow-500/20 via-yellow-600/10 to-transparent',
        accentColor: '#F59E0B',
        badgeGradient: 'from-yellow-400 to-yellow-600',
        textColor: 'text-yellow-400',
      },
      2: {
        emoji: '🥈',
        title: '亚军',
        subtitle: 'RUNNER-UP',
        bgGradient: 'from-gray-400/20 via-gray-500/10 to-transparent',
        accentColor: '#9CA3AF',
        badgeGradient: 'from-gray-300 to-gray-500',
        textColor: 'text-gray-300',
      },
      3: {
        emoji: '🥉',
        title: '季军',
        subtitle: 'THIRD PLACE',
        bgGradient: 'from-orange-500/20 via-orange-600/10 to-transparent',
        accentColor: '#F97316',
        badgeGradient: 'from-orange-400 to-orange-600',
        textColor: 'text-orange-400',
      },
      4: {
        emoji: '',
        title: '第四名',
        subtitle: 'FOURTH PLACE',
        bgGradient: 'from-gray-600/10 via-gray-700/5 to-transparent',
        accentColor: '#6B7280',
        badgeGradient: 'from-gray-600 to-gray-700',
        textColor: 'text-gray-400',
      },
    };
    return configs[rank as keyof typeof configs] || configs[4];
  };

  const rankInfo = getRankInfo(standing.rank);

  return (
    <div className="w-[375px] h-[667px] bg-[#0F1115] relative overflow-hidden flex flex-col">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1115] via-[#1a1d24] to-[#0F1115]"></div>
      <div className={`absolute inset-0 bg-gradient-to-br ${rankInfo.bgGradient}`}></div>
      
      {/* Decorative Circles */}
      <div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: rankInfo.accentColor }}
      ></div>
      <div 
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: rankInfo.accentColor }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full p-6">
        
        {/* Top Section - Brand */}
        <div className="text-center pt-4 pb-6">
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
            <p className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">
              GuDa Badminton Club 2025
            </p>
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            固搭羽毛球团体赛
          </h1>
        </div>

        {/* Main Content - Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center py-8">
          
          {/* Rank Badge */}
          <div className="mb-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${rankInfo.badgeGradient} flex items-center justify-center shadow-2xl relative`}>
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
              <span className="text-4xl relative z-10">{rankInfo.emoji || standing.rank}</span>
            </div>
          </div>

          {/* Rank Title */}
          <div className="mb-8 text-center">
            <div className={`text-3xl font-black ${rankInfo.textColor} mb-1 tracking-tight`}>
              {rankInfo.title}
            </div>
            <div className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
              {rankInfo.subtitle}
            </div>
          </div>

          {/* Team Name */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div 
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${team.theme.gradient} flex items-center justify-center text-xl font-bold text-white shadow-xl`}
              >
                {team.logo}
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight">
                {team.name}
              </h2>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="w-full max-w-[300px] bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-white mb-1">
                  {standing.won}
                </div>
                <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                  胜场
                </div>
              </div>
              
              <div className="text-center border-x border-white/10">
                <div className={`text-2xl font-black mb-1 ${standing.pointsDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {standing.pointsDiff >= 0 ? '+' : ''}{standing.pointsDiff}
                </div>
                <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                  净胜分
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-black text-brand-accent mb-1">
                  {standing.points}
                </div>
                <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                  积分
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section - Team Info & QR */}
        <div className="pb-4">
          {/* Team Members */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-4">
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Team Members
            </div>
            <div className="text-xs text-gray-300 leading-relaxed">
              <span className="text-white font-semibold">队长：</span>{team.captain}
              <br />
              <span className="text-white font-semibold">队员：</span>{team.members.join(' · ')}
            </div>
          </div>

          {/* Footer with QR */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white mb-0.5">
                扫码查看详情
              </div>
              <div className="text-[10px] text-gray-500">
                gudaclub.com
              </div>
            </div>
            <div className="w-14 h-14 bg-white rounded-lg p-1 shadow-xl">
              <QRCodeSVG
                value="https://gudaclub.com/tournament"
                size={48}
                level="H"
                includeMargin={false}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

