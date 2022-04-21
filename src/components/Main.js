import { useContext } from 'react';
import UserContext from '../contexts/CurrentUserContext';
import Card from './Card';
import editButtonSign from '../images/profile__edit-button-sign.svg';

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  cards,
  onCardClick,
  onCardLike,
  onCardDeleteClick,
}) {
  const currentUser = useContext(UserContext);

  return (
    <main>
      <section className='profile page__wrapper'>
        <button className='profile__avatar' type='button' style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={onEditAvatarClick} aria-label='edit-avatar'>
          <img className='profile__avatar-button' src={editButtonSign} alt='edit-avatar' />
        </button>
        <div className='profile__info'>
          <div className='profile__info-name'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button className='profile__edit-button' type='button' onClick={onEditProfileClick} aria-label='edit-profile'/>
          </div>
          <p className='profile__profession'>{currentUser.about}</p>
        </div>
        <button className='profile__add-button' type='button' onClick={onAddPlaceClick} aria-label='add-profile'/>
      </section>
      <section className='places page__wrapper'>
        <ul className='places__list'>
          {cards.map((card) => (<Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDeleteClick={onCardDeleteClick}
          />))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
