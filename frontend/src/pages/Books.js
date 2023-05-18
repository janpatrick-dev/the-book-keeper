import { useEffect, useState } from "react";
import FetchUtils from "../utils/FetchUtils";
import { Navigate } from "react-router-dom";

const Books = () => {
  const [errorCode, setErrorCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await FetchUtils.fetchWithAuth('/books', 'GET');
        setLoading(false);
        setErrorCode(response.status);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooks();
  }, []);
  
  return errorCode === 401 ? ( 
    <Navigate to='/login' />
  ) : loading ? (
    <div>
      Show loading
    </div>
  ) : (
    <div>
      <h1>You have 10 setBooks to read</h1>
      <div className='book-list'>
        { books.map((book) => {
          <li>{ book.title }</li>
        })}
      </div>
    </div>
  );
}

export default Books;