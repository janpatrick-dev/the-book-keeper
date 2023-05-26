import { useContext } from "react";
import { useBook } from "../../hooks/useBook";
import DOMUtils from "../../utils/DOMUtils";
import BookAddForm from "../books/BookAddForm";
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from "../../contexts/AuthContext";

const AddBookPopup = () => {
  const bookHook = useBook();
  const { user } = useContext(AuthContext);

  const handleClickAction = (e) => {
    DOMUtils.hideAddBookPopup();
  }

  return user && (
    <div className="add-book-popup hide">
      <div className="add-book-popup__container">
        <CloseIcon className='close-icon' onClick={handleClickAction} />
        <BookAddForm hook={bookHook} shouldClear={true} />
      </div>
    </div>
  )
}

export default AddBookPopup;