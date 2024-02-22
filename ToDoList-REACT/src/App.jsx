import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import Tasks from "./components/Tasks";
import { Home } from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import React from "react";

export const userContext = React.createContext();

function App() {
  return (
    <>
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
                <Route path="home" element={<Home />}>
                  {" "}
                </Route>
                <Route path="tasks" element={<Tasks />}>
                  {" "}
                </Route>
                <Route path="login" element={<Login />}>
                  {" "}
                </Route>
                <Route path="*" element={<Home />}>
                  {" "}
                </Route>
                <Route path="signup" element={<SignUp />}>
                  {" "}
                </Route>
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </userContext>
      <ToastContainer />
    </>
  );
}

export default App;
