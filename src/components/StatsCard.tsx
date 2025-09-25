import { Card } from './ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue 
}: StatsCardProps) {
  const trendColor = {
    up: 'text-accent',
    down: 'text-red-500',
    neutral: 'text-muted-foreground'
  };

  return (
    <Card className="p-4 rounded-xl border-0 shadow-sm bg-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && trendValue && (
            <p className={`text-xs mt-1 ${trendColor[trend]}`}>
              {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
            </p>
          )}
        </div>
        <div className="text-primary text-2xl ml-4">
          {icon}
        </div>
      </div>
    </Card>
  );
}