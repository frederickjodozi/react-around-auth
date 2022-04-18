import PopupWithForm from './PopupWithForm';

function CardDeletePopup({ card, onClose, onDeleteCard }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteCard(card._id);
  };

  return (
    <PopupWithForm title="Are You Sure?" formName="deleteCardForm" buttonText="Yes" card={card} onClose={onClose} onSubmit={handleSubmit}/>
  );
}

export default CardDeletePopup;
