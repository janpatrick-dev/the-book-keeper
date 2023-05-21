import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useLogout } from "../hooks/useLogout";
import { BooksContext } from "../contexts/BooksContext";
import FetchUtils from "../utils/FetchUtils";
import BookAddForm from "../components/books/BookAddForm";
import Book from "../components/books/Book";
import StringUtils from "../utils/StringUtils";
import useDeleteBook from "../hooks/useDeleteBook";
import useAddBook from "../hooks/useAddBook";
import LoadingProgress from "../components/LoadingProgress";
import { RedirectContext } from "../contexts/RedirectContext";


const Books = () => {
  const { user } = useContext(AuthContext);
  const { books, dispatch: booksDispatch } = useContext(BooksContext);
  const { error: redirectError, dispatch: redirectDispatch } = useContext(RedirectContext);
  const { addBook, isLoading: addBookLoading } = useAddBook();
  const { deleteBook, isLoading: deleteBookLoading } = useDeleteBook();
  const { logout } = useLogout();
  const [filterBy, setFilterBy] = useState('date-created');
  const [isBooksLoading, setIsBooksLoading] = useState(false);
  const isLoading = addBookLoading || deleteBookLoading || isBooksLoading;

  useEffect(() => {
    const setBooks = (books) => {
      booksDispatch({ type: 'SET_BOOKS', payload: books });
    }

    const fetchBooks = async () => {
      setIsBooksLoading(true);
      redirectDispatch({ type: 'REMOVE_ERROR' });

      try {
        const response = await FetchUtils.authorizedGet(`/books?filterBy=${filterBy}`);
        const json = await response.json();
        if (response.ok) {
          setBooks(json);
        } else if (response.status === 401) {
          logout();
          redirectDispatch({ type: 'SET_ERROR', payload: 'Session has expired' });
          setBooks([]);
        } else {
          setBooks([]);
        }
        setIsBooksLoading(false);
      } catch (err) {
        setIsBooksLoading(false);
        setBooks([]);
      }
    }
    
    fetchBooks();
    StringUtils.setPageTitle('Books');
  }, [deleteBookLoading, filterBy]);

  return user ? (
    <div className="books">
      <div className="books__left">
        <div className="books__left-header">
          <h2>Your Collection</h2>
          <select onChange={(e) => setFilterBy(e.target.value)}>
            <option value="date-created">Sort by Date Created</option>
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author Name</option>
            <option value="year-published">Sort by Year Published</option>
          </select>
        </div>
        {(isLoading) ? (
            <LoadingProgress />
          ) : (
            <div className="books__list">
              {books.map((book) => (
                <Book key={book._id} book={book} deleteBook={deleteBook} />
              ))}
            </div>
          )
        }
      </div>
      <div className="books__right">
        <BookAddForm addBook={addBook} isLoading={addBookLoading} />
      </div>
    </div>
  ) : (
    <Navigate to='/login' />
  )
}

export default Books;