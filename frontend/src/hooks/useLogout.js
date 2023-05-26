import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { BooksContext } from "../contexts/BooksContext";
import FetchUtils from "../utils/FetchUtils";
import DOMUtils from "../utils/DOMUtils";
import { RedirectContext } from "../contexts/RedirectContext";
import CookieUtils from "../utils/CookieUtils";
import LocalStorageUtils from "../utils/LocalStorageUtils";

export const useLogout = () => {
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: booksDispatch } = useContext(BooksContext);
  const { dispatch: redirectDispatch } = useContext(RedirectContext);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const logout = async () => {
    setLoading(true);
    setError(null);
    DOMUtils.hideDrawer();
    DOMUtils.hideAddBookPopup();

    try {
      const accessToken = LocalStorageUtils.getParsed('user').accessToken;
      const response = await FetchUtils.authorizedGet(`/logout?token=${accessToken}`);
      const json = await response.json();
      if (response.ok || response.status === 401) {
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

  const sessionLogout = async (error) => {
    logout();
    if (error.includes('token expired')) {
      redirectDispatch({ type: "SET_ERROR", payload: "Session has expired" });
    }
    booksDispatch({ type: "SET_BOOKS", payload: [] });
  }

  return { logout, sessionLogout, loading, error };
}