import { useState } from "react";
import PropTypes from "prop-types";
import authContext from "./AuthContext"; // Importa el contexto desde el nuevo archivo

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider; // Exporta el componente AuthProvider
