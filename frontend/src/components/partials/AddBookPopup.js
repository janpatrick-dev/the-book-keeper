import useAddBook from "../../hooks/useAddBook";
import DOMUtils from "../../utils/DOMUtils";
import BookAddForm from "../books/BookAddForm";
import CloseIcon from '@mui/icons-material/Close';

const AddBookPopup = () => {
  const { addBook, isLoading, error } = useAddBook();

  const handleClickAction = (e) => {
    DOMUtils.hideAddBookPopup();
  }

  return (
    <div className="add-book-popup">
      <div className="add-book-popup__container">
        <CloseIcon className='close-icon' onClick={handleClickAction} />
        <BookAddForm addBook={addBook} isLoading={isLoading} error={error} />
      </div>
    </div>
  )
}

export default AddBookPopup;