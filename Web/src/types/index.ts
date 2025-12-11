// ============================================
// 战队相关类型
// ============================================

/** 战队标识 */
export type TeamId = 'A' | 'B' | 'C' | 'D';

/** 战队颜色主题 */
export interface TeamTheme {
  primary: string;      // 主色 Tailwind class, 如 'blue-600'
  gradient: string;     // 渐变背景 class
  shadow: string;       // 阴影颜色 class
  textAccent: string;   // 文字强调色 class, 如 'text-blue-400'
}

/** 战队信息 */
export interface Team {
  id: TeamId;
  name: string;           // 队名，如 "猛虎队"
  logo: string;           // 战队 Logo 图片路径（暂用字母代替）
  captain: string;        // 队长姓名
  members: string[];      // 队员列表（不含队长）
  theme: TeamTheme;       // 颜色主题
}

// ============================================
// 比赛相关类型
// ============================================

/**
 * 比赛层级说明：
 * - 轮次 (Round): 单循环赛制共3轮，每轮2场团体对决
 * - 场次 (Match): 每场团体赛包含多个单项比赛
 * - 局次 (Game): 每个单项采用三局两胜制，局数为2或3
 */

/** 单项类型 */
export type MatchCategory = 'MD' | 'WD' | 'XD';

/** 单项类型中文映射 */
export const MatchCategoryLabel: Record<MatchCategory, string> = {
  MD: '男双',  // Men's Doubles
  WD: '女双',  // Women's Doubles
  XD: '混双',  // Mixed Doubles
};

/** 单局比分（最小粒度） */
export interface GameScore {
  gameNumber: number;   // 局次序号：1, 2, 3
  scoreA: number;       // 甲方得分
  scoreB: number;       // 乙方得分
  winner: 'A' | 'B';    // 本局获胜方
}

/** 单项比赛（一场团体赛中的某个单项） */
export interface Match {
  id: string;                       // 唯一标识，格式: "R{轮次}-{单项}-{场序}"
  
  // === 层级信息 ===
  round: number;                    // 轮次：1, 2, 3
  category: MatchCategory;          // 单项类型
  matchNumber: number;              // 该单项的场次序号
  
  // === 对阵信息 ===
  teamA: TeamId;                    // 甲方战队
  teamB: TeamId;                    // 乙方战队
  playersA: string[];               // 甲方选手名单（2人）
  playersB: string[];               // 乙方选手名单（2人）
  
  // === 比分信息 ===
  games: GameScore[];               // 各局比分，长度为 2 或 3
  totalGamesPlayed: number;         // 总局数：2 或 3
  
  // === 结果信息 ===
  winner: TeamId | null;            // 获胜方
  status: 'upcoming' | 'completed'; // 比赛状态
}

// ============================================
// 积分榜相关类型
// ============================================

/** 排名类型 */
export type RankType = 'champion' | 'runner-up' | 'third' | 'fourth';

/** 积分榜条目 */
export interface StandingEntry {
  rank: number;                   // 排名 1-4
  rankType: RankType;             // 排名类型（用于样式）
  team: TeamId;                   // 战队 ID
  played: number;                 // 已赛场次
  won: number;                    // 胜场
  lost: number;                   // 负场
  pointsDiff: number;             // 净胜分（正/负）
  points: number;                 // 总积分
}

// ============================================
// 海报相关类型
// ============================================

/** 海报数据 */
export interface PosterData {
  team: Team;
  standing: StandingEntry;
  qrCodeUrl: string;              // 二维码链接
}

