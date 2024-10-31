import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CheckCircle2, Circle, Clock, Plus, Pencil, X, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const TaskWidget = ({ widgetId }) => {
  const { tasks, addTask, updateTask, deleteTask } = useStore();
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;
    
    updateTask(taskId, { status: newStatus });
  };

  const addNewTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        id: `task-${Date.now()}`,
        title: newTaskTitle,
        status: 'todo',
        createdAt: new Date(),
        widgetId,
      });
      setNewTaskTitle('');
    }
  };

  const startEditing = (task) => {
    setEditingTask({ ...task, newTitle: task.title });
  };

  const saveEdit = (task) => {
    if (task.newTitle.trim()) {
      updateTask(task.id, { title: task.newTitle });
    }
    setEditingTask(null);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  const widgetTasks = tasks.filter(task => task.widgetId === widgetId);

  const columns = {
    todo: widgetTasks.filter((task) => task.status === 'todo'),
    inProgress: widgetTasks.filter((task) => task.status === 'inProgress'),
    done: widgetTasks.filter((task) => task.status === 'done'),
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 px-3 py-1 border rounded-md text-sm"
          onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
        />
        <button
          onClick={addNewTask}
          className="p-1 hover:bg-gray-100 rounded-full"
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 h-full">
          {Object.entries(columns).map(([status, items]) => (
            <Droppable key={`${widgetId}-${status}`} droppableId={status}>
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
                            className="bg-white p-2 rounded shadow-sm group"
                          >
                            {editingTask?.id === task.id ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editingTask.newTitle}
                                  onChange={(e) => setEditingTask({
                                    ...editingTask,
                                    newTitle: e.target.value
                                  })}
                                  className="flex-1 px-2 py-1 text-sm border rounded"
                                  autoFocus
                                />
                                <button
                                  onClick={() => saveEdit(editingTask)}
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <Check className="w-4 h-4 text-green-500" />
                                </button>
                                <button
                                  onClick={() => setEditingTask(null)}
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <X className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                {status === 'done' ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : status === 'inProgress' ? (
                                  <Clock className="w-4 h-4 text-blue-500" />
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-400" />
                                )}
                                <span className="text-sm flex-1">{task.title}</span>
                                <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                                  <button
                                    onClick={() => startEditing(task)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    <Pencil className="w-3 h-3 text-gray-500" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(task.id)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    <X className="w-3 h-3 text-red-500" />
                                  </button>
                                </div>
                              </div>
                            )}
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