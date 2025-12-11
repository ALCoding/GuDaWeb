interface RankBadgeProps {
  rank: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function RankBadge({ rank, size = 'md' }: RankBadgeProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const rankClass = `rank-${rank}`;

  return (
    <div className={`rank-badge ${rankClass} ${sizeClasses[size]}`}>
      {rank}
    </div>
  );
}

