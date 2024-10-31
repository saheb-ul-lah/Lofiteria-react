import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const PomodoroWidget = () => {
  const { timer, updateTimer } = useStore();

  useEffect(() => {
    let interval: number;

    if (timer.isActive) {
      interval = setInterval(() => {
        if (timer.seconds === 0) {
          if (timer.minutes === 0) {
            updateTimer({
              isActive: false,
              mode: timer.mode === 'work' ? 'break' : 'work',
              minutes: timer.mode === 'work' ? 5 : 25,
            });
            return;
          }
          updateTimer({ minutes: timer.minutes - 1, seconds: 59 });
        } else {
          updateTimer({ seconds: timer.seconds - 1 });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer.isActive, timer.minutes, timer.seconds]);

  const toggleTimer = () => {
    updateTimer({ isActive: !timer.isActive });
  };

  const resetTimer = () => {
    updateTimer({
      minutes: timer.mode === 'work' ? 25 : 5,
      seconds: 0,
      isActive: false,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-4xl font-bold mb-4">
        {String(timer.minutes).padStart(2, '0')}:
        {String(timer.seconds).padStart(2, '0')}
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {timer.isActive ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={resetTimer}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
      
      <div className="mt-4 text-sm font-medium">
        {timer.mode === 'work' ? 'Work Time' : 'Break Time'}
      </div>
    </div>
  );
};