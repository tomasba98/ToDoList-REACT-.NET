import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import { Task } from "./Task/Task";
import { TaskAdd } from "./Task/TaskAdd";

const Tasks = () => {
  const [tasksArray, setTasksArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const addTask = (newTask) => {
    setTasksArray((prevTasks) => [...prevTasks, newTask]);
  };

  const onDelete = (taskId) => {
    //eliminacion array
    setTasksArray((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );

    //eliminacion server
    axios
      .delete(`https://localhost:44307/api/TaskLists/${taskId}`)
      .then((response) => {
        console.log("Task deleted successfully:", response);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const onUpdate = (updatedTask) => {
    axios
      .put(
        `https://localhost:44307/api/TaskLists/${updatedTask.id}`,
        updatedTask
      )
      .then((response) => {
        console.log("Task updated successfully:", response);
        setTasksArray((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  useEffect(() => {
    axios
      .get("https://localhost:44307/api/TaskLists")
      .then((response) => {
        setTasksArray(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Grid sx={{ marginTop: 4 }} container spacing={2}>
        <Grid item xs={12} key={99}>
          <TaskAdd onTaskAdded={addTask} />
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
