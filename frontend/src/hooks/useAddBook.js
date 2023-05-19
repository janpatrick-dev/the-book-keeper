import { useContext, useState } from "react"
import FetchUtils from "../utils/FetchUtils"
import { BooksContext } from "../contexts/BooksContext";
import { AuthContext } from "../contexts/AuthContext";

export const useAddBook = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(BooksContext);
  const { user } = useContext(AuthContext);

  const addBook = async (title, author, year) => {
    setIsLoading(true);
    setError(null);

    const requestBody = {
      userId: user._id,
      title: title,
      author: author
    }
    const response = await FetchUtils.authorizedPostWithRequestData('/add-book', requestBody);
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'ADD_BOOK', payload: json});
    } else {
      setError(json.error);
    }
    setIsLoading(false);
  }

  return { addBook, isLoading, error };
}