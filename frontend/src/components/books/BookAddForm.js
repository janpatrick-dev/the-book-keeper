import { useState } from "react";
import FormRowInputText from "../form/FormRowInputText";
import FormButton from "../form/FormButton";
import FormError from "../form/FormError";
import LoadingProgress from "../LoadingProgress";
import FormRowCheckbox from "../form/FormRowCheckbox";

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
        <FormRowInputText
          type='text'
          label='Title *'
          value={title}
          name='title'
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
        <FormRowInputText
          type='text'
          label='Author Name *'
          value={author}
          name='author'
          onChange={(e) => setAuthor(e.target.value)}
          required={true}
        />
        <FormRowInputText
          type='text'
          label='Book Image URL'
          value={imgUrl}
          name='imgUrl'
          onChange={(e) => setImgUrl(e.target.value)}
          placeholder='https://www.example.com/image.jpg'
        />
        <FormRowInputText
          type='number'
          label='Year Published'
          value={year}
          name='year'
          onChange={handleYearInputChange}
        />
        <FormRowCheckbox
          label='Mark as read'
          name='hasRead'
          value={hasRead}
          onChange={(e) => setHasRead(e.target.checked)}
        />
        <FormButton 
          disabled={isLoading} 
          label='Add Book'
          className='form__btn-add-book'  />
        {/* <FormError error={error || redirectError} /> */}
        {/* <LoadingProgress isLoading={isLoading} /> */}
      </form>
    </div>
  )
}

export default BookAddForm;