import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import { BooksContext } from "../contexts/BooksContext";
import { RedirectContext } from "../contexts/RedirectContext";

import { useBook } from "../hooks/useBook";
import { useLogout } from "../hooks/useLogout";

import BookAddForm from "../components/books/BookAddForm";
import Book from "../components/books/Book";
import LoadingProgress from "../components/LoadingProgress";

import FetchUtils from "../utils/FetchUtils";
import StringUtils from "../utils/StringUtils";
import DOMUtils from "../utils/DOMUtils";


const Books = () => {
  const [filterBy, setFilterBy] = useState("date-created");
  const [isBooksLoading, setIsBooksLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { books, dispatch: booksDispatch } = useContext(BooksContext);
  const { dispatch: redirectDispatch } =
    useContext(RedirectContext);
  const { sessionLogout } = useLogout();
  const bookHook = useBook();
  const fetchLoading = bookHook.addLoading || bookHook.updateLoading || bookHook.deleteLoading;
  const isAnyLoading = isBooksLoading || fetchLoading;

  useEffect(() => {
    const setBooks = (books) => {
      booksDispatch({ type: "SET_BOOKS", payload: books });
    };

    const fetchBooks = async () => {
      setIsBooksLoading(true);
      redirectDispatch({ type: "REMOVE_ERROR" });

      try {
        const response = await FetchUtils.authorizedGet(
          `/books?filterBy=${filterBy}`
        );
        const json = await response.json();
        if (response.ok) {
          setBooks(json);
        } else if (response.status === 401) {
          sessionLogout(json.error);
          setBooks([]);
        } else {
          setBooks([]);
        }
        setIsBooksLoading(false);
      } catch (err) {
        setIsBooksLoading(false);
        setBooks([]);
      }
    };

    fetchBooks();
    StringUtils.setPageTitle("Books");
  }, [fetchLoading, filterBy]);

  const handleFloatingAddBookClick = (e) => {
    DOMUtils.showAddBookPopup();
    DOMUtils.hideDrawer();
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="books">
      <div className="books__left">
        <div className="books__left-header">
          <h2>My Books</h2>
          <select onChange={(e) => setFilterBy(e.target.value)}>
            <option value="date-created">Sort by Date Created</option>
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author Name</option>
            <option value="year-published">Sort by Year Published</option>
            <option value="read-status">Sort by Read Status</option>
          </select>
        </div>
        {isAnyLoading ? (
          <LoadingProgress isLoading={isAnyLoading} />
        ) : (
          <div className="books__list">
            {books.map((book) => (
              <Book key={book._id} book={book} hook={bookHook} />
            ))}
          </div>
        )}
      </div>
      <div className="books__right">
        <BookAddForm
          hook={bookHook}
        />
      </div>
      <div className="books__floating">
        <button
          className="btn btn-add-book btn-add-book-floating"
          onClick={handleFloatingAddBookClick}
          disabled={isAnyLoading}
        >
          Add New Book
        </button>
      </div>
    </div>
  );
};

export default Books;
