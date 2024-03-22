import { TextField, Button, Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosPrivate.post(
        "Authentication/Login",
        JSON.stringify({ userName, password })
      );
      const accessToken = response?.data?.token;
      setAuth({ userName, accessToken });
      setUserName("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
        console.log(err);
      } else if (err.response?.status === 400) {
        alert("Missing userNamename or password");
      } else if (err.response?.status === 401) {
        alert("Unauthorized");
      } else {
        alert("Login Failed");
        console.log(err);
      }
    } finally {
      setLoading(false);
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
          disabled={loading}
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
