import { rules } from '@/data/rules';

export default function RulesSection() {
  return (
    <section>
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
              {rule.content}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

