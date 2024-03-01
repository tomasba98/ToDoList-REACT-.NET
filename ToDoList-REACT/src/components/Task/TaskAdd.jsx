import { Box, Button, Paper, TextField, Grid } from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import { addTask } from "../../services/taskService";

export function TaskAdd({ onTaskAdded }) {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    taskName: "",
    taskDescription: "",
  };

  const validationSchema = yup.object({
    taskName: yup.string().required("Task name is required"),
    taskDescription: yup.string().required("Task description is required"),
  });

  const [errors, setErrors] = useState({
    taskName: "",
    taskDescription: "",
  });

  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      })
      .catch((error) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message,
        }));
      });
  };

  const isValid = Object.values(errors).every((error) => error === "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      console.error("Form has errors. Cannot submit.");
      return;
    }

    setLoading(true);

    const taskData = {
      name: values.taskName,
      description: values.taskDescription,
    };

    try {
      const addedTask = await addTask(taskData);
      onTaskAdded(addedTask);
    } catch (error) {
      console.log("error on add task:", error);
    } finally {
      setLoading(false);
      values.taskName = "";
      values.taskDescription = "";
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="1vh"
    >
      <Paper
        sx={{
          p: 1,
          mb: 1,
          bgcolor: "background.paper",
          color: "text.primary",
          maxWidth: "750px",
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit} id={"task-form"}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <TextField
                label="Task name"
                variant="outlined"
                margin="normal"
                name="taskName"
                value={values.taskName}
                error={!!errors.taskName}
                helperText={errors.taskName}
                onChange={handleChange}
                color="secondary"
                sx={{ color: "#ffffff" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Add description"
                variant="outlined"
                margin="normal"
                name="taskDescription"
                value={values.taskDescription}
                error={!!errors.taskDescription}
                helperText={errors.taskDescription}
                onChange={handleChange}
                color="secondary"
                sx={{ color: "#ffffff", width: "100%" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ display: "flex" }}>
              <Button
                sx={{ margin: "auto" }}
                disabled={!isValid}
                variant="contained"
                color="secondary"
                type="submit"
              >
                {loading ? "Adding..." : "Add"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
