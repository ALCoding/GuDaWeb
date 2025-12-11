import { Match } from '@/types';
import { getTeam } from '@/data/teams';

interface MatchRowProps {
  match: Match;
}

export default function MatchRow({ match }: MatchRowProps) {
  const teamA = getTeam(match.teamA);
  const teamB = getTeam(match.teamB);

  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="py-3 sm:py-4 px-2 sm:px-4">
        <div className="flex items-center gap-1 sm:gap-2 mb-1">
          <span className="text-[10px] sm:text-xs bg-brand-accent/20 text-brand-accent px-1 sm:px-1.5 rounded">
            R{match.round}
          </span>
          <span className="text-gray-400 text-[10px] sm:text-xs">
            {match.category === 'MD' ? '男双' : match.category === 'WD' ? '女双' : '混双'}
            {match.matchNumber}
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 font-bold text-white text-xs sm:text-sm">
          <span className={teamA.theme.textAccent}>{teamA.name}</span>
          <span className="text-gray-600">vs</span>
          <span className={teamB.theme.textAccent}>{teamB.name}</span>
        </div>
      </td>
      <td className="py-3 sm:py-4 px-2 sm:px-4 text-right font-medium text-xs sm:text-sm">
        <span className="hidden sm:inline">{match.playersA.join(' / ')}</span>
        <span className="sm:hidden">{match.playersA.join('/')}</span>
      </td>
      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
        <div className="flex flex-col items-center gap-0.5 sm:gap-1 font-mono text-[10px] sm:text-xs">
          {match.games.map((game) => (
            <div key={game.gameNumber} className="flex gap-1 sm:gap-2">
              <span
                className={
                  game.winner === 'A'
                    ? 'text-brand-accent font-bold'
                    : 'text-gray-500'
                }
              >
                {game.scoreA}
              </span>
              <span className="text-gray-600">-</span>
              <span
                className={
                  game.winner === 'B'
                    ? 'text-brand-accent font-bold'
                    : 'text-gray-500'
                }
              >
                {game.scoreB}
              </span>
            </div>
          ))}
        </div>
      </td>
      <td className="py-3 sm:py-4 px-2 sm:px-4 text-left font-medium text-xs sm:text-sm">
        <span className="hidden sm:inline">{match.playersB.join(' / ')}</span>
        <span className="sm:hidden">{match.playersB.join('/')}</span>
      </td>
    </tr>
  );
}

