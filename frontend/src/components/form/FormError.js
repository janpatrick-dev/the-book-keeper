const FormError = (props) => {
  const { error } = props;

  return (
    error && <p className='error'>{error}</p>
  );
}

export default FormError;