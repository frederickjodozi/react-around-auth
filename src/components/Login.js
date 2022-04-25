import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  // Input States //
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  // Event Handlers //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = inputValues;
    onLogin(email, password);
  };

  return (
    <div className='register page__wrapper'>
      <h3 className='register__title'>Log In</h3>
      <form className='register__form' onSubmit={handleSubmit} >
        <input
          type='email'
          name='email'
          className='register__input'
          id='register__email'
          value={inputValues.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />
        <input
          type='text'
          name='password'
          className='register__input'
          id='register__password'
          value={inputValues.password}
          onChange={handleChange}
          placeholder='Password'
          minLength='2'
          maxLength='30'
          required
        />
        <button className='register__save-button' type='submit'>Log In</button>
      </form>
      <Link to='/signup' className='register__link'>Not a member yet? Sign up here!</Link>
    </div>
  );
}

export default Login;
