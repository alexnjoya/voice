import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Waves, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ModernAudioIconProps {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  isInitializing: boolean;
  hasPermission: boolean | null;
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'floating' | 'inline' | 'minimal';
}

const ModernAudioIcon = ({
  isListening,
  isSpeaking,
  isProcessing,
  isInitializing,
  hasPermission,
  onClick,
  className,
  size = 'lg',
  variant = 'floating'
}: ModernAudioIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  // Enhanced pulse animation for listening state
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setPulseCount(prev => (prev + 1) % 3);
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  const getButtonStyles = () => {
    const baseStyles = cn(
      'rounded-full transition-all duration-300 transform',
      'shadow-2xl hover:shadow-lg',
      'border-2 border-white/20',
      'focus:outline-none focus:ring-4 focus:ring-blue-500/50',
      'active:scale-95',
      sizeClasses[size],
      className
    );

    if (isListening) {
      return cn(
        baseStyles,
        'bg-gradient-to-r from-red-500 to-pink-600',
        'hover:from-red-600 hover:to-pink-700',
        'shadow-red-500/50 animate-pulse',
        isPressed && 'scale-95'
      );
    }

    if (isSpeaking) {
      return cn(
        baseStyles,
        'bg-gradient-to-r from-blue-500 to-indigo-600',
        'hover:from-blue-600 hover:to-indigo-700',
        'shadow-blue-500/50 animate-pulse',
        isPressed && 'scale-95'
      );
    }

    if (isProcessing) {
      return cn(
        baseStyles,
        'bg-gradient-to-r from-yellow-500 to-orange-600',
        'hover:from-yellow-600 hover:to-orange-700',
        'shadow-yellow-500/50',
        isPressed && 'scale-95'
      );
    }

    if (isInitializing) {
      return cn(
        baseStyles,
        'bg-gradient-to-r from-gray-500 to-gray-600',
        'hover:from-gray-600 hover:to-gray-700',
        'shadow-gray-500/50',
        isPressed && 'scale-95'
      );
    }

    if (!hasPermission) {
      return cn(
        baseStyles,
        'bg-gradient-to-r from-gray-400 to-gray-500',
        'hover:from-gray-500 hover:to-gray-600',
        'shadow-gray-400/50',
        'opacity-60',
        isPressed && 'scale-95'
      );
    }

    return cn(
      baseStyles,
      'bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600',
      'hover:from-purple-600 hover:via-blue-600 hover:to-indigo-700',
      'shadow-blue-500/30',
      isHovered && 'scale-110',
      isPressed && 'scale-95'
    );
  };

  const getIcon = () => {
    if (isListening) {
      return (
        <div className="relative flex items-center justify-center">
          <MicOff className={cn(iconSizes[size], 'text-white')} />
          {/* Enhanced pulse rings */}
          <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping"></div>
          <div 
            className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" 
            style={{ animationDelay: `${pulseCount * 0.2}s` }}
          ></div>
          <div 
            className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" 
            style={{ animationDelay: `${pulseCount * 0.4}s` }}
          ></div>
        </div>
      );
    }

    if (isSpeaking) {
      return (
        <div className="relative flex items-center justify-center">
          <Volume2 className={cn(iconSizes[size], 'text-white animate-pulse')} />
          {/* Sound wave animation */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping"></div>
          <div 
            className="absolute inset-2 rounded-full border-2 border-blue-200 animate-ping" 
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div 
            className="absolute inset-4 rounded-full border-2 border-blue-100 animate-ping" 
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      );
    }

    if (isProcessing) {
      return (
        <div className="relative flex items-center justify-center">
          <Waves className={cn(iconSizes[size], 'text-white animate-spin')} />
          <div className="absolute inset-0 rounded-full border-2 border-yellow-300 animate-ping"></div>
        </div>
      );
    }

    if (isInitializing) {
      return (
        <div className="relative flex items-center justify-center">
          <Sparkles className={cn(iconSizes[size], 'text-white animate-pulse')} />
          <div className="absolute inset-0 rounded-full border-2 border-gray-300 animate-ping"></div>
        </div>
      );
    }

    if (!hasPermission) {
      return (
        <div className="relative flex items-center justify-center">
          <VolumeX className={cn(iconSizes[size], 'text-white')} />
        </div>
      );
    }

    return (
      <div className="relative flex items-center justify-center">
        <Mic className={cn(iconSizes[size], 'text-white')} />
        {/* Status indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
        {/* Hover effect */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full bg-white/10 animate-ping"></div>
        )}
      </div>
    );
  };

  const getTooltip = () => {
    if (isListening) return 'Click to stop recording';
    if (isSpeaking) return 'AI is speaking...';
    if (isProcessing) return 'Processing your request...';
    if (isInitializing) return 'Initializing...';
    if (!hasPermission) return 'Microphone permission required';
    return 'Click to start voice conversation';
  };

  return (
    <div className="relative group">
      <Button
        onClick={onClick}
        disabled={isProcessing || isInitializing}
        className={getButtonStyles()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        aria-label={getTooltip()}
        title={getTooltip()}
      >
        {getIcon()}
      </Button>

      {/* Enhanced tooltip */}
      {variant === 'floating' && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          {getTooltip()}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default ModernAudioIcon; 