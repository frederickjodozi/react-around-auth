import Popup from './Popup';

function ImagePopup({ card, onClose }) {
  return (
    <Popup type='image-preview' card={card} onClose={onClose}>
      <figure className='modal__figure'>
        <img className='modal__image_type_image-preview' alt={card ? card.name : ''} src={card ? card.link : ''}/>
        <figcaption className='modal__caption'>{card ? card.name : ''}</figcaption>
        <button className='modal__close-button modal__close-button_type_image' type='button' onClick={onClose} aria-label='close'/>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
