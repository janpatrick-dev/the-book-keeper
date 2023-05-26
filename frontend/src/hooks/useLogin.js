import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext";
import DOMUtils from "../utils/DOMUtils";
import FetchUtils from "../utils/FetchUtils";
import CookieUtils from "../utils/CookieUtils";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    DOMUtils.hideDrawer();

    const response = await FetchUtils.post('/login', { email, password });
    const json = await response.json();
    
    if (response.ok) {
      dispatch({ type: 'LOGIN', payload: json });
    } else {
      setError(json.error);
    }
    setIsLoading(false);
  }

  return { login, isLoading, error };
}