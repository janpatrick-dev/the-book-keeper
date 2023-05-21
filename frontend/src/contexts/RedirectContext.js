import { createContext, useReducer } from "react";

export const RedirectContext = createContext();

const redirectReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.payload;
    case 'REMOVE_ERROR':
      return '';
    default:
      return state;
  }
}

const RedirectContextProvider = ({ children }) => {
  const [error, dispatch] = useReducer(redirectReducer, '');
  
  return (
    <RedirectContext.Provider value={{ error, dispatch }}>
      { children }
    </RedirectContext.Provider>
  );
};

export default RedirectContextProvider;