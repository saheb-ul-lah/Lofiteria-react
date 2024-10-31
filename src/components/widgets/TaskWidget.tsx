import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CheckCircle2, Circle, Clock, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const TaskWidget = () => {
  const { tasks, addTask, updateTask } = useStore();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId as 'todo' | 'inProgress' | 'done';
    
    updateTask(taskId, { status: newStatus });
  };

  const addNewTask = () => {
    addTask({
      id: Date.now().toString(),
      title: 'New Task',
      status: 'todo',
      createdAt: new Date(),
    });
  };

  const columns = {
    todo: tasks.filter((task) => task.status === 'todo'),
    inProgress: tasks.filter((task) => task.status === 'inProgress'),
    done: tasks.filter((task) => task.status === 'done'),
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <button
          onClick={addNewTask}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 h-full">
          {Object.entries(columns).map(([status, items]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 bg-gray-50 rounded-lg p-3"
                >
                  <h4 className="text-sm font-medium mb-2 capitalize">
                    {status.replace(/([A-Z])/g, ' $1')}
                  </h4>
                  <div className="space-y-2">
                    {items.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 rounded shadow-sm"
                          >
                            <div className="flex items-center gap-2">
                              {status === 'done' ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : status === 'inProgress' ? (
                                <Clock className="w-4 h-4 text-blue-500" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-400" />
                              )}
                              <span className="text-sm">{task.title}</span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};