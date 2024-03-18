import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material/";
import theme from "./styles/theme";
import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import Tasks from "./components/Tasks";
import { Home } from "./components/Home";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/Signup";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import RequireLoged from "./components/RequireLoged";

//export const userContext = React.createContext();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <userContext>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Nav />}>
                  {/*PUBLIC*/}
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="*" element={<Home />} />

                  {/*PROTECTED*/}
                  <Route element={<RequireLoged />}>
                    <Route path="tasks" element={<Tasks />} />
                  </Route>
                </Route>
              </Routes>
            </div>
            <Footer />
          </div>
        </userContext>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
