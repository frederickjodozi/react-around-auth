import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
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
    onRegister(email, password);
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
        <button className='register__save-button' type='submit'>Sign up</button>
      </form>
      <Link to='/signin' className='register__link'>Already a member? Log in here!</Link>
    </div>
  );
}

export default Register;
