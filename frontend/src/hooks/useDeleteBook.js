import { useContext, useState } from "react"
import FetchUtils from "../utils/FetchUtils"
import { BooksContext } from "../contexts/BooksContext";
import { AuthContext } from "../contexts/AuthContext";

export const useDeleteBook = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(BooksContext);
  const { user } = useContext(AuthContext);

  const deleteBook = async (book) => {
    setIsLoading(true);
    setError(null);

    const response = await FetchUtils.authorizedDeleteWithRequestData(
        '/delete-book', 
        { book }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_BOOK', payload: json});
    } else {
      setError(json.error);
    }
    setIsLoading(false);
  }

  return { deleteBook, isLoading, error };
}

export default useDeleteBook;