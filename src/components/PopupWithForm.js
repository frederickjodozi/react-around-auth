import Popup from './Popup';

function PopupWithForm({
  title, formName, buttonText, isOpen, card, onClose, onSubmit, children,
}) {
  return (
    <Popup type='form' isOpen={isOpen} card={card} onClose={onClose}>
      <div className='modal__box'>
        <h3 className='modal__title'>{title}</h3>
        <form className='modal__form' name={formName} onSubmit={onSubmit}>
          {children}
          <button className='modal__save-button' type='submit'>{buttonText}</button>
        </form>
        <button className='modal__close-button' type='button' aria-label='close' onClick={onClose}/>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
