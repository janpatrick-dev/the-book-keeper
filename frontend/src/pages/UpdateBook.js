import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import FetchUtils from "../utils/FetchUtils";
import FormRowInputText from "../components/form/FormRowInputText";
import FormRowCheckbox from "../components/form/FormRowCheckbox";
import FormButton from "../components/form/FormButton";
import FormError from "../components/form/FormError";
import { useBook } from "../hooks/useBook";
import LoadingProgress from "../components/LoadingProgress";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "../contexts/AuthContext";

const UpdateBook = () => {
  const { id } = useParams();
  const { updateBook, updateLoading, error } = useBook();
  const { sessionLogout } = useLogout();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [year, setYear] = useState(2023);
  const [hasRead, setHasRead] = useState(false);
  const [book, setBook] = useState(null);

  const [err, setErr] = useState(null);
  const [isBookLoading, setIsBookLoading] = useState(false);
  const [returnToBooks, setReturnToBooks] = useState(false);

  useEffect(() => {
    setIsBookLoading(true);

    const fetchBook = async () => {
      const response = await FetchUtils.authorizedGet(`/books/${id}`);
      const json = await response.json();
      if (response.ok) {
        setBook(json);
        setBookInfo(json);
        setIsBookLoading(false);
      } else if (response.status === 401) {
        sessionLogout(json.error);
      } else {
        setErr(json.error);
        setIsBookLoading(false);
      }
    }

    fetchBook();
  }, []);

  const setBookInfo = (book) => {
    // return;
    setTitle(book.title);
    setAuthor(book.author);
    setImgUrl(book.imgUrl);
    setYear(book.yearPublished);
    setHasRead(book.hasRead);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = {};
    
    if (title !== book.title) { updatedFields.title = title; }
    if (author !== book.author) { updatedFields.author = author; }
    if (imgUrl !== book.imgUrl) { updatedFields.imgUrl = imgUrl; }
    if (year !== book.yearPublished) { updatedFields.yearPublished = year; }
    if (hasRead !== book.hasRead) { updatedFields.hasRead = hasRead; }

    if (Object.keys(updatedFields).length === 0) {
      return;
    }

    await updateBook(book, updatedFields);
    resetForm();
    setReturnToBooks(true);
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

  if (!user) {
    return <Navigate to='/login' />
  }

  if (returnToBooks) {
    return <Navigate to='/books' />
  }
  
  return (
    <div className='books__update'>
      <LoadingProgress isLoading={isBookLoading} />
      { !isBookLoading && 
        <form onSubmit={handleSubmit} className='form'>
          <h1>Update Book</h1>
          <div className='divider'></div>
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
            value={true}
            onChange={(e) => setHasRead(e.target.checked)}
            checked={hasRead}
          />
          <FormButton 
            disabled={updateLoading} 
            label='Update Book'
            className='btn-update-book'  />
          <FormError error={error} />
          <LoadingProgress isLoading={updateLoading} />
        </form>
      }
    </div>
  );
}

export default UpdateBook;