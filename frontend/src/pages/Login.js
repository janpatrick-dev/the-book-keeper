import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { AuthContext } from '../contexts/AuthContext';
import StringUtils from '../utils/StringUtils';
import LoadingProgress from '../components/LoadingProgress';
import { RedirectContext } from '../contexts/RedirectContext';
import FormRowInputText from '../components/form/FormRowInputText';
import FormButton from '../components/form/FormButton';
import FormError from '../components/form/FormError';

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

  if (user) {
    return <Navigate to='/books' />;
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>Login</h1>
        <div className='divider'></div>
        <FormRowInputText
          type='text'
          label='Email'
          value={email}
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <FormRowInputText
          type='password'
          label='Password'
          value={password}
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <FormButton 
          disabled={isLoading} 
          label='Log in'
          className='btn-login'  />
        <FormError error={error || redirectError} />
        <LoadingProgress isLoading={isLoading} />
      </form>
    </div>
  );
}

export default Login;