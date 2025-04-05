
import React from 'react';

interface OutlookIconProps {
  className?: string;
}

const OutlookIcon: React.FC<OutlookIconProps> = ({ className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 50 50"
      className={className}
      fill="currentColor"
      width="50" 
      height="50"
    >
      <path d="M41 4H16c-1.657 0-3 1.343-3 3v2h31V7C44 5.343 42.657 4 41 4zM44.94 46.5C44.37 46.82 43.7 47 43 47H14c-2.21 0-4-1.79-4-4v-6h9c1.09 0 2.1-.35 2.92-.95L44.94 46.5zM47 31.08V43c0 .72-.19 1.4-.54 1.99l-15.72-7.13L47 31.08zM35 11H44V18H35zM24 11H33V18H24zM35 20H44V27H35zM24 20H33V27H24zM33 29L33 34.75 28.25 36.73 24 34.8 24 29zM44 29L44 30.16 35 33.92 35 29zM22 11v3c-.83-.63-1.87-1-3-1h-6v-2H22zM19 35H5c-1.657 0-3-1.343-3-3V18c0-1.657 1.343-3 3-3h14c1.657 0 3 1.343 3 3v14C22 33.657 20.657 35 19 35zM12 19c-3.516 0-5.634 2.686-5.634 6s2.11 6 5.634 6c3.525 0 5.634-2.686 5.634-5.999C17.634 21.686 15.516 19 12 19zM12 28.975c-1.995 0-3.187-1.779-3.187-3.974s1.198-3.974 3.187-3.974 3.188 1.78 3.188 3.974S13.994 28.975 12 28.975z" />
    </svg>
  );
};

export default OutlookIcon;
