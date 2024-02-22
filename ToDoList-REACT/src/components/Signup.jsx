import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import useApiRequest from "../hooks/useApiRequest";

const SignUp = () => {
  const { sendRequest } = useApiRequest();

  const initialValues = {
    username: "",
    password: "",
    password2: "",
  };

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .required("username is required"),
    password: yup
      .string("Enter your password")
      .required("password is required"),
    password2: yup
      .string("Enter your password")
      .required("password is required"),
  });

  const { handleSubmit, errors, values, handleChange } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      const url = "https://jsonplaceholder.typicode.com/posts";

      sendRequest(url, values).then((res) => {
        console.log("res", res);
      });
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        margin: "auto",
        backgroundColor: "white",
        color: "black",
        padding: "16px",
        borderRadius: "8px",
        marginTop: "3rem",
      }}
    >
      <Typography variant="h5">Sign Up</Typography>
      <form onSubmit={handleSubmit} id={"login-form"}>
        <TextField
          label="User"
          variant="outlined"
          margin="normal"
          name="username"
          value={values.username}
          error={errors.username}
          onChange={handleChange}
          color="secondary"
          sx={{ color: "#ffffff" }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          name="password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
          //onChange={(e) => setPassword(e.target.value)}
          color="secondary"
          sx={{ color: "#ffffff" }}
        />
        <TextField
          label="Repeat password"
          type="password"
          variant="outlined"
          margin="normal"
          name="password2"
          value={values.password2}
          error={errors.password2}
          onChange={handleChange}
          color="secondary"
          sx={{ color: "#ffffff" }}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          sx={{ marginTop: "16px" }}
        >
          Registrarse
        </Button>
        <Typography sx={{ marginTop: 1 }}>
          If you are registered, <Link to="/login">Login</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default SignUp;
