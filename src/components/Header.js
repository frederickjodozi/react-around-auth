import logo from '../images/header__logo.svg';

function Header() {
  return (
    <header className="header page__wrapper page__wrapper_disabled">
      <img className='header__logo' src={logo} alt="Around the US"/>
    </header>
  );
}

export default Header;
