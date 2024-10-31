import { create } from 'zustand';

export const useStore = create((set) => ({
  widgets: [],
  tasks: [],
  timer: {
    minutes: 25,
    seconds: 0,
    isActive: false,
    mode: 'work',
    widgetId: null,
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
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  updateTimer: (updates) =>
    set((state) => ({ timer: { ...state.timer, ...updates } })),
}));