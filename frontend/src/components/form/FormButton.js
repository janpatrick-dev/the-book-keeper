const FormButton = (props) => {
  const { disabled, label, className } = props;
  
  return (
    <button disabled={disabled} className={`form__btn ${className}`}>{ label }</button>
  )
}

export default FormButton;