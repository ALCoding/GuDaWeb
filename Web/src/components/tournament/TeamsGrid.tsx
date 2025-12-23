import { getAllTeams } from '@/data/teams';

export default function TeamsGrid() {
  const teams = getAllTeams();

  return (
    <section>
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-1 h-6 sm:h-8 bg-brand-secondary rounded-full"></div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">参赛战队</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="glass-panel p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-white/5 hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded bg-${team.theme.primary} flex items-center justify-center font-bold text-white shrink-0`}
              >
                {team.logo}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm sm:text-base">{team.name}</h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">队长：{team.captain}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
              参赛队员：{team.members.join('、')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

