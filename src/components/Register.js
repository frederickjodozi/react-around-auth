import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  // Input States //
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Event Handlers //
  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      email,
      password,
    });
  };

  return (
    <div className='register page__wrapper'>
      <h3 className='register__title'>Sign up</h3>
      <form className='register__form' onSubmit={handleSubmit} >
        <input
          type='email'
          name='email'
          className='register__input'
          id='register__email'
          value={email || ''}
          onChange={handleEmailChange}
          placeholder='Email'
          required
        />
        <input
          type='text'
          name='password'
          className='register__input'
          id='register__password'
          value={password || ''}
          onChange={handlePasswordChange}
          placeholder='Password'
          minLength='2'
          maxLength='30'
          required
        />
        <button className='register__save-button' type='submit'>Sign Up</button>
      </form>
      <Link to='/signin' className='register__link'>Already a member? Log in here!</Link>
    </div>
  );
}

export default Register;
