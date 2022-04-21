import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  // Input States //
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  // Event Handlers //
  const handleCardNameChange = (e) => {
    e.preventDefault();
    setCardName(e.target.value);
  };

  const handleCardLinkChange = (e) => {
    e.preventDefault();
    setCardLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard({
      name: cardName,
      link: cardLink,
    });
  };

  return (
    <PopupWithForm title='New Place' formName='addPlaceForm' buttonText='Create' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        className='modal__input modal__input_content_card-name'
        id='modal__card-name'
        value={cardName}
        onChange={handleCardNameChange}
        placeholder='Title'
        minLength='2'
        maxLength='30'
        required
      />
      <span className='modal__input-error' id='modal__card-name-error'/>
      <input
        type='url'
        name='link'
        className='modal__input modal__input_content_card-link'
        id='modal__card-link'
        value={cardLink}
        onChange={handleCardLinkChange}
        placeholder='Image Link'
        required
      />
      <span className='modal__input-error' id='modal__card-link-error'/>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
