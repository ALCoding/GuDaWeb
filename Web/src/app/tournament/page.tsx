'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import StandingsTable from '@/components/tournament/StandingsTable';
import ScheduleTabs from '@/components/tournament/ScheduleTabs';
import RulesSection from '@/components/tournament/RulesSection';
import TeamsGrid from '@/components/tournament/TeamsGrid';
import PosterModal from '@/components/tournament/PosterModal';

export default function TournamentPage() {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark pb-20">
      {/* Header */}
      <div className="pt-28 sm:pt-32 pb-8 sm:pb-12 px-4 bg-gradient-to-b from-brand-accent/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 sm:mb-6 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            返回首页
          </Link>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              2025 固搭羽毛球团体赛
            </h1>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
              单循环积分赛制 · 4支战队 · 巅峰对决
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 md:space-y-12">
        {/* Standings Section */}
        <StandingsTable onGeneratePoster={() => setIsPosterModalOpen(true)} />

        {/* Schedule Section */}
        <ScheduleTabs />

        {/* Rules Section */}
        <RulesSection />

        {/* Teams Section */}
        <TeamsGrid />
      </div>

      {/* Poster Modal */}
      <PosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
      />
    </div>
  );
}

