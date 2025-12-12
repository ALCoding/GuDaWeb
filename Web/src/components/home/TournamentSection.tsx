import Link from 'next/link';
import { getAllTeams } from '@/data/teams';
import TeamCard from './TeamCard';
import { ArrowRight } from 'lucide-react';

export default function TournamentSection() {
  const teams = getAllTeams();

  return (
    <div id="tournament" className="py-16 sm:py-20 md:py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              2025 固搭羽毛球团体赛
            </h2>
            <p className="text-sm sm:text-base text-gray-400">单循环积分赛制 · 4支战队 · 巅峰对决</p>
          </div>

          {/* Refined Details Page Entry Button */}
          <Link
            href="/tournament"
            className="btn-shiny relative flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-br from-brand-accent via-brand-accent-glow to-brand-accent text-white rounded-full transition-all font-bold shadow-lg shadow-brand-accent/30 hover:shadow-xl hover:shadow-brand-accent/50 group text-sm sm:text-base whitespace-nowrap overflow-hidden"
          >
            {/* 光晕效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
            
            <span className="relative z-10">🏆 赛事详情</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}

