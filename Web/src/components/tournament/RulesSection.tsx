import { rules } from '@/data/rules';

export default function RulesSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gray-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">比赛规则</h2>
        </div>
        <a
          href="#"
          className="text-sm text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-1"
        >
          详细规则 <span className="text-xs">→</span>
        </a>
      </div>
      <div className="glass-panel p-8 rounded-2xl text-gray-300 leading-relaxed">
        <ul className="list-disc pl-5 space-y-2">
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

