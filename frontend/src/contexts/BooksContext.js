import { createContext, useReducer } from "react";

export const BooksContext = createContext();

const booksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return [...action.payload];
    case 'ADD_BOOK':
      return [action.payload, ...state];
    case 'DELETE_BOOK':
      return state.filter((book) => book._id !== action.payload._id);
    default:
      return state;
  }
}

const BooksContextProvider = ({ children }) => {
  const [books, dispatch] = useReducer(booksReducer, []);

  return (
    <BooksContext.Provider value={{ books, dispatch }}>
      { children }
    </BooksContext.Provider>
  )
}

export default BooksContextProvider;