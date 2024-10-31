import { create } from 'zustand';
import type { Widget, Task, TimerState } from '../types';

interface Store {
  widgets: Widget[];
  tasks: Task[];
  timer: TimerState;
  addWidget: (widget: Widget) => void;
  updateWidgetLayout: (layout: Widget[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  updateTimer: (updates: Partial<TimerState>) => void;
}

export const useStore = create<Store>((set) => ({
  widgets: [],
  tasks: [],
  timer: {
    minutes: 25,
    seconds: 0,
    isActive: false,
    mode: 'work',
  },
  addWidget: (widget) =>
    set((state) => ({ widgets: [...state.widgets, widget] })),
  updateWidgetLayout: (layout) => set({ widgets: layout }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),
  updateTimer: (updates) =>
    set((state) => ({ timer: { ...state.timer, ...updates } })),
}));