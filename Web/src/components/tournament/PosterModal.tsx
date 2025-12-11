'use client';

import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { TeamId } from '@/types';
import { getTeam } from '@/data/teams';
import { getStandingByTeam } from '@/data/standings';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PosterModal({ isOpen, onClose }: PosterModalProps) {
  const [selectedTeam, setSelectedTeam] = useState<TeamId | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [posterImage, setPosterImage] = useState<string | null>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  const teams: TeamId[] = ['A', 'B', 'C', 'D'];

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
                  const standing = getStandingByTeam(teamId);
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
  const standing = getStandingByTeam(teamId);

  if (!standing) return null;

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-2xl font-bold text-yellow-900 shadow-xl border-4 border-yellow-200/20">
          1
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-2xl font-bold text-gray-900 shadow-xl border-4 border-gray-200/20">
          2
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-300 to-orange-600 flex items-center justify-center text-2xl font-bold text-orange-900 shadow-xl border-4 border-orange-200/20">
          3
        </div>
      );
    } else {
      return (
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold text-gray-400 shadow-xl border-4 border-white/5">
          4
        </div>
      );
    }
  };

  const getRankTextClass = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-gray-500';
  };

  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1115] to-[#1F2937] z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/10 rounded-full blur-[80px]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-[667px] p-8">
        {/* Header */}
        <div className="text-center mb-10 mt-4">
          <h2 className="text-brand-accent tracking-[0.2em] text-xs font-bold uppercase mb-2">
            GuDa Badminton Club 2025
          </h2>
          <h1 className="text-2xl font-bold text-white">固搭羽毛球团体赛</h1>
          <div className="mt-2 inline-block px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
            最终战报 · Final Report
          </div>
        </div>

        {/* Main Card */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 relative overflow-hidden mb-8">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>

          {/* Rank Badge */}
          <div className="mb-6 transform scale-150">{getRankBadge(standing.rank)}</div>

          {/* Team Info */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className={`w-10 h-10 rounded-lg bg-${team.theme.primary} flex items-center justify-center text-sm font-bold text-white shadow-lg`}
              >
                {team.logo}
              </div>
              <h2 className="text-3xl font-bold text-white">{team.name}</h2>
            </div>
            <p
              className={`text-xl font-bold tracking-wide uppercase ${getRankTextClass(standing.rank)}`}
            >
              {standing.rank === 1 && '👑 年度总冠军 Champion'}
              {standing.rank === 2 && '🥈 年度亚军 Runner-up'}
              {standing.rank === 3 && '🥉 年度季军 Third Place'}
              {standing.rank === 4 && '殿军 Fourth Place'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 w-full text-center border-t border-white/10 pt-6 mb-6">
            <div>
              <div className="text-xs text-gray-400 mb-1">胜 / 负</div>
              <div className="text-lg font-bold text-white font-mono">
                {standing.won} - {standing.lost}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">净胜分</div>
              <div
                className={`text-lg font-bold font-mono ${standing.pointsDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                {standing.pointsDiff >= 0 ? '+' : ''}
                {standing.pointsDiff}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">总积分</div>
              <div className="text-lg font-bold text-brand-accent font-mono">
                {standing.points}
              </div>
            </div>
          </div>

          {/* Members */}
          <div className="w-full text-center">
            <p className="text-xs text-gray-500 mb-2">Team Members</p>
            <p className="text-xs text-gray-300 leading-relaxed px-4">
              队长：{team.captain} | 队员：{team.members.join('、')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="text-left">
            <p className="text-xs text-gray-500">扫码查看详细赛程</p>
            <p className="text-[10px] text-gray-600 mt-1">www.gudaclub.com</p>
          </div>
          <div className="w-16 h-16 bg-white p-1 rounded-lg">
            <QRCodeSVG
              value="https://gudaclub.com/tournament"
              size={56}
              level="H"
              includeMargin={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

