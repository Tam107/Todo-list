import React from 'react'
import taskService from "../services/taskService.js";

const DeleteAllButton = ({onDeleteAll}) => {
    const handleDeleteAll = async () => {
        if (confirm("Are you sure?")) {
            try{
                await taskService.deleteAllTasks();
                onDeleteAll();
            }catch(e){
                console.error(e);
            }
        }
    }

    return (
        <button onClick={handleDeleteAll} className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-700">
        Delete All
        </button>
    )
}
export default DeleteAllButton
