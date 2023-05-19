import { useState } from "react";
import { useAddBook } from "../../hooks/useAddBook";

const BookAddForm = () => {
  const { isLoading, addBook } = useAddBook();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState(2023);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook(title, author, year);
  }

  const handleYearInputChange = (e) => {
    const year = parseInt(e.target.value);
    setYear(year);
  }

  return (
    <div className='books__add'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>New book</h1>
        <input 
          type='text' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          name='title'
          placeholder='Title'
          className='form__input-text'
          required
        />
        <input 
          type='text' 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)}
          name='author'
          placeholder='Author Name'
          className='form__input-text'
          required />
        <input 
          type='number'
          value={year} 
          onChange={handleYearInputChange}
          name='year'
          className='form__input-text'
        />
        <button disabled={isLoading}>Submit</button>
      </form>
    </div>
  )
}

export default BookAddForm;