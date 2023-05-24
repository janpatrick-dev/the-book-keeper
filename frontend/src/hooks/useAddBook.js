import { useContext, useState } from "react"
import FetchUtils from "../utils/FetchUtils"
import { BooksContext } from "../contexts/BooksContext";
import { AuthContext } from "../contexts/AuthContext";
import { useLogout } from "./useLogout";
import DOMUtils from "../utils/DOMUtils";
import { RedirectContext } from "../contexts/RedirectContext";

export const useAddBook = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(BooksContext);
  const { user } = useContext(AuthContext);
  const { dispatch: redirectDispatch } = useContext(RedirectContext);
  const { logout } = useLogout();

  const addBook = async (title, author, year, imgUrl, hasRead) => {
    setIsLoading(true);
    setError(null);

    const requestBody = {
      userId: user._id,
      title: title,
      author: author,
      yearPublished: year,
      imgUrl: imgUrl,
      hasRead: hasRead
    }
    const response = await FetchUtils.authorizedPostWithRequestData('/add-book', requestBody);
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'ADD_BOOK', payload: json});
      DOMUtils.hideAddBookPopup();
    } else {
      if (json.error.includes('token expired')) {
        logout();
        redirectDispatch({ type: 'SET_ERROR', payload: 'Session has expired' });
      }
      setError(json.error);
    }
    setIsLoading(false);
  }

  return { addBook, isLoading, error };
}

export default useAddBook;