import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { AuthContext } from '../contexts/AuthContext';
import StringUtils from '../utils/StringUtils';
import { CircularProgress } from '@mui/material';
import LoadingProgress from '../components/LoadingProgress';
import { RedirectContext } from '../contexts/RedirectContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(AuthContext);
  const { error: redirectError, dispatch } = useContext(RedirectContext);
  const { login, error, isLoading } = useLogin();

  useEffect(() => {
    StringUtils.setPageTitle('Log in');
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    if (redirectError) {
      dispatch({ type: 'REMOVE_ERROR' });
    }
  }

  return user ? (
    <Navigate to='/books' />
  ) : (
    <div className='login'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>Login</h1>
        <div className='divider'></div>
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
        <button disabled={isLoading} className='form__btn form__btn-login'>Log in</button>
        { error && <p className='error'>{error}</p> }
        { redirectError && <p className='error'>{redirectError}</p>}
        { isLoading && <LoadingProgress />}
      </form>
    </div>
  );
}

export default Login;