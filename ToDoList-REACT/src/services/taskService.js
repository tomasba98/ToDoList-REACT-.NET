import axios from "axios";

const API_URL = "https://localhost:44307/api/TaskLists";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (newTask) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
      newTask
    );
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
    console.log("Task deleted successfully.");
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const updateTask = async (updatedTask) => {
  try {
    const response = await axios.put(
      `${API_URL}/${updatedTask.id}`,
      updatedTask
    );
    console.log("Task updated successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
