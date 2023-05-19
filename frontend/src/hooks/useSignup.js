import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
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

  return { signup, isLoading, error };
}