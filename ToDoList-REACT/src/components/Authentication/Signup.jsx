import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const UserName_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z]).{3,24}$/;

const SignUp = () => {
  const [UserName, setUserName] = useState("");
  const [validName, setValidName] = useState(false);

  const [Password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setValidName(UserName_REGEX.test(UserName));
  }, [UserName]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(Password));
    setValidMatch(Password === matchPassword);
  }, [Password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [UserName, Password, matchPassword]);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setValidName(UserName_REGEX.test(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValidPwd(PWD_REGEX.test(e.target.value));
    setValidMatch(e.target.value === matchPassword);
  };

  const handleMatchPasswordChange = (e) => {
    setMatchPassword(e.target.value);
    setValidMatch(Password === e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validName || !validPwd || !validMatch) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axiosPrivate.post(
        `Authentication/Register`,
        JSON.stringify({ UserName, Password })
      );
      console.log(JSON.stringify(response?.data));
      setSuccess(true);
      setUserName("");
      setPassword("");
      setMatchPassword("");
      navigate("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("UserNamename Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <>
      {success ? (
        console.log("llevar a login")
      ) : (
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
              label="UserName"
              variant="outlined"
              margin="normal"
              aria-invalid={!validName}
              value={UserName}
              onChange={handleUserNameChange}
              color={!validName ? "error" : "secondary"}
              sx={{ color: "#ffffff" }}
            />
            {!validName && (
              <Typography variant="caption" color="error">
                UserName must start with a letter and contain only letters,
                numbers, (4-24 characters).
              </Typography>
            )}
            <TextField
              label="Password"
              type="Password"
              variant="outlined"
              margin="normal"
              value={Password}
              onChange={handlePasswordChange}
              color={!validPwd ? "error" : "secondary"}
              sx={{ color: "#ffffff" }}
            />
            {!validPwd && (
              <Typography variant="caption" color="error">
                Password must be 8-24 characters, including at least one
                lowercase letter, one uppercase letter, one digit.
              </Typography>
            )}
            <TextField
              label="Repeat Password"
              type="Password"
              variant="outlined"
              margin="normal"
              name="Password2"
              value={matchPassword}
              onChange={handleMatchPasswordChange}
              color={!validMatch ? "error" : "secondary"}
              sx={{ color: "#ffffff" }}
            />
            {!validMatch && (
              <Typography variant="caption" color="error">
                Passwords do not match.
              </Typography>
            )}
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              sx={{ marginTop: "16px" }}
            >
              Registrarse
            </Button>
            {errMsg && (
              <Typography variant="caption" color="error" sx={{ marginTop: 1 }}>
                {errMsg}
              </Typography>
            )}
            <Typography sx={{ marginTop: 1 }}>
              If you are registered, <Link to="/login">Login</Link>
            </Typography>
          </form>
        </Box>
      )}
    </>
  );
};

export default SignUp;
