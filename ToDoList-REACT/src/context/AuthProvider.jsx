import { useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ userName: "", accesToken: "" });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}{" "}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
