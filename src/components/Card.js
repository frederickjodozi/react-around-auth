import { useContext } from 'react';
import UserContext from '../contexts/CurrentUserContext';

function Card({
  card, onCardClick, onCardLike, onCardDeleteClick,
}) {
  // Current User Context //
  const currentUser = useContext(UserContext);
  const currentUserCard = card.owner._id === currentUser._id;
  const currentUserLike = card.likes.some((item) => item._id === currentUser._id);

  // Card Event handlers //
  const handleClick = () => onCardClick(card);
  const handleCardLike = () => onCardLike(card, card._id);
  const handleCardDeleteClick = () => onCardDeleteClick(card);

  return (
    <li className="card">
      <div className="card__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}/>
      <div className="card__text-container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={`${'card__like-button'} ${currentUserLike ? 'card__like-button_active' : ''}`}
            type="button" onClick={handleCardLike}
            aria-label="heart-shaped like button"
          />
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button
        className={`${'card__delete-button'} ${currentUserCard ? 'card__delete-button_active' : ''}`}
        type="button"
        onClick={handleCardDeleteClick}
        aria-label="card delete button"
      />
    </li>
  );
}

export default Card;
