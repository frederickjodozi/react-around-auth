import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import CardDeletePopup from './CardDeletePopup';

function App() {
  // Current User, Card and Popup States //
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);

  //  Current User and Card Api calls on page load //
  useEffect(() => {
    api.getUserInfo().then((userData) => {
      setCurrentUser(userData);
    })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  useEffect(() => {
    api.getCards().then((cardsData) => {
      setCards(cardsData);
    })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  // Click Event Handlers //
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);
  const handleCardDeleteClick = (card) => setSelectedCardToDelete(card);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setSelectedCardToDelete(null);
  };

  // Profile Updates and Add Card //
  const handleUpdateUser = (userUpdateData) => {
    api.editUserInfo(userUpdateData).then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })
      .catch((err) => console.log(`Error: ${err}`));
  };

  const handleUpdateAvatar = (avatarUpdateData) => {
    api.editUserAvatar(avatarUpdateData).then((newAvatarData) => {
      setCurrentUser(newAvatarData);
      closeAllPopups();
    })
      .catch((err) => console.log(`Error: ${err}`));
  };

  const handleAddCard = (cardData) => {
    api.addCard(cardData).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => console.log(`Error: ${err}`));
  };

  // Card Event Handlers //
  const handleCardLike = (card, cardId) => {
    if (card.likes.some((item) => item._id === currentUser._id)) {
      api.deleteLike(cardId).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
        .catch((err) => console.log(`Error: ${err}`));
    } else {
      api.addLike(cardId).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
        .catch((err) => console.log(`Error: ${err}`));
    }
  };

  const handleCardDelete = (cardId) => {
    api.deleteCard(cardId).then(() => {
      setCards((items) => (items.filter((card) => card._id !== cardId)));
      closeAllPopups();
    })
      .catch((err) => console.log(`Error: ${err}`));
  };

  return (
    <UserContext.Provider value = {currentUser}>
      <div className="page">
        <Header/>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute /*isLoggedIn={isLoggedIn}*/>
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDeleteClick={handleCardDeleteClick}
                />
              </ProtectedRoute>
            }
          />
          <Route path='/signup' element={<Register /*onRegister={handleRegister}*/ />}/>
          <Route path='/signin' element={<Login /*onLogin={handleLogin}*/ />}/>
        </Routes>
        <Footer/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <CardDeletePopup
          card={selectedCardToDelete}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;
