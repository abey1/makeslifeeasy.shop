import React, { useReducer, createContext } from "react";
import { useContext } from "react";
import { SIGNUP, LOGIN, LOGOUT } from "../utilities/constants";

export const UserContext = createContext();

const initialState = {
  _id: "",
  email: "",
  favorite: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SIGNUP: {
      const { _id, email, favorite } = action.payload;
      return { ...state, _id, email, favorite };
    }
    case LOGIN: {
      const { _id, email, favorite } = action.payload;
      return { ...state, _id, email, favorite };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return { ...state, _id: "", email: "", favorite: [] };
    }
    default: {
      return state;
    }
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, userDispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ ...state, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
