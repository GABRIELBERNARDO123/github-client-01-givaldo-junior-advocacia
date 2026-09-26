import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'minimal';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center min-w-0 max-w-full ${className}`}>
      <img 
        src="/assets/favicon-removebg-preview.png" 
        alt="Logotipo Oficial Dr. Givaldo Júnior Advocacia — OAB/PR 100.231" 
        className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(197,168,128,0.25)] transition-transform hover:scale-[1.02]" 
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.includes('favicon.png')) {
            target.src = '/assets/favicon.png';
          } else if (!target.src.includes('logo-givaldo-gold.svg')) {
            target.src = '/assets/logo-givaldo-gold.svg';
          }
        }}
      />
    </div>
  );
};
