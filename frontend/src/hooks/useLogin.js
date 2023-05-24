import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext";
import DOMUtils from "../utils/DOMUtils";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    DOMUtils.hideDrawer();

    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
    } else {
      setError(json.error);
    }
    setIsLoading(false);
  }

  return { login, isLoading, error };
}