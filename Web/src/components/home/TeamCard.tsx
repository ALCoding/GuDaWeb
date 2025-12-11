import { Team } from '@/types';

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="bg-gray-900/50 rounded-2xl p-8 border border-white/5 card-hover team-card cursor-pointer group">
      <div className="flex flex-col items-center mb-6">
        <div
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${team.theme.gradient} flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg ${team.theme.shadow} team-icon transition-all duration-300`}
        >
          {team.logo}
        </div>
        <h3 className="text-xl font-bold text-white">{team.name}</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
          <span className="text-gray-400">队长</span>
          <span className="text-white font-medium">{team.captain}</span>
        </div>
        <div className="text-sm text-gray-400 leading-relaxed text-center pt-2">
          {team.members[0]} · {team.members[1]}
          <br />
          {team.members[2]} · {team.members[3]}
          <br />
          {team.members[4]} · {team.members[5]}
        </div>
      </div>
    </div>
  );
}

