import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet, Link } from "react-router-dom";

export function Nav() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "white",
          color: "black",
        }}
      >
        <Toolbar>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            To Do List
          </Typography>
          <Box sx={{ marginRight: "auto", marginLeft: 2 }}>
            <Button component={Link} to="/home" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/tasks" color="inherit">
              Tasks
            </Button>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          </Box>
          <img
            src={"src/assets/vava.png"}
            alt="Logo"
            style={{ height: "55px", marginRight: "16px" }}
          />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

/*export function Nav(params) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h3 className="navbar-brand">To Do List</h3>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/tasks" className="nav-link">
                  Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}*/

/* position="static"
        sx={{
          background: "white",
          color: { xs: "black", sm: "white", md: "yellow" },
        }}
*/
