import { useState, useEffect } from 'react';
import {
  Routes, Route, Navigate, useNavigate,
} from 'react-router-dom';
import UserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import CardDeletePopup from './CardDeletePopup';

function App() {
  const navigate = useNavigate();

  // InfoToolTip and Login States //
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailAdress, setEmailAdress] = useState('');

  const [infoToolTipStatus, setInfoToolTipStatus] = useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  // Current User, Card and Popup States //
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);

  // Token check on page load //
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setEmailAdress(res.email);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //  Current User and Card Api calls on page load //
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.getUserInfo(token).then((userData) => {
        setCurrentUser(userData);
      })
        .catch((err) => console.log(`Error: ${err}`));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.getCards(token).then((cardsData) => {
        setCards(cardsData);
      })
        .catch((err) => console.log(`Error: ${err}`));
    }
  }, [isLoggedIn]);

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
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
    setSelectedCardToDelete(null);
  };

  // Sign up and Sign in Handlers //
  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then((res) => {
        if (res._id) {
          setInfoToolTipStatus('success');
          setIsInfoToolTipOpen(true);
          navigate('/signin');
        } else {
          setInfoToolTipStatus('fail');
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipStatus('fail');
        setIsInfoToolTipOpen(true);
      });
  };

  const handleLogin = (email, password) => {
    auth.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setEmailAdress(email);
          setIsLoggedIn(true);
          navigate('/');
        } else {
          setInfoToolTipStatus('fail');
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipStatus('fail');
        setIsInfoToolTipOpen(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setEmailAdress('');
    setIsLoggedIn(false);
    navigate('/signin');
  };

  // Profile Updates and Add Card Handlers //
  const handleUpdateUser = (userUpdateData) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.editUserInfo(userUpdateData, token).then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
        .catch((err) => console.log(`Error: ${err}`));
    }
  };

  const handleUpdateAvatar = (avatarUpdateData) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.editUserAvatar(avatarUpdateData, token).then((newAvatarData) => {
        setCurrentUser(newAvatarData);
        closeAllPopups();
      })
        .catch((err) => console.log(`Error: ${err}`));
    }
  };

  const handleAddCard = (cardData) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.addCard(cardData, token).then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
        .catch((err) => console.log(`Error: ${err}`));
    }
  };

  // Card Event Handlers //
  const handleCardLike = (card, cardId) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      if (card.likes.some((item) => item === currentUser._id)) {
        api.deleteLike(cardId, token).then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
          .catch((err) => console.log(`Error: ${err}`));
      } else {
        api.addLike(cardId, token).then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
          .catch((err) => console.log(`Error: ${err}`));
      }
    }
  };

  const handleCardDelete = (cardId) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.deleteCard(cardId, token).then(() => {
        setCards((items) => (items.filter((card) => card._id !== cardId)));
        closeAllPopups();
      })
        .catch((err) => console.log(`Error: ${err}`));
    }
  };

  return (
    <UserContext.Provider value = {currentUser}>
      <div className='page'>
        <Header email={emailAdress} onLogout={handleLogout} />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
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
          <Route path='/signup' element={<Register onRegister={handleRegister} />}/>
          <Route path='/signin' element={<Login onLogin={handleLogin} />}/>
          <Route path='/*' element ={<Navigate to='/' />} />
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
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={infoToolTipStatus}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;
