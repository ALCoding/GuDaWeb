import { Match, MatchCategory } from '@/types';

// 比赛数据（比赛开始后更新）
// 目前比赛尚未开始，数据为空
export const matches: Match[] = [
  // ========================================
  // 比赛尚未开始，待更新
  // ========================================
  // 
  // 单循环赛制：每支队伍需与其他3支队伍各进行一场团体赛
  // 共 6 场团体赛 (C(4,2) = 6)
  // 每场团体赛包含 6 场单项赛（男双2场、女双2场、混双2场）
  // 总计 36 场单项赛
  //
  // 对阵安排：
  // 第1轮：A vs B, C vs D
  // 第2轮：A vs C, B vs D  
  // 第3轮：A vs D, B vs C
  // ========================================
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

