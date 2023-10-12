import React, { createContext, useEffect } from "react";
import { useReducer } from "react";

const ESTADO_INICIAL = {
    usuario: JSON.parse(localStorage.getItem("usuario"))||null,
    loading: false,
    error: null,
};

export const AuthContexto = createContext(ESTADO_INICIAL);

const BuscadorReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_INICIADO":
      return {
        usuario: null,
        loading: true,
        error: null,
      };
    case "LOGIN_EXITOSO":
      return {
        usuario: action.payload,
        loading: false,
        error: null,
      };
      case "LOGIN_FALLIDO":
      return {
        usuario: null,
        loading: false,
        error: action.payload,
      };
      case "LOGOUT":
      return {
        usuario: null,
        loading: false,
        error: null,
      };
      default:
        return state;
  }
};

export const AuthContextoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BuscadorReducer,ESTADO_INICIAL);

  useEffect(() => {
    localStorage.setItem("usuario", JSON.stringify(state.usuario)); //Volver objeto a string
  }, [state.usuario]);

  return (
    <AuthContexto.Provider
      value={{
        usuario: state.usuario,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}  
    </AuthContexto.Provider>
  );
};