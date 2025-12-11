'use client';

export default function HeroSection() {
  const scrollToTournament = () => {
    const tournamentSection = document.getElementById('tournament');
    tournamentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient pt-20"
    >
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl filter mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl filter mix-blend-screen"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-xs sm:text-sm mb-3 sm:mb-4">
          EST. 2025 / GuDa Badminton Club
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 mb-4 sm:mb-6 leading-tight">
          挥洒汗水
          <br />
          <span className="text-white">极致热爱</span>
        </h1>
        <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 leading-relaxed px-2">
          不仅是运动，更是一种生活方式。
          <br className="hidden sm:block" />
          <span className="hidden sm:inline">加入固搭，与城市中最有趣的灵魂一起，在球场上释放能量。</span>
          <span className="sm:hidden">加入固搭，在球场上释放能量。</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
          <button
            onClick={scrollToTournament}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-brand-accent text-white rounded-full font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group text-sm sm:text-base"
          >
            <span className="hidden sm:inline">🔥 2025固搭羽毛球团体赛火热进行中 🏸</span>
            <span className="sm:hidden">🔥 团体赛火热进行中 🏸</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Tournament Stats */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 border-t border-white/10 pt-8 sm:pt-10">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              4 <span className="text-xs sm:text-sm font-normal text-gray-400">支</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">参赛强队</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              3 <span className="text-xs sm:text-sm font-normal text-gray-400">项</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">激烈赛制</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">Gift</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">奖牌礼品</div>
          </div>
        </div>
      </div>
    </div>
  );
}

