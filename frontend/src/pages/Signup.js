import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import { AuthContext } from '../contexts/AuthContext';
import StringUtils from '../utils/StringUtils';
import LoadingProgress from '../components/LoadingProgress';
import FormButton from '../components/form/FormButton';
import FormError from '../components/form/FormError';
import FormRowInputText from '../components/form/FormRowInputText';

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
        <FormRowInputText
          type='text'
          label='Name'
          value={name}
          name='name'
          onChange={(e) => setName(e.target.value)}
        />
        <FormRowInputText
          type='text'
          label='Email'
          value={email}
          name='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormRowInputText
          type='password'
          label='Password'
          value={password}
          name='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButton disabled={isLoading} label='Sign up' className='form__btn-signup' />
        <FormError error={error} />
        <LoadingProgress isLoading={isLoading} />
      </form>
    </div>
  );
}

export default Signup;