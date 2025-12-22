import { Team, TeamId } from '@/types';

export const teams: Record<TeamId, Team> = {
  A: {
    id: 'A',
    name: '他还爱我对不队',
    logo: 'A', // 暂用字母，后续可替换为实际图片路径
    captain: '黄舒婵',
    members: ['黄舒婵', '苏苏', '莉婷', 'Season', '颖祺', 'Healer'],
    theme: {
      primary: 'blue-600',
      gradient: 'from-blue-500 to-blue-700',
      shadow: 'shadow-blue-500/20',
      textAccent: 'text-blue-400',
    },
  },
  B: {
    id: 'B',
    name: '虫队',
    logo: 'B',
    captain: '虫虫',
    members: ['夏天吃黄瓜', '🍊姐', '虫虫', '金周', '林子强', '肯尼斯（子）'],
    theme: {
      primary: 'cyan-600',
      gradient: 'from-cyan-500 to-cyan-700',
      shadow: 'shadow-cyan-500/20',
      textAccent: 'text-cyan-400',
    },
  },
  C: {
    id: 'C',
    name: '摸鱼传奇队',
    logo: 'C',
    captain: '🍊哥',
    members: ['千喜', '咩啊', '阿呆', 'Jalen', '🍊哥', '库幸'],
    theme: {
      primary: 'purple-600',
      gradient: 'from-purple-500 to-purple-700',
      shadow: 'shadow-purple-500/20',
      textAccent: 'text-purple-400',
    },
  },
  D: {
    id: 'D',
    name: '偷后场不队',
    logo: 'D',
    captain: 'wuli沈大大',
    members: ['木子', '小周', '恣懿', 'wuli沈大大', '来财', '肯尼斯（父）'],
    theme: {
      primary: 'rose-600',
      gradient: 'from-rose-500 to-rose-700',
      shadow: 'shadow-rose-500/20',
      textAccent: 'text-rose-400',
    },
  },
};

// 获取指定战队信息
export function getTeam(id: TeamId): Team {
  return teams[id];
}

// 获取所有战队（数组形式）
export function getAllTeams(): Team[] {
  return Object.values(teams);
}

