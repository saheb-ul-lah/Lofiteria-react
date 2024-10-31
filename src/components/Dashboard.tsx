import React from 'react';
import GridLayout from 'react-grid-layout';
import { useStore } from '../store/useStore';
import { TaskWidget } from './widgets/TaskWidget';
import { PomodoroWidget } from './widgets/PomodoroWidget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const widgetComponents = {
  tasks: TaskWidget,
  pomodoro: PomodoroWidget,
};

export const Dashboard = () => {
  const { widgets, updateWidgetLayout } = useStore();

  const handleLayoutChange = (layout: any) => {
    const updatedWidgets = widgets.map((widget, i) => ({
      ...widget,
      x: layout[i].x,
      y: layout[i].y,
      w: layout[i].w,
      h: layout[i].h,
    }));
    updateWidgetLayout(updatedWidgets);
  };

  return (
    <div className="p-6">
      <GridLayout
        className="layout"
        layout={widgets}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".widget-handle"
      >
        {widgets.map((widget) => {
          const Component = widgetComponents[widget.type as keyof typeof widgetComponents];
          return (
            <div
              key={widget.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="widget-handle cursor-move mb-2 flex justify-between items-center">
                <h2 className="text-lg font-semibold">{widget.title}</h2>
              </div>
              {Component && <Component />}
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};