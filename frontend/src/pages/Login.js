import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(AuthContext);
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  }

  return user ? (
    <Navigate to='/books' />
  ) : (
    <div className='login'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>Login</h1>
        <div className='form__divider'></div>
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
        { error && <p>Invalid credentials</p> }
        <button disabled={isLoading} className='form__btn form__btn-login'>Log in</button>
      </form>
    </div>
  );
}

export default Login;