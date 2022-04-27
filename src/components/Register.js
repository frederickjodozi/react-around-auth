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
    <div className='auth page__wrapper'>
      <h3 className='auth__title'>Sign up</h3>
      <form className='auth__form' onSubmit={handleSubmit} >
        <input
          type='email'
          name='email'
          className='auth__input'
          id='auth__email'
          value={inputValues.email}
          onChange={handleChange}
          placeholder='Email'
          autoComplete='off'
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
          autoComplete='off'
          required
        />
        <button className='auth__save-button' type='submit'>Sign up</button>
      </form>
      <Link to='/signin' className='auth__link'>Already a member? Log in here!</Link>
    </div>
  );
}

export default Register;
