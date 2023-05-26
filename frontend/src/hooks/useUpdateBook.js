import { useContext, useState } from "react"
import FetchUtils from "../utils/FetchUtils";
import { AuthContext } from "../contexts/AuthContext";

export const useUpdateBook = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const updateBook = async (oldBook, updatedBook) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const response = await FetchUtils.authorizedUpdateWithRequestData(
      `/update-book/${oldBook._id}`,
      { 
        userId: oldBook.userId,
        updatedBook
      }
    );
    const json = await response.json();
    if (response.ok) {
      setMessage(json.msg);
    } else {
      setError(json.error);
    }
    setIsLoading(false);
  }

  return { updateBook, error, isLoading, message }
}