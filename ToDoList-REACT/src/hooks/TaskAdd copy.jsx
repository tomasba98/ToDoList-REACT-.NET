import { Box, Button, Paper, TextField, Grid } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import useApiRequest from "../../hooks/useApiRequest";

export function TaskAdd() {
  const [loading, setLoading] = useState(false);
  const { sendRequest } = useApiRequest();

  const initialValues = {
    taskName: "",
    taskDescription: "",
  };

  const validationSchema = yup.object({
    taskName: yup
      .string("Enter your taskName")
      .required("taskName is required"),
    taskDescription: yup
      .string("Enter your taskDescription")
      .required("taskDescription is required"),
  });

  const { handleSubmit, errors, values, handleChange, isValid } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);

      setLoading(true);

      const requestData = {
        id: 0,
        name: values.taskName,
        description: values.taskDescription,
      };

      const url = "https://localhost:44307/api/TaskLists";

      sendRequest("POST", url, requestData)
        .then((res) => {
          console.log("Request successful:", res);
        })
        .catch((error) => {
          console.error("Error in request:", error);
        })
        .finally(() => {
          setLoading(false);
          console.log("Tarea agregada con éxito");
        });
    },
  });

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
                error={errors.taskName}
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
                error={errors.taskDescription}
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
