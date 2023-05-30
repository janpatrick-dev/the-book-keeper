const FormRowCheckbox = (props) => {
  const { label, name, value, onChange, checked } = props;

  return (
    <div className='form__row-checkbox'>
      <input 
        type='checkbox'
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={name} className="form__label">{label}</label>
    </div>
  )
}

export default FormRowCheckbox;