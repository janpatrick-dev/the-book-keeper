import { useContext, useEffect, useState } from "react";
import FetchUtils from "../utils/FetchUtils";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useLogout } from "../hooks/useLogout";
import BookAddForm from "../components/books/BookAddForm";
import Book from "../components/books/Book";
import { BooksContext } from "../contexts/BooksContext";


const Books = () => {
  const { user } = useContext(AuthContext);
  const { books, dispatch } = useContext(BooksContext);
  const { logout } = useLogout();

  useEffect(() => {
    const setBooks = (books) => {
      dispatch({ type: 'SET_BOOKS', payload: books });
    }

    const fetchBooks = async () => {
      try {
        const response = await FetchUtils.authorizedGet('/books');
        const json = await response.json();
        if (response.ok) {
          setBooks(json);
        } else if (response.status === 401) {
          logout();
          setBooks([]);
        } else {
          setBooks([]);
        }
      } catch (err) {
        console.log(err);
        setBooks([]);
      }
    }
    
    fetchBooks();
  }, []);

  return user ? (
    <div className="books">
      <h1>Library</h1>
      <div className="books__container">
        <div className="books__list">
          {books.map((book) => (
            <Book key={book._id} book={book} />
          ))}
        </div>
        <BookAddForm />
      </div>
    </div>
  ) : (
    <Navigate to='/login' />
  )
}

export default Books;