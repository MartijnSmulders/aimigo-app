import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'sm' }) => {
  const [imgError, setImgError] = useState(false);

  // Dimensions for styling
  const sizeClasses = size === 'lg'
    ? "w-56 h-auto" 
    : "h-10 w-auto";

  if (imgError) {
    // Fallback SVG logo (Gradient Text + Green Dot accent) in case image is missing
    return (
      <div className={`${className} flex items-center justify-center`}>
        <svg
          viewBox="0 0 240 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={sizeClasses}
          aria-label="AImigo Logo"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#06b6d4" /> {/* Cyan-500 */}
              <stop offset="50%" stopColor="#3b82f6" /> {/* Blue-500 */}
              <stop offset="100%" stopColor="#d946ef" /> {/* Fuchsia-500 */}
            </linearGradient>
          </defs>
          
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="'Inter', sans-serif"
            fontWeight="800"
            fontSize="52"
            fill="url(#logoGradient)"
            letterSpacing="-1.5"
          >
            AImigo
          </text>
          
          {/* Green dot accent on the i */}
          <circle cx="158" cy="18" r="5" fill="#4ade80" />
          <circle cx="158" cy="18" r="9" stroke="#4ade80" strokeOpacity="0.4" strokeWidth="2" />
          
          {/* Decorative curve */}
          <path
            d="M 60 58 Q 120 68 180 58"
            stroke="url(#logoGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.3"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="AImigo"
      className={`object-contain ${sizeClasses} ${className}`}
      onError={() => setImgError(true)}
    />
  );
};

export default Logo;