import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header({ email, onLogout }) {
  // Menu State, Effect and handler //
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((open) => !open);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    onLogout();
  };

  return (
    <>
      {isMenuOpen
        ? <ul className='header__list'>
            <li className='header__list-item'>
              <span className='header__email header__email_type_menu'>{ email }</span>
            </li>
            <li className='header__list-item'>
              <button className='header__logout-button header__logout-button_type_menu' onClick={handleLogout}>Log out</button>
            </li>
          </ul>
        : ''
      }
      <header className='header page__wrapper page__wrapper_disabled'>
        <img className='header__logo' src={logo} alt='Around the US'/>
        <Routes>
          <Route
            path='/'
            element={
              <div className='header__info'>
                <span className='header__email'>{ email }</span>
                <button className='header__logout-button' onClick={onLogout}>Log out</button>
                <button
                  className={isMenuOpen ? 'header__close-button' : 'header__hamburger-menu'}
                  onClick={handleMenuClick}
                />
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
    </>
  );
}

export default Header;
