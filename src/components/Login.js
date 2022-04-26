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
    <div className='auth page__wrapper'>
      <h3 className='auth__title'>Log In</h3>
      <form className='auth__form' onSubmit={handleSubmit} >
        <input
          type='email'
          name='email'
          className='auth__input'
          id='auth__email'
          value={inputValues.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />
        <input
          type='text'
          name='password'
          className='auth__input'
          id='auth__password'
          value={inputValues.password}
          onChange={handleChange}
          placeholder='Password'
          minLength='2'
          maxLength='30'
          required
        />
        <button className='auth__save-button' type='submit'>Log In</button>
      </form>
      <Link to='/signup' className='auth__link'>Not a member yet? Sign up here!</Link>
    </div>
  );
}

export default Login;
