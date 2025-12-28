import { Match, TeamId } from '@/types';
import { matches } from '@/data/matches';

interface ScoreData {
  matches: Array<{
    id: string;
    info?: string; // 注释信息，不影响计算
    games: number[][]; // [[scoreA, scoreB], [scoreA, scoreB], ...]
  }>;
}

interface CalculatedStanding {
  team: TeamId;
  played: number;
  won: number;
  lost: number;
  pointsDiff: number; // 净胜分数（总得分-总失分）
  points: number; // 总积分
}

/**
 * 从 JSON 数据计算积分榜
 */
export async function calculateStandingsFromJSON(): Promise<CalculatedStanding[]> {
  try {
    // 尝试从 JSON 加载比分数据
    const response = await fetch('/data/scores.json?t=' + Date.now());
    if (!response.ok) {
      return calculateStandingsFromMatches(matches);
    }
    
    const scoreData: ScoreData = await response.json();
    
    // 将 JSON 比分数据合并到 matches 数据中
    const matchesWithScores = matches.map((match) => {
      const scoreMatch = scoreData.matches.find((m) => m.id === match.id);
      if (!scoreMatch || scoreMatch.games.length === 0) {
        return match;
      }
      
      // 转换比分格式
      const games = scoreMatch.games
        .map(([scoreA, scoreB], index) => {
          // 确定获胜方（如果平局，跳过该局）
          let winner: 'A' | 'B' | null = null;
          if (scoreA > scoreB) {
            winner = 'A';
          } else if (scoreB > scoreA) {
            winner = 'B';
          } else {
            // 平局情况（不应该发生，但需要处理）
            return null;
          }
          return {
            gameNumber: index + 1,
            scoreA,
            scoreB,
            winner,
          };
        })
        .filter((game): game is { gameNumber: number; scoreA: number; scoreB: number; winner: 'A' | 'B' } => game !== null);
      
      const winsA = games.filter((g) => g.winner === 'A').length;
      const winsB = games.filter((g) => g.winner === 'B').length;
      
      return {
        ...match,
        games,
        totalGamesPlayed: games.length,
        winner: winsA > winsB ? match.teamA : winsB > winsA ? match.teamB : null,
        status: match.status, // 保持原有状态，实际判断使用 games.length
      };
    });
    
    return calculateStandingsFromMatches(matchesWithScores);
  } catch (error) {
    console.error('Failed to load scores.json:', error);
    return calculateStandingsFromMatches(matches);
  }
}

/**
 * 从 matches 数据计算积分榜
 */
function calculateStandingsFromMatches(matchesData: Match[]): CalculatedStanding[] {
  const teamStats: Record<TeamId, CalculatedStanding> = {
    A: { team: 'A', played: 0, won: 0, lost: 0, pointsDiff: 0, points: 0 },
    B: { team: 'B', played: 0, won: 0, lost: 0, pointsDiff: 0, points: 0 },
    C: { team: 'C', played: 0, won: 0, lost: 0, pointsDiff: 0, points: 0 },
    D: { team: 'D', played: 0, won: 0, lost: 0, pointsDiff: 0, points: 0 },
  };
  
  // 计算每场比赛的积分
  matchesData.forEach((match) => {
    // 直接根据 games.length 判断比赛是否完成，不依赖 status
    if (match.games.length === 0) {
      return;
    }
    
    const winsA = match.games.filter((g) => g.winner === 'A').length;
    const winsB = match.games.filter((g) => g.winner === 'B').length;
    
    if (winsA === 0 && winsB === 0) {
      return; // 比赛未完成
    }
    
    // 计算总得分
    const totalScoreA = match.games.reduce((sum, g) => sum + g.scoreA, 0);
    const totalScoreB = match.games.reduce((sum, g) => sum + g.scoreB, 0);
    
    // 更新统计
    teamStats[match.teamA].played += 1;
    teamStats[match.teamB].played += 1;
    
    if (winsA > winsB) {
      teamStats[match.teamA].won += 1;
      teamStats[match.teamB].lost += 1;
      // 获胜积分规则：2:0胜得3分，2:1胜得2分
      // winsA === 2 时，如果 winsB === 0 则得3分，如果 winsB === 1 则得2分
      teamStats[match.teamA].points += winsB === 0 ? 3 : 2;
      // 战败积分规则：1:2败得1分，0:2败得0分
      teamStats[match.teamB].points += winsB === 1 ? 1 : 0;
    } else if (winsB > winsA) {
      teamStats[match.teamB].won += 1;
      teamStats[match.teamA].lost += 1;
      // 获胜积分规则：2:0胜得3分，2:1胜得2分
      teamStats[match.teamB].points += winsA === 0 ? 3 : 2;
      // 战败积分规则：1:2败得1分，0:2败得0分
      teamStats[match.teamA].points += winsA === 1 ? 1 : 0;
    }
    
    // 净胜分
    teamStats[match.teamA].pointsDiff += totalScoreA - totalScoreB;
    teamStats[match.teamB].pointsDiff += totalScoreB - totalScoreA;
  });
  
  // 获取所有队伍
  const allStandings = Object.values(teamStats);
  
  // 按积分分组，找出所有积分相同的队伍组
  const pointsGroups = new Map<number, CalculatedStanding[]>();
  allStandings.forEach((standing) => {
    if (!pointsGroups.has(standing.points)) {
      pointsGroups.set(standing.points, []);
    }
    pointsGroups.get(standing.points)!.push(standing);
  });
  
  // 计算每支队伍在积分相同组内的净胜场数（只考虑组内比赛）
  const netWinsInGroup: Partial<Record<TeamId, number>> = {};
  
  pointsGroups.forEach((group, points) => {
    if (group.length >= 2) {
      // 只对两队或以上的组计算组内净胜场数
      group.forEach((team) => {
        let netWins = 0;
        // 找出该队伍与组内其他队伍的比赛
        matchesData.forEach((match) => {
          // 直接根据 games.length 判断比赛是否完成，不依赖 status
          if (match.games.length === 0) {
            return;
          }
          
          const isTeamA = match.teamA === team.team;
          const isTeamB = match.teamB === team.team;
          const opponent = isTeamA ? match.teamB : isTeamB ? match.teamA : null;
          
          // 检查对手是否在同一积分组内
          if (opponent && group.some((t) => t.team === opponent)) {
            const winsA = match.games.filter((g) => g.winner === 'A').length;
            const winsB = match.games.filter((g) => g.winner === 'B').length;
            
            if (isTeamA) {
              netWins += winsA > winsB ? 1 : winsA < winsB ? -1 : 0;
            } else {
              netWins += winsB > winsA ? 1 : winsB < winsA ? -1 : 0;
            }
          }
        });
        netWinsInGroup[team.team] = netWins;
      });
    }
  });
  
  // 按规则排序
  return allStandings.sort((a, b) => {
    // a. 总积分高者列前
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    
    // 如果积分相同，需要进一步比较
    const samePointsTeams = pointsGroups.get(a.points) || [];
    
    if (samePointsTeams.length >= 2) {
      // b. 如两队或以上积分相同，则比较这些队伍之间全部比赛的净胜场数（总胜场-总负场）
      const netWinsA = netWinsInGroup[a.team] ?? 0;
      const netWinsB = netWinsInGroup[b.team] ?? 0;
      if (netWinsB !== netWinsA) {
        return netWinsB - netWinsA;
      }
    }
    
    // c. 若仍相同，则比较净胜分数（总得分-总失分）
    if (b.pointsDiff !== a.pointsDiff) {
      return b.pointsDiff - a.pointsDiff;
    }
    
    // d. 比较两队之间胜负关系，胜者列前
    const headToHead = matchesData.find(
      (m) =>
        m.games.length > 0 &&
        ((m.teamA === a.team && m.teamB === b.team) ||
          (m.teamA === b.team && m.teamB === a.team))
    );
    
    if (headToHead) {
      const winsA = headToHead.games.filter((g) => g.winner === 'A').length;
      const winsB = headToHead.games.filter((g) => g.winner === 'B').length;
      
      if (headToHead.teamA === a.team) {
        // A队是a，B队是b
        if (winsA > winsB) return -1; // a胜
        if (winsB > winsA) return 1; // b胜
      } else {
        // A队是b，B队是a
        if (winsA > winsB) return 1; // b胜
        if (winsB > winsA) return -1; // a胜
      }
    }
    
    // e. 若再相同，则抽签决定名次（按字母顺序，保持稳定排序）
    return a.team.localeCompare(b.team);
  });
}

