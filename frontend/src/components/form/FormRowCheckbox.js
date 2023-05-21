const FormRowCheckbox = (props) => {
  const { label, name, value, onChange } = props;

  return (
    <div className='form__row-checkbox'>
      <input 
        type='checkbox'
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name} className="form__label">{label}</label>
    </div>
  )
}

export default FormRowCheckbox;