import React, { useEffect, useState } from 'react';
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
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector('.layout-container');
      if (container) {
        setWidth(container.offsetWidth);
      }
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    const container = document.querySelector('.layout-container');
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
    };
  }, []);

  const handleLayoutChange = (layout) => {
    const updatedWidgets = widgets.map((widget) => {
      const layoutItem = layout.find((l) => l.i === widget.id);
      if (layoutItem) {
        return {
          ...widget,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h,
        };
      }
      return widget;
    });
    updateWidgetLayout(updatedWidgets);
  };

  const gridLayout = widgets.map((widget) => ({
    i: widget.id,
    x: widget.x,
    y: widget.y,
    w: widget.w,
    h: widget.h,
  }));

  return (
    <div className="layout-container w-full">
      <GridLayout
        className="layout"
        layout={gridLayout}
        cols={12}
        rowHeight={30}
        width={width}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".widget-handle"
      >
        {widgets.map((widget) => {
          const Component = widgetComponents[widget.type];
          return (
            <div
              key={widget.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="widget-handle cursor-move mb-2 flex justify-between items-center">
                <h2 className="text-lg font-semibold">{widget.title}</h2>
              </div>
              {Component && <Component widgetId={widget.id} />}
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};