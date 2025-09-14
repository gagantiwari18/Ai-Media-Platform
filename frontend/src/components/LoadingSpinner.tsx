import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Processing...', 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse opacity-20" />
        <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 absolute animate-spin" />
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium text-center">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;