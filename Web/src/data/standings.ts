import { StandingEntry } from '@/types';

export const standings: StandingEntry[] = [
  {
    rank: 1,
    rankType: 'champion',
    team: 'A',
    played: 3,
    won: 3,
    lost: 0,
    pointsDiff: 18,
    points: 9,
  },
  {
    rank: 2,
    rankType: 'runner-up',
    team: 'B',
    played: 3,
    won: 2,
    lost: 1,
    pointsDiff: 8,
    points: 6,
  },
  {
    rank: 3,
    rankType: 'third',
    team: 'C',
    played: 3,
    won: 1,
    lost: 2,
    pointsDiff: -5,
    points: 3,
  },
  {
    rank: 4,
    rankType: 'fourth',
    team: 'D',
    played: 3,
    won: 0,
    lost: 3,
    pointsDiff: -21,
    points: 0,
  },
];

// 根据战队ID获取积分榜信息
export function getStandingByTeam(teamId: string): StandingEntry | undefined {
  return standings.find((s) => s.team === teamId);
}

