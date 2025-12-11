import { Match, MatchCategory } from '@/types';

export const matches: Match[] = [
  // ========================================
  // 第1轮：猛虎队(A) vs 雄鹰队(B)
  // ========================================
  
  // 男双1
  {
    id: 'R1-MD-1',
    round: 1,
    category: 'MD',
    matchNumber: 1,
    teamA: 'A',
    teamB: 'B',
    playersA: ['张三', '李四'],
    playersB: ['令狐冲', '风清扬'],
    games: [
      { gameNumber: 1, scoreA: 21, scoreB: 19, winner: 'A' },
      { gameNumber: 2, scoreA: 18, scoreB: 21, winner: 'B' },
      { gameNumber: 3, scoreA: 21, scoreB: 15, winner: 'A' },
    ],
    totalGamesPlayed: 3,
    winner: 'A',
    status: 'completed',
  },
  
  // 男双2
  {
    id: 'R1-MD-2',
    round: 1,
    category: 'MD',
    matchNumber: 2,
    teamA: 'A',
    teamB: 'B',
    playersA: ['孙七', '周八'],
    playersB: ['向问天', '计无施'],
    games: [
      { gameNumber: 1, scoreA: 21, scoreB: 15, winner: 'A' },
      { gameNumber: 2, scoreA: 21, scoreB: 12, winner: 'A' },
    ],
    totalGamesPlayed: 2,
    winner: 'A',
    status: 'completed',
  },
  
  // 女双1
  {
    id: 'R1-WD-1',
    round: 1,
    category: 'WD',
    matchNumber: 1,
    teamA: 'A',
    teamB: 'B',
    playersA: ['王五(女)', '赵六(女)'],
    playersB: ['岳灵珊', '蓝凤凰'],
    games: [
      { gameNumber: 1, scoreA: 15, scoreB: 21, winner: 'B' },
      { gameNumber: 2, scoreA: 21, scoreB: 19, winner: 'A' },
      { gameNumber: 3, scoreA: 18, scoreB: 21, winner: 'B' },
    ],
    totalGamesPlayed: 3,
    winner: 'B',
    status: 'completed',
  },
  
  // 混双1
  {
    id: 'R1-XD-1',
    round: 1,
    category: 'XD',
    matchNumber: 1,
    teamA: 'A',
    teamB: 'B',
    playersA: ['张三', '赵六(女)'],
    playersB: ['令狐冲', '岳灵珊'],
    games: [
      { gameNumber: 1, scoreA: 18, scoreB: 21, winner: 'B' },
      { gameNumber: 2, scoreA: 19, scoreB: 21, winner: 'B' },
    ],
    totalGamesPlayed: 2,
    winner: 'B',
    status: 'completed',
  },
  
  // ========================================
  // 第1轮：猎豹队(C) vs 战狼队(D)
  // ========================================
  
  // 男双1
  {
    id: 'R1-MD-3',
    round: 1,
    category: 'MD',
    matchNumber: 3,
    teamA: 'C',
    teamB: 'D',
    playersA: ['杨过', '耶律齐'],
    playersB: ['郭靖', '柯镇恶'],
    games: [
      { gameNumber: 1, scoreA: 21, scoreB: 15, winner: 'A' },
      { gameNumber: 2, scoreA: 21, scoreB: 18, winner: 'A' },
    ],
    totalGamesPlayed: 2,
    winner: 'C',
    status: 'completed',
  },
  
  // 男双2
  {
    id: 'R1-MD-4',
    round: 1,
    category: 'MD',
    matchNumber: 4,
    teamA: 'C',
    teamB: 'D',
    playersA: ['武敦儒', '武修文'],
    playersB: ['南希仁', '全金发'],
    games: [
      { gameNumber: 1, scoreA: 18, scoreB: 21, winner: 'B' },
      { gameNumber: 2, scoreA: 19, scoreB: 21, winner: 'B' },
    ],
    totalGamesPlayed: 2,
    winner: 'D',
    status: 'completed',
  },
  
  // 女双1
  {
    id: 'R1-WD-2',
    round: 1,
    category: 'WD',
    matchNumber: 2,
    teamA: 'C',
    teamB: 'D',
    playersA: ['小龙女', '郭芙'],
    playersB: ['黄蓉', '韩小莹'],
    games: [
      { gameNumber: 1, scoreA: 21, scoreB: 10, winner: 'A' },
      { gameNumber: 2, scoreA: 21, scoreB: 12, winner: 'A' },
    ],
    totalGamesPlayed: 2,
    winner: 'C',
    status: 'completed',
  },
  
  // 混双1
  {
    id: 'R1-XD-2',
    round: 1,
    category: 'XD',
    matchNumber: 2,
    teamA: 'C',
    teamB: 'D',
    playersA: ['杨过', '小龙女'],
    playersB: ['郭靖', '黄蓉'],
    games: [
      { gameNumber: 1, scoreA: 20, scoreB: 22, winner: 'B' },
      { gameNumber: 2, scoreA: 21, scoreB: 18, winner: 'A' },
      { gameNumber: 3, scoreA: 21, scoreB: 19, winner: 'A' },
    ],
    totalGamesPlayed: 3,
    winner: 'C',
    status: 'completed',
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

