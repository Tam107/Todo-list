import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import taskService from '../services/taskService';

const TaskList = ({ onEdit }) => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchTasks = async () => {
        try {
            const response = await taskService.getAllTasks(keyword, page, 5);
            setTasks(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page, keyword]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(id);
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    // Generate array of page numbers
    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.min(20, totalPages); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const handleSearch = (e) => {
        setKeyword(e.target.value);
        setPage(0); // Reset to first page when searching
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
        setCurrentPage(newPage);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={keyword}
                    onChange={handleSearch}
                    className="px-4 py-2 border rounded-md w-64"
                />
            </div>

            <div className="space-y-4">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                    Previous
                </button>

                <div className="flex space-x-1">
                    {getPageNumbers().map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-1 border rounded-md ${
                                currentPage === pageNum
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= Math.min(20, totalPages)}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Current page indicator */}
            <div className="text-center mt-2 text-sm text-gray-600">
                Page {currentPage} of {Math.min(20, totalPages)}
            </div>
        </div>
    );
};

export default TaskList;
