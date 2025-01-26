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

    const getBackgroundColor = (status) => {
        switch (status) {
            case 'DONE':
                return 'bg-green-50';
            case 'DOING':
                return 'bg-white';
            default:
                return 'bg-white';
        }
    };

    return (
        <div className={`border rounded-lg p-2 mb-4 shadow-sm hover:shadow-md transition-shadow ${getBackgroundColor(task.status)}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">Title: {task.title}</h3>
                    <p className="text-gray-600 mt-1">Description: {task.description}</p>
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
                        className="text-white hover:text-gray-100 p-1.5 bg-blue-500 rounded-md"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-white hover:text-white p-1.5 bg-red-500 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
