import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { BooksContext } from "../contexts/BooksContext";
import FetchUtils from "../utils/FetchUtils";

export const useLogout = () => {
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: booksDispatch } = useContext(BooksContext);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await FetchUtils.authorizedGet('/logout');
      const json = await response.json();
      if (response.ok) {
        localStorage.removeItem('user');
        authDispatch({ type: 'LOGOUT' });
        booksDispatch({ type: 'SET_BOOKS', payload: [] });
      } else {
        setError(json.error);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  return { logout };
}