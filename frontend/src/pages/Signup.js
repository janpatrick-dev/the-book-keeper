import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import { AuthContext } from '../contexts/AuthContext';
import StringUtils from '../utils/StringUtils';
import LoadingProgress from '../components/LoadingProgress';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(AuthContext);
  const { signup, error, isLoading } = useSignup();

  useEffect(() => {
    StringUtils.setPageTitle('Sign up');
  }, [])

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
        <div className='divider'></div>
        <div className='form__row'>
          <label htmlFor='name' className='form__label'>Name</label>
          <input 
            type='text' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            name='name'
            className='form__input-text'
          />
        </div>
        <div className='form__row'>
        <label htmlFor='email' className='form__label'>Email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            className='form__input-text'
          />
        </div>
        <div className='form__row'>
        <label htmlFor='password' className='form__label'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            className='form__input-text' />
        </div>
        <button disabled={isLoading} className='form__btn form__btn-signup'>Sign up</button>
        { error && <p className='error'>{error}</p> }
        { isLoading && <LoadingProgress />}
      </form>
    </div>
  );
}

export default Signup;