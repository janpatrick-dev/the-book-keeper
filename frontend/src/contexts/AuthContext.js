import { createContext, useEffect, useReducer } from "react";
import CookieUtils from "../utils/CookieUtils";
import LocalStorageUtils from "../utils/LocalStorageUtils";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      if (!CookieUtils.getCookie('accessToken')) {
        CookieUtils.setAccessToken(action.payload.accessToken);
      }

      const userLocal = LocalStorageUtils.get('user');

      if (!userLocal) {
        LocalStorageUtils.set('user', JSON.stringify(action.payload));

        return { user: action.payload };
      }

      return { user: JSON.parse(userLocal) };
    case 'LOGOUT':
      CookieUtils.removeCookie('accessToken');
      LocalStorageUtils.remove('user');
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
    const userLocal = LocalStorageUtils.get('user');
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