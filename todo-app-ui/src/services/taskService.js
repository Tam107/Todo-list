import React from 'react'
import axios from "axios";
import TaskItem from "../components/TaskItem.jsx";

const API_URL = 'http://localhost:8080/api/tasks';

const taskService = {
    getAllTasks: async (keyword, page, size) => {
        const response = await axios.get(`${API_URL}/list`,
            {params: {keyword, page, size}} // Pass parameters
    );
        return response.data;
    },

    getTask: async (id) =>{
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    createTask: async(task) =>{
        const response = await axios.post(`${API_URL}/create`, task);
        return response.data;
    },

    updateTask: async(id, task) =>{
        const response = await axios.put(`${API_URL}/update/${id}`, task);
        return response.data;
    },

    deleteTask: async(id) =>{
        await axios.delete(`${API_URL}/delete/${id}`);
    },
    deleteAllTasks: async() =>{
        await axios.delete(`${API_URL}/delete`);
    }

}

export default taskService;