function Footer() {
  const date = new Date();

  return (
    <footer className="footer page__wrapper">
      <p className="footer__copyright">{`© ${date.getFullYear()} Around the U.S.`}</p>
    </footer>
  );
}

export default Footer;
