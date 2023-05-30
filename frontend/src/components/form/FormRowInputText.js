const FormRowInputText = (props) => {
  const { type, name, label, value, onChange, required, placeholder } = props;

  return (
    <div className='form__row'>
      <label htmlFor={name} className='form__label'>{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange}
        name={name}
        id={name}
        className='form__input-text'
        placeholder={placeholder}
        required={required || false}
      />
    </div>
  )
}

export default FormRowInputText;