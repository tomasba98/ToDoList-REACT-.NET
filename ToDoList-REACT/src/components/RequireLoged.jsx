import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireLoged = () => {
  const { auth } = useAuth();
  const location = useLocation();

  //LOGIC OF THE SESSION

  return auth?.userName ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireLoged;
