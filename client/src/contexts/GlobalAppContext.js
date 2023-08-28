import { createContext, useReducer, useContext } from "react";
import {
  MENU_OPEN,
  MENU_CLOSE,
  HOME_MOUNTED,
  HOME_UNMOUNTED,
  IS_LOADING,
  ISNT_LOADING,
  SAVE_ALL_ITEMS,
  SET_SEARCHING,
} from "../utilities/constants";

export const GlobalAppContext = createContext();

const initialState = {
  isLoading: false,
  menu_is_open: false,
  home_page_mounted: false,
  all_items: [],
  isSearching: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case MENU_OPEN: {
      return { ...state, menu_is_open: true };
    }
    case MENU_CLOSE: {
      return { ...state, menu_is_open: false };
    }
    case HOME_MOUNTED: {
      return { ...state, home_page_mounted: true };
    }
    case HOME_UNMOUNTED: {
      return { ...state, home_page_mounted: false };
    }
    case IS_LOADING: {
      return { ...state, isLoading: true };
    }
    case ISNT_LOADING: {
      return { ...state, isLoading: false };
    }
    case SAVE_ALL_ITEMS: {
      return { ...state, all_items: action.payload };
    }
    case SET_SEARCHING: {
      return { ...state, isSearching: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export const GlobalAppContextProvider = ({ children }) => {
  const [state, globalDispatch] = useReducer(reducer, initialState);
  return (
    <GlobalAppContext.Provider value={{ ...state, globalDispatch }}>
      {children}
    </GlobalAppContext.Provider>
  );
};

export const useGlobalAppContext = () => {
  return useContext(GlobalAppContext);
};
