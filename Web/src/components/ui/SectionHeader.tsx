interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  color?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  color = 'brand-accent',
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-1 h-8 bg-${color} rounded-full`}></div>
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

