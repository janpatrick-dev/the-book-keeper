import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Book = ({ book, hook }) => {
  const { updateBook, deleteBook } = hook;
  const {
    _id,
    title,
    author,
    yearPublished,
    hasRead,
    imgUrl,
    createdAt,
  } = book;
  
  const handleUpdateReadStatus = async (e) => {
    await updateBook(book, { hasRead: !hasRead })
  }

  const handleDelete = async (e) => {
    await deleteBook(book);
  }

  return (
    <div className={`books__item ${hasRead && 'books__item--read'}`}>
      <div className='books__item-left'>
        { imgUrl && 
          <img src={imgUrl} alt={`Book cover of ${title}`} className="books__item-img" />
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
          <CheckBoxIcon
            className={`books__item-check-icon ${hasRead && 'active'}`}
            onClick={handleUpdateReadStatus}
            titleAccess={`Mark as ${hasRead ? 'unread' : 'read'}`} 
          />
          <Link to={`/update-book/${_id}`}>
            <EditIcon
              className='books__item-edit-icon'
              titleAccess='Edit this book' 
            />
          </Link>
          <DeleteIcon 
            className='books__item-delete-icon' 
            onClick={handleDelete} 
            titleAccess='Delete this book'
          />
        </div>
      </div>
    </div>
  )
}

export default Book;