// Tasks.js
import { useState, useEffect } from "react";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import { Task } from "./Task/Task";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { TaskAdd } from "./Task/TaskAdd";
import { deleteTask, updateTask, fetchTasks } from "../services/taskService";

const Tasks = () => {
  const [tasksArray, setTasksArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  const fetchTasksData = async () => {
    try {
      const tasks = await fetchTasks(auth.accessToken);
      const sortedTasks = tasks.sort((a, b) => b.id - a.id);
      setTasksArray(sortedTasks);
    } catch (error) {
      console.log("error on fetch task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = (newTask) => {
    setTasksArray((prevTasks) => [newTask, ...prevTasks]);
  };

  const onDelete = async (taskId) => {
    try {
      await deleteTask(taskId, auth.accessToken);
      setTasksArray((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.log("error on delete task:", error);
    }
  };

  const onUpdate = async (updatedTask) => {
    try {
      await updateTask(updatedTask, auth.accessToken);
      setTasksArray((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.log("error on update task:", error);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <>
      <Grid sx={{ marginTop: 4 }} container spacing={2}>
        <Grid item xs={12} key={99}>
          <TaskAdd onTaskAdded={handleAddTask} />
        </Grid>

        {loading ? (
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
          >
            <CircularProgress />
          </Grid>
        ) : tasksArray.length > 0 ? (
          tasksArray.map((task) => (
            <Grid item xs={12} key={task.id}>
              <Task task={task} onDelete={onDelete} onUpdate={onUpdate} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{ marginTop: 4 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              minHeight="1vh"
            >
              <Typography>No tasks found.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Tasks;
