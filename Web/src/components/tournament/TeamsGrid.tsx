import { getAllTeams } from '@/data/teams';

export default function TeamsGrid() {
  const teams = getAllTeams();

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-white rounded-full"></div>
        <h2 className="text-2xl font-bold text-white">参赛战队</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="glass-panel p-6 rounded-2xl transition-all duration-300 hover:bg-white/5 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded bg-${team.theme.primary} flex items-center justify-center font-bold text-white`}
              >
                {team.logo}
              </div>
              <div>
                <h4 className="font-bold text-white">{team.name}</h4>
              </div>
            </div>
            <p className="text-sm text-gray-400">队长：{team.captain}</p>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              队员：{team.members.join('、')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

