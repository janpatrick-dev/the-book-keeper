import { useContext, useState } from "react";
import FetchUtils from "../utils/FetchUtils";
import DOMUtils from "../utils/DOMUtils";
import { useLogout } from "./useLogout";
import { BooksContext } from "../contexts/BooksContext";
import { RedirectContext } from "../contexts/RedirectContext";
import { AuthContext } from "../contexts/AuthContext";

export const useBook = () => {
  const [addLoading, setAddLoading] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const { dispatch: booksDispatch } = useContext(BooksContext);
  const { dispatch: redirectDispatch } = useContext(RedirectContext);
  const { sessionLogout } = useLogout();

  const reset = () => {
    setError(null);
    setMessage(null);
  }

  const addBook = async (dataObj) => {
    reset();
    setAddLoading(true);

    const requestBody = { userId: user._id, ...dataObj };
    const response = await FetchUtils.authorizedPostWithRequestData('/add-book', requestBody);
    const json = await response.json();
    if (response.ok) {
      booksDispatch({ type: 'ADD_BOOK', payload: json.book});
      DOMUtils.hideAddBookPopup();
      setMessage(json.msg);
    } else if (response.status === 401) {
      sessionLogout(json.error);
    } else {
      setError(json.error);
    }
    setAddLoading(false);
  }

  const updateBook = async (oldBook, updatedBook) => {
    reset();
    setUpdateLoading(true);

    const requestBody = {
      bookOwnerId: oldBook.userId,
      updatedBook
    }
    const response = await FetchUtils.authorizedUpdateWithRequestData(
      `/update-book/${oldBook._id}`,
      requestBody
    );
    const json = await response.json();
    if (response.ok) {
      setMessage(json.msg);
    } else {
      setError(json.error);
    }
    setUpdateLoading(false);
  }

  const deleteBook = async (book) => {
    reset();
    setDeleteLoading(true);

    const requestBody = { book };
    const response = await FetchUtils.authorizedDeleteWithRequestData(
        '/delete-book', 
        requestBody
    );
    const json = await response.json();
    if (response.ok) {
      booksDispatch({ type: 'DELETE_BOOK', payload: json});
      setMessage(json.msg);
    } else {
      setError(json.error);
    }
    setDeleteLoading(false);
  }

  return {
    addBook,
    updateBook,
    deleteBook,
    message,
    error,
    addLoading,
    updateLoading,
    deleteLoading
  }
}