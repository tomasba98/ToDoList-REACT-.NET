import { axiosPrivate } from "../api/axios";

const API_URL = "TaskLists";

export const fetchTasks = async (accestoken) => {
  try {
    const response = await axiosPrivate.get(API_URL, {
      headers: { Authorization: `Bearer ${accestoken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (newTask, accestoken) => {
  try {
    const response = await axiosPrivate.post(API_URL, newTask, {
      headers: { Authorization: `Bearer ${accestoken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId, accestoken) => {
  try {
    await axiosPrivate.delete(`${API_URL}/${taskId}`, {
      headers: { Authorization: `Bearer ${accestoken}` },
    });
    console.log("Task deleted successfully.");
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const updateTask = async (updatedTask, accestoken) => {
  try {
    const response = await axiosPrivate.put(
      `${API_URL}/${updatedTask.id}`,
      updatedTask,
      {
        headers: { Authorization: `Bearer ${accestoken}` },
      }
    );
    console.log("Task updated successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
