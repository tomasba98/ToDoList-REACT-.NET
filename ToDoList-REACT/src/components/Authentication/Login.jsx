import { TextField, Button, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [userName, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://localhost:44307/api/Authentication/Login`,
        JSON.stringify({ userName, password }), //Deben ser igual que en el Json los nombres de las variables
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));

      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;

      setAuth({ userName, accessToken });
      setUserName("");
      setPassword("");
      navigate(from, { replace: true });
      //
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
        console.log(err);
        //setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        alert("Missing userNamename or password");
      } else if (err.response?.status === 401) {
        alert("Unauthorized");
      } else {
        alert("Login Failed");
        console.log(err);
      }
    }
  };

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
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit} id={"login-form"}>
        <TextField
          label="userName"
          variant="outlined"
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          color="secondary"
          sx={{ color: "#ffffff" }}
        />
        <TextField
          label="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          color="secondary"
          sx={{ color: "#ffffff" }} // Texto blanco
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          sx={{ marginTop: "16px" }}
        >
          Iniciar sesión
        </Button>
        <Typography sx={{ marginTop: 1 }}>
          If you arent registered, <Link to="/signup">Sign Up</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
