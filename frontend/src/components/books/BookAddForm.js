import { useState } from "react";
import { useAddBook } from "../../hooks/useAddBook";

const BookAddForm = ({ addBook, isLoading }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [year, setYear] = useState(2023);
  const [hasRead, setHasRead] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook(title, author, year, imgUrl, hasRead);
    resetForm();
  }

  const handleYearInputChange = (e) => {
    const year = parseInt(e.target.value);
    setYear(year);
  }

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setImgUrl('');
    setYear(2023);
  }

  return (
    <div className='books__add'>
      <form onSubmit={handleSubmit} className='form'>
        <h2>New book</h2>
        <div className='form__row'>
          <label htmlFor='title' className='form__label'>Title *</label>
          <input 
            type='text' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            name='title'
            className='form__input-text'
            required
          />
        </div>
        <div className='form__row'>
          <label htmlFor='author' className='form__label'>Author Name *</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            name='author'
            className='form__input-text'
            required />
        </div>
        <div className='form__row'>
          <label htmlFor='imgUrl' className='form__label'>Book Image URL</label>
          <input
            type='text'
            value={imgUrl}
            name='imgUrl'
            placeholder="https://www.example.com/image.jpg"
            className='form__input-text'
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>
        <div className='form__row'>
          <label htmlFor='year' className='form__label'>Year Published</label>
          <input
            type='number'
            value={year}
            onChange={handleYearInputChange}
            name='year'
            className='form__input-text'
          />
        </div>
        <div className='form__row-checkbox'>
          <input 
            type='checkbox'
            value={hasRead}
            onChange={(e) => setHasRead(e.target.checked)}
            name='hasRead'
          />
          <label htmlFor='hasRead' className="form__label">Mark as read</label>
        </div>
        <button disabled={isLoading} className='form__btn form__btn-add-book'>
          Add Book
        </button>
      </form>
    </div>
  )
}

export default BookAddForm;