import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const LoadingProgress = (props) => {
  const [loadingText, setLoadingText] = useState('');
  const { isLoading } = props;
  const style = {
    margin: '0 auto'
  }

  useEffect(() => {
    setLoadingText('');
    if (isLoading) {
      setTimeout(() => {
        setLoadingText('Server asleep. Load time: 30 seconds.')
      }, 5000)
    }
  }, [isLoading]);
  
  return (
    isLoading && (
      <div className="center">
        <CircularProgress style={style} />
        <p>{loadingText}</p>
      </div>
    )
  );
}

export default LoadingProgress;