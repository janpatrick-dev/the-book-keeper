import { CircularProgress } from "@mui/material";

const LoadingProgress = (props) => {
  const { isLoading } = props;
  const style = {
    margin: '0 auto'
  }
  
  return (
    isLoading && <CircularProgress style={style} />
  );
}

export default LoadingProgress;