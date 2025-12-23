import { Match, MatchCategory } from '@/types';

// 比赛数据
// 单循环赛制：每支队伍与其他3支队伍各进行一场团体赛
// 每场团体赛包含3个单项（男双、女双、混双各1场）
// 共 18 场单项赛，分为 5 轮（每轮4场，最后一轮2场）

export const matches: Match[] = [
  // ========================================
  // 第1轮（4场）
  // ========================================
  {
    id: 'R1-1',
    round: 1,
    category: 'WD',
    matchNumber: 1,
    teamA: 'A',
    teamB: 'B',
    playersA: ['苏苏🌟', '舒婵'],
    playersB: ['夏天吃黄瓜', '🍊姐'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R1-2',
    round: 1,
    category: 'WD',
    matchNumber: 2,
    teamA: 'C',
    teamB: 'D',
    playersA: ['千喜🌟', '咩啊'],
    playersB: ['木子', '小周'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R1-3',
    round: 1,
    category: 'MD',
    matchNumber: 3,
    teamA: 'A',
    teamB: 'C',
    playersA: ['Healer🌟', '颖祺🌟'],
    playersB: ['🍊哥🌟', '库辛🌟'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R1-4',
    round: 1,
    category: 'MD',
    matchNumber: 4,
    teamA: 'B',
    teamB: 'D',
    playersA: ['子强🌟', '肯尼斯(子)'],
    playersB: ['肯尼斯(父)🌟', '来财'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },

  // ========================================
  // 第2轮（4场）
  // ========================================
  {
    id: 'R2-1',
    round: 2,
    category: 'XD',
    matchNumber: 5,
    teamA: 'A',
    teamB: 'B',
    playersA: ['Season', '莉婷'],
    playersB: ['金周🌟', '虫虫'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R2-2',
    round: 2,
    category: 'XD',
    matchNumber: 6,
    teamA: 'C',
    teamB: 'D',
    playersA: ['Jalen', '阿呆'],
    playersB: ['wuli沈大大', '姿懿🌟'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R2-3',
    round: 2,
    category: 'MD',
    matchNumber: 7,
    teamA: 'A',
    teamB: 'D',
    playersA: ['Healer🌟', '颖祺🌟'],
    playersB: ['肯尼斯(父)🌟', '来财'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R2-4',
    round: 2,
    category: 'MD',
    matchNumber: 8,
    teamA: 'B',
    teamB: 'C',
    playersA: ['子强🌟', '肯尼斯(子)'],
    playersB: ['🍊哥🌟', '库辛🌟'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  
  // ========================================
  // 第3轮（4场）
  // ========================================
  {
    id: 'R3-1',
    round: 3,
    category: 'WD',
    matchNumber: 9,
    teamA: 'A',
    teamB: 'C',
    playersA: ['苏苏🌟', '舒婵'],
    playersB: ['千喜🌟', '咩啊'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R3-2',
    round: 3,
    category: 'XD',
    matchNumber: 10,
    teamA: 'A',
    teamB: 'D',
    playersA: ['Season', '莉婷'],
    playersB: ['wuli沈大大', '姿懿🌟'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R3-3',
    round: 3,
    category: 'WD',
    matchNumber: 11,
    teamA: 'B',
    teamB: 'D',
    playersA: ['夏天吃黄瓜', '🍊姐'],
    playersB: ['木子', '小周'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R3-4',
    round: 3,
    category: 'XD',
    matchNumber: 12,
    teamA: 'B',
    teamB: 'C',
    playersA: ['金周🌟', '虫虫'],
    playersB: ['Jalen', '阿呆'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  
  // ========================================
  // 第4轮（4场）
  // ========================================
  {
    id: 'R4-1',
    round: 4,
    category: 'MD',
    matchNumber: 13,
    teamA: 'A',
    teamB: 'B',
    playersA: ['Healer🌟', '颖祺🌟'],
    playersB: ['子强🌟', '肯尼斯(子)'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R4-2',
    round: 4,
    category: 'MD',
    matchNumber: 14,
    teamA: 'C',
    teamB: 'D',
    playersA: ['🍊哥🌟', '库辛🌟'],
    playersB: ['肯尼斯(父)🌟', '来财'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R4-3',
    round: 4,
    category: 'WD',
    matchNumber: 15,
    teamA: 'A',
    teamB: 'D',
    playersA: ['苏苏🌟', '舒婵'],
    playersB: ['木子', '小周'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R4-4',
    round: 4,
    category: 'WD',
    matchNumber: 16,
    teamA: 'B',
    teamB: 'C',
    playersA: ['夏天吃黄瓜', '🍊姐'],
    playersB: ['千喜🌟', '咩啊'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },

  // ========================================
  // 第5轮（2场）
  // ========================================
  {
    id: 'R5-1',
    round: 5,
    category: 'XD',
    matchNumber: 17,
    teamA: 'A',
    teamB: 'C',
    playersA: ['Season', '莉婷'],
    playersB: ['Jalen', '阿呆'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
  {
    id: 'R5-2',
    round: 5,
    category: 'XD',
    matchNumber: 18,
    teamA: 'B',
    teamB: 'D',
    playersA: ['金周🌟', '虫虫'],
    playersB: ['wuli沈大大', '姿懿🌟'],
    games: [],
    totalGamesPlayed: 0,
    winner: null,
    status: 'upcoming',
  },
];

// ============================================
// 工具函数
// ============================================

/** 按单项类型筛选比赛 */
export function getMatchesByCategory(category: MatchCategory): Match[] {
  return matches.filter((m) => m.category === category);
}

/** 按轮次筛选比赛 */
export function getMatchesByRound(round: number): Match[] {
  return matches.filter((m) => m.round === round);
}

/** 获取某轮次某单项的所有比赛 */
export function getMatchesByRoundAndCategory(
  round: number,
  category: MatchCategory
): Match[] {
  return matches.filter((m) => m.round === round && m.category === category);
}

/** 计算某场比赛的局比分（如 "2:1"） */
export function getGameScore(match: Match): { winsA: number; winsB: number } {
  const winsA = match.games.filter((g) => g.winner === 'A').length;
  const winsB = match.games.filter((g) => g.winner === 'B').length;
  return { winsA, winsB };
}
