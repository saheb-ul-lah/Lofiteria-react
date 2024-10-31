export interface Widget {
  id: string;
  type: 'tasks' | 'pomodoro' | 'music' | 'notes' | 'canvas';
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  createdAt: Date;
}

export interface TimerState {
  minutes: number;
  seconds: number;
  isActive: boolean;
  mode: 'work' | 'break';
}