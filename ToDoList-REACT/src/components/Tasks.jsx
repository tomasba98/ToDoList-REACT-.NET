import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import { Task } from "./Task/Task";
import { TaskAdd } from "./Task/TaskAdd";

const Tasks = () => {
  const [tasksArray, setTasksArray] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para agregar un nuevo task al array
  const addTask = (newTask) => {
    setTasksArray((prevTasks) => [...prevTasks, newTask]);
  };

  // Función para eliminar una tarea del array y del servidor
  const onDelete = (taskId) => {
    // Eliminar la tarea del array
    setTasksArray((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );

    // Realizar la solicitud DELETE al endpoint correspondiente
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
    // Realizar la solicitud PUT al endpoint correspondiente
    axios
      .put(
        `https://localhost:44307/api/TaskLists/${updatedTask.id}`,
        updatedTask
      )
      .then((response) => {
        console.log("Task updated successfully:", response);
        // Actualizar el estado reemplazando la tarea antigua con la actualizada
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
    // Realizar la solicitud GET cuando el componente se monta
    axios
      .get("https://localhost:44307/api/TaskLists")
      .then((response) => {
        // Actualizar el estado con los datos recibidos
        setTasksArray(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      })
      .finally(() => {
        // Establecer loading en falso cuando la solicitud ha terminado, independientemente del resultado
        setLoading(false);
      });
  }, []); // El array vacío como segundo argumento garantiza que la solicitud se realice solo una vez al montar el componente

  return (
    <>
      <Grid sx={{ marginTop: 4 }} container spacing={2}>
        <Grid item xs={12} key={99}>
          <TaskAdd onTaskAdded={addTask} />
        </Grid>

        {loading ? (
          // Muestra el spinner mientras loading es true
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
              {/* Pasa la función onDelete como prop al componente Task */}
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
