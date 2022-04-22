import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header() {
  return (
    <header className='header page__wrapper page__wrapper_disabled'>
      <img className='header__logo' src={logo} alt='Around the US'/>
      <Routes>
        <Route
          path='/'
          element={
            <div className='header__info'>
              <span className='header__email'>email@Email</span>
              <button className='header__logout-button' /*handleLogOut*/>Log out</button>
            </div>
          }
        />
        <Route
          path='/signup'
          element={<Link className='header__link' to='/signin'>Log in</Link>}
        />
        <Route
          path='/signin'
          element={<Link className='header__link' to='/signup'>Sign up</Link>}
        />
      </Routes>
    </header>
  );
}

export default Header;
