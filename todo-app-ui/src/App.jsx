// src/App.jsx
import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import DeleteAllButton from './components/DeleteAllButton';
import taskService from './services/taskService';

function App() {
    const [editingTask, setEditingTask] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSubmit = async (task) => {
        try {
            if (editingTask) {
                await taskService.updateTask(editingTask.id, task);
            } else {
                await taskService.createTask(task);
            }
            setIsFormVisible(false);
            setEditingTask(null);
            // Refresh the task list
            window.location.reload();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setIsFormVisible(true);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
                        <div className="space-x-4">
                            <button
                                onClick={() => setIsFormVisible(!isFormVisible)}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                {isFormVisible ? 'Close Form' : 'Add New Task'}
                            </button>
                            <DeleteAllButton onDeleteAll={() => window.location.reload()} />
                        </div>
                    </div>

                    {isFormVisible && (
                        <div className="mb-6 bg-white shadow rounded-lg p-6">
                            <TaskForm
                                onSubmit={handleSubmit}
                                initialData={editingTask}
                            />
                        </div>
                    )}

                    <div className="bg-white shadow rounded-lg p-6">
                        <TaskList onEdit={handleEdit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
