import { StandingEntry } from '@/types';

// 比赛状态：'upcoming' | 'ongoing' | 'finished'
export const tournamentStatus: 'upcoming' | 'ongoing' | 'finished' = 'upcoming';

// 比赛开始日期
export const tournamentStartDate = '2025-12-28';

export const standings: StandingEntry[] = [
  {
    rank: 1,
    rankType: 'fourth', // 比赛未开始，暂无排名
    team: 'A',
    played: 0,
    won: 0,
    lost: 0,
    pointsDiff: 0,
    points: 0,
  },
  {
    rank: 2,
    rankType: 'fourth',
    team: 'B',
    played: 0,
    won: 0,
    lost: 0,
    pointsDiff: 0,
    points: 0,
  },
  {
    rank: 3,
    rankType: 'fourth',
    team: 'C',
    played: 0,
    won: 0,
    lost: 0,
    pointsDiff: 0,
    points: 0,
  },
  {
    rank: 4,
    rankType: 'fourth',
    team: 'D',
    played: 0,
    won: 0,
    lost: 0,
    pointsDiff: 0,
    points: 0,
  },
];

// 根据战队ID获取积分榜信息
export function getStandingByTeam(teamId: string): StandingEntry | undefined {
  return standings.find((s) => s.team === teamId);
}

