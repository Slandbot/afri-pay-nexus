
import { CircleDollarSign } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  textColor?: string;
  iconColor?: string;
}

const Logo = ({ 
  size = 'md', 
  textColor = 'text-afri-primary', 
  iconColor = 'text-afri-accent' 
}: LogoProps) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };
  
  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  return (
    <div className="flex items-center gap-2">
      <CircleDollarSign className={`${iconColor}`} size={iconSizes[size]} />
      <span className={`font-bold ${sizeClasses[size]} ${textColor}`}>
        AfriPay<span className="text-afri-accent">Nexus</span>
      </span>
    </div>
  );
};

export default Logo;
