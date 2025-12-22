import { rules } from '@/data/rules';
import { organizers } from '@/data/organizers';

export default function RulesSection() {
  return (
    <section className="space-y-6 sm:space-y-8">
      {/* 比赛规则 */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1 h-6 sm:h-8 bg-gray-500 rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">比赛规则</h2>
          </div>
          <a
            href="#"
            className="text-xs sm:text-sm text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-1"
          >
            详细规则 <span className="text-xs">→</span>
          </a>
        </div>
        <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl text-gray-300 leading-relaxed">
          <ul className="list-disc pl-4 sm:pl-5 space-y-2 sm:space-y-3 text-sm sm:text-base">
            {rules.map((rule, index) => (
              <li key={index}>
                <strong className="text-white">{rule.title}：</strong>
                <span className="whitespace-pre-line">{rule.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 赛事组委 */}
      <div>
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-1 h-6 sm:h-8 bg-brand-secondary rounded-full"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">赛事组委</h2>
        </div>
        <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {organizers.map((organizer, index) => (
              <div
                key={index}
                className="text-center p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-brand-secondary/30"
              >
                <div className="text-base sm:text-lg font-bold text-white mb-1">
                  {organizer.name}
                </div>
                <div className="text-xs sm:text-sm text-brand-secondary">
                  {organizer.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

