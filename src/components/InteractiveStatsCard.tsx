import { Card } from './ui/card';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface InteractiveStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'indigo';
  onClick?: () => void;
}

export default function InteractiveStatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue,
  color,
  onClick
}: InteractiveStatsCardProps) {
  const colorVariants = {
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      valueColor: 'text-blue-600'
    },
    purple: {
      gradient: 'from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      valueColor: 'text-purple-600'
    },
    green: {
      gradient: 'from-emerald-500 to-emerald-600',
      lightBg: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      valueColor: 'text-emerald-600'
    },
    orange: {
      gradient: 'from-amber-500 to-amber-600',
      lightBg: 'bg-amber-50',
      textColor: 'text-amber-600',
      iconBg: 'bg-amber-100',
      valueColor: 'text-amber-600'
    },
    red: {
      gradient: 'from-red-500 to-red-600',
      lightBg: 'bg-red-50',
      textColor: 'text-red-600',
      iconBg: 'bg-red-100',
      valueColor: 'text-red-600'
    },
    indigo: {
      gradient: 'from-indigo-500 to-indigo-600',
      lightBg: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      valueColor: 'text-indigo-600'
    }
  };

  const currentColor = colorVariants[color];

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3" />;
      case 'down':
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card 
        className={`
          relative overflow-hidden cursor-pointer border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300
          bg-white group
        `}
        onClick={onClick}
      >
        {/* Accent background overlay */}
        <div className={`absolute inset-0 ${currentColor.lightBg} opacity-30 group-hover:opacity-50 transition-opacity`} />
        
        <div className="relative p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
              
              <div className="flex items-baseline gap-2 mb-3">
                <motion.p 
                  className={`text-3xl font-bold ${currentColor.valueColor}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {value}
                </motion.p>
                {subtitle && (
                  <p className="text-xs text-slate-500">{subtitle}</p>
                )}
              </div>

              {trend && trendValue && (
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
            
            <div className={`${currentColor.iconBg} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
              <div className={`${currentColor.textColor}`}>
                {icon}
              </div>
            </div>
          </div>

          {/* Subtle gradient line indicator */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${currentColor.gradient} opacity-40 group-hover:opacity-70 transition-opacity`} />
        </div>
      </Card>
    </motion.div>
  );
}
