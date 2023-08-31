import { createContext, useReducer, useContext } from "react";
import {
  MENU_OPEN,
  MENU_CLOSE,
  HOME_MOUNTED,
  HOME_UNMOUNTED,
  ADMIN_MOUNTED,
  ADMIN_UNMOUNTED,
  FAVORITE_MOUNTED,
  FAVORITE_UNMOUNTED,
  IS_LOADING,
  ISNT_LOADING,
  SAVE_ALL_ITEMS,
  SET_SEARCHING,
  SET_SEARCHED_ITEMS,
  DELETE_LOCAL,
} from "../utilities/constants";

export const GlobalAppContext = createContext();

const initialState = {
  isLoading: false,
  menu_is_open: false,
  home_page_mounted: false,
  admin_page_mounted: false,
  favorite_page_mounted: false,
  all_items: [],
  searched_items: [],
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
    case ADMIN_MOUNTED: {
      return { ...state, admin_page_mounted: true };
    }
    case ADMIN_UNMOUNTED: {
      return { ...state, admin_page_mounted: false };
    }
    case FAVORITE_MOUNTED: {
      return { ...state, favorite_page_mounted: true };
    }
    case FAVORITE_UNMOUNTED: {
      return { ...state, favorite_page_mounted: false };
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
    case SET_SEARCHED_ITEMS: {
      return { ...state, searched_items: action.payload };
    }
    case DELETE_LOCAL: {
      const id = action.payload;
      console.log("id = ", id);
      const post_delete_items = state.all_items.filter((item, index) => {
        return item._id !== id;
      });
      console.log(post_delete_items);
      return { ...state, all_items: post_delete_items };
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
