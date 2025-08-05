import { Volume2, Mic, MicOff, Waves, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioStatusIndicatorProps {
  status: 'listening' | 'speaking' | 'processing' | 'initializing' | 'ready' | 'error' | 'permission-denied';
  message?: string;
  className?: string;
  variant?: 'floating' | 'inline' | 'minimal';
}

const AudioStatusIndicator = ({
  status,
  message,
  className,
  variant = 'floating'
}: AudioStatusIndicatorProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'listening':
        return {
          icon: MicOff,
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          textColor: 'text-red-600 dark:text-red-400',
          iconColor: 'text-red-500',
          message: message || 'Listening... Click to stop',
          animation: 'animate-pulse'
        };
      case 'speaking':
        return {
          icon: Volume2,
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          textColor: 'text-blue-600 dark:text-blue-400',
          iconColor: 'text-blue-500',
          message: message || 'AI is speaking...',
          animation: 'animate-pulse'
        };
      case 'processing':
        return {
          icon: Waves,
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          textColor: 'text-yellow-600 dark:text-yellow-400',
          iconColor: 'text-yellow-500',
          message: message || 'Processing your request...',
          animation: 'animate-spin'
        };
      case 'initializing':
        return {
          icon: Sparkles,
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          textColor: 'text-gray-600 dark:text-gray-400',
          iconColor: 'text-gray-500',
          message: message || 'Initializing voice assistant...',
          animation: 'animate-pulse'
        };
      case 'ready':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          textColor: 'text-green-600 dark:text-green-400',
          iconColor: 'text-green-500',
          message: message || 'Ready to listen',
          animation: ''
        };
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          textColor: 'text-red-600 dark:text-red-400',
          iconColor: 'text-red-500',
          message: message || 'Error occurred',
          animation: ''
        };
      case 'permission-denied':
        return {
          icon: AlertCircle,
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          borderColor: 'border-orange-200 dark:border-orange-800',
          textColor: 'text-orange-600 dark:text-orange-400',
          iconColor: 'text-orange-500',
          message: message || 'Microphone permission required',
          animation: ''
        };
      default:
        return {
          icon: Mic,
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          textColor: 'text-gray-600 dark:text-gray-400',
          iconColor: 'text-gray-500',
          message: message || 'Voice assistant ready',
          animation: ''
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  if (variant === 'minimal') {
    return (
      <div className={cn(
        'flex items-center gap-2 px-2 py-1 rounded-full text-xs',
        config.bgColor,
        config.borderColor,
        config.textColor,
        className
      )}>
        <IconComponent className={cn('w-3 h-3', config.iconColor, config.animation)} />
        <span className="font-medium">{config.message}</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn(
        'flex items-center gap-3 p-3 rounded-lg border',
        config.bgColor,
        config.borderColor,
        className
      )}>
        <IconComponent className={cn('w-5 h-5', config.iconColor, config.animation)} />
        <span className={cn('text-sm font-medium', config.textColor)}>
          {config.message}
        </span>
      </div>
    );
  }

  // Floating variant (default)
  return (
    <div className={cn(
      'fixed bottom-28 right-6 z-50',
      'max-w-xs transition-all duration-300',
      'transform hover:scale-105',
      className
    )}>
      <div className={cn(
        'flex items-center gap-3 p-4 rounded-lg border shadow-lg',
        config.bgColor,
        config.borderColor,
        'backdrop-blur-sm bg-opacity-90'
      )}>
        <div className="relative">
          <IconComponent className={cn('w-5 h-5', config.iconColor, config.animation)} />
          {/* Enhanced status indicator */}
          {status === 'listening' && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
          )}
          {status === 'speaking' && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          )}
          {status === 'processing' && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          )}
        </div>
        <div className="flex-1">
          <p className={cn('text-sm font-medium', config.textColor)}>
            {config.message}
          </p>
          {/* Additional context for certain states */}
          {status === 'permission-denied' && (
            <p className="text-xs text-orange-500 mt-1">
              Click the microphone button to grant permission
            </p>
          )}
          {status === 'ready' && (
            <p className="text-xs text-green-500 mt-1">
              Click to start voice conversation
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioStatusIndicator; 