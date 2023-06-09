import { useEffect, useState } from "react";
import FormRowInputText from "../form/FormRowInputText";
import FormButton from "../form/FormButton";
import FormError from "../form/FormError";
import LoadingProgress from "../LoadingProgress";
import FormRowCheckbox from "../form/FormRowCheckbox";

const BookAddForm = ({ hook, shouldClear }) => {
  const {
    addBook,
    error,
    addLoading
  } = hook;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [year, setYear] = useState(2023);
  const [hasRead, setHasRead] = useState(false);
  const [err, setErr] = useState(error || '');

  // used to clear errors on form
  const [clear, setClear] = useState(shouldClear || false);

  useEffect(() => {
    if (clear) {
      setClear(false);
      setErr('');
    }
  }, [clear]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook({
      title, 
      author, 
      imgUrl, 
      hasRead,
      yearPublished: year
    });
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
    setHasRead(false);
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
          disabled={addLoading} 
          label='Add Book'
          className='btn-add-book'  />
        <FormError error={err} />
        <LoadingProgress isLoading={addLoading} />
      </form>
    </div>
  )
}

export default BookAddForm;