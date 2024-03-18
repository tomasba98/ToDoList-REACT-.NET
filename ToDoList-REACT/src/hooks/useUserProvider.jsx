import { createContext, useContext } from "react";

const userContext = createContext();
const userToggleContext = createContext();

export function useUserContext() {
  return useContext(userContext);
}

export function useUserToggleContext() {
  return useContext(userToggleContext);
}

export function useUserProvider(props) {
  return (
    <userContext.Provider value={user}>
      <userToggleContext.Provider value={cambiaLogin}>
        {props.children}
      </userToggleContext.Provider>
    </userContext.Provider>
  );
}
