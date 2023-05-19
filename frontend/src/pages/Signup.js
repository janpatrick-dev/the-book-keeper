import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import { AuthContext } from '../contexts/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(AuthContext);
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password);
  }

  return user ? (
    <Navigate to='/books' />
  ) : (
    <div className='signup'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>Sign Up</h1>
        <div className='form__divider'></div>
        <div className='form__row'>
          <label htmlFor='name'>Name</label>
          <input 
            type='text' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            name='name'
            className='form__input-text'
          />
        </div>
        <div className='form__row'>
        <label htmlFor='email'>Email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            className='form__input-text'
          />
        </div>
        <div className='form__row'>
        <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            className='form__input-text' />
        </div>
        { error && <p>Invalid credentials</p> }
        <button disabled={isLoading} className='form__btn form__btn-signup'>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;