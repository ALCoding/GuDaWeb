import Link from 'next/link';
import { getAllTeams } from '@/data/teams';
import TeamCard from './TeamCard';
import { ArrowRight } from 'lucide-react';

export default function TournamentSection() {
  const teams = getAllTeams();

  return (
    <div id="tournament" className="py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              2025 固搭羽毛球团体赛
            </h2>
            <p className="text-gray-400">单循环积分赛制 · 4支战队 · 巅峰对决</p>
          </div>

          {/* Refined Details Page Entry Button */}
          <Link
            href="/tournament"
            className="btn-shiny flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-accent/20 to-brand-accent/10 hover:from-brand-accent/30 hover:to-brand-accent/20 text-brand-accent hover:text-white rounded-full border border-brand-accent/30 hover:border-brand-accent/60 transition-all font-semibold shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] group"
          >
            <span className="relative z-10">进入赛事详情</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}

