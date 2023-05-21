import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useContext } from 'react';
import { BooksContext } from '../../contexts/BooksContext';
import useDeleteBook from '../../hooks/useDeleteBook';

const Book = ({ book, deleteBook }) => {
  const { dispatch } = useContext(BooksContext);
  const { 
    title, 
    author, 
    yearPublished,
    hasRead,
    imgUrl,
    createdAt
  } = book;

  const handleDelete = async (e) => {
    await deleteBook(book);
  }

  return (
    <div className={`books__item ${hasRead && 'books__item--read'}`}>
      <div className='books__item-left'>
        { imgUrl && 
          <img src={imgUrl} alt={`Book cover image of ${title}`} className="books__item-img" />
        }
      </div>
      <div className='books__item-right'>
        <div className='books__item-details'>
          <div>
            <p className='books__item-title'>{title}</p>
            <p className='books__item-author'>{author}</p>
            <p className='books__item-year'>{yearPublished}</p>
          </div>
          <p className='books__item-created'>{moment(createdAt).fromNow()}</p>
        </div>
        <div className='books__item-actions'>
        <DeleteIcon 
          className='books__item-delete-icon' 
          onClick={handleDelete} 
        />
        </div>
      </div>
    </div>
  )
}

export default Book;