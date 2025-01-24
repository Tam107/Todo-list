// src/components/TaskItem.jsx
import React from 'react';
import { format } from 'date-fns';

const TaskItem = ({ task, onEdit, onDelete }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'DONE':
                return 'bg-green-100 text-green-800';
            case 'DOING':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-600 mt-1">{task.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                </span>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                    <span>Start: {format(new Date(task.startDate), 'MMM d, yyyy')}</span>
                    <span className="mx-2">|</span>
                    <span>End: {format(new Date(task.endDate), 'MMM d, yyyy')}</span>
                </div>

                <div className="space-x-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
