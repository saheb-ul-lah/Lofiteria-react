import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const PomodoroWidget = ({ widgetId }) => {
  const { timer, updateTimer } = useStore();
  const [showSettings, setShowSettings] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);

  useEffect(() => {
    let interval;

    if (timer.isActive && timer.widgetId === widgetId) {
      interval = setInterval(() => {
        if (timer.seconds === 0) {
          if (timer.minutes === 0) {
            updateTimer({
              isActive: false,
              mode: timer.mode === 'work' ? 'break' : 'work',
              minutes: timer.mode === 'work' ? 5 : customMinutes,
              widgetId,
            });
            return;
          }
          updateTimer({ minutes: timer.minutes - 1, seconds: 59, widgetId });
        } else {
          updateTimer({ seconds: timer.seconds - 1, widgetId });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer.isActive, timer.minutes, timer.seconds, timer.mode, updateTimer, widgetId, customMinutes]);

  const toggleTimer = () => {
    updateTimer({ isActive: !timer.isActive, widgetId });
  };

  const resetTimer = () => {
    updateTimer({
      minutes: timer.mode === 'work' ? customMinutes : 5,
      seconds: 0,
      isActive: false,
      widgetId,
    });
  };

  const updateCustomMinutes = (value) => {
    const minutes = Math.min(Math.max(1, value), 60);
    setCustomMinutes(minutes);
    if (timer.mode === 'work' && !timer.isActive) {
      updateTimer({
        minutes,
        seconds: 0,
        widgetId,
      });
    }
  };

  const isActive = timer.isActive && timer.widgetId === widgetId;
  const minutes = timer.widgetId === widgetId ? timer.minutes : customMinutes;
  const seconds = timer.widgetId === widgetId ? timer.seconds : 0;
  const mode = timer.widgetId === widgetId ? timer.mode : 'work';

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-4xl font-bold mb-4">
        {String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </div>
      
      <div className="flex gap-4 mb-4">
        <button
          onClick={toggleTimer}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {isActive ? (
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
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
      
      {showSettings && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Work Duration (minutes):
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={customMinutes}
            onChange={(e) => updateCustomMinutes(parseInt(e.target.value, 10))}
            className="w-20 px-2 py-1 border rounded text-center"
          />
        </div>
      )}
      
      <div className="mt-2 text-sm font-medium">
        {mode === 'work' ? 'Work Time' : 'Break Time'}
      </div>
    </div>
  );
};