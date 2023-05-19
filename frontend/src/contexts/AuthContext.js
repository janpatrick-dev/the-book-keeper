import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
}

const AuthContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, {
    user: null
  });

  useEffect(() => {
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(userLocal) });
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...user, dispatch }}>
      { children } 
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;