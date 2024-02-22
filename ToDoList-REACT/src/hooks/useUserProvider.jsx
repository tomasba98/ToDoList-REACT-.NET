import React, { useState, useContext } from "react";

const userContext = React.createContext();
const userToggleContext = React.createContext();

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
