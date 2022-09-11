import React, { useEffect, useState } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';

import Header from './Header'
import Main from './Main'
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { apiAuth } from "../utils/ApiAuth";

function App() {
  const [currentUser, setСurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [cards, setCards] = useState([])
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setIsSelectedCard] = useState({});
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isInfoToolTipPopupOpen;
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [email, setEmail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setIsLoading(false);
  }

  function handlePopupClose(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }

  function handleCardClick(card) {
    setIsSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  useEffect(() => {
    api.getUserInfo()
      .then(({data: res}) => {
        setСurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, [])

  function handleUpdateUser(profile) {
    setIsLoading(true);
    api.updateUserInfo(profile)
      .then((res) => {
        setСurrentUser(res.data);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.updateAvatar(avatar)
      .then((res) => {
        setСurrentUser(res.data);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard.data : c));
    }).catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id))
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addNewCard(card)
      .then((res) => {
        setCards([...cards, res.data]);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUserSignUp(data) {
    setIsLoading(true);
    apiAuth.signUp(data)
      .then(() => {
        history.push('/sign-in');
        setErrorStatus(false);
      })
      .catch((res) => {
        console.log(res.status);
        setErrorStatus(true);
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfoToolTipPopupOpen(true);
      })
  }

  function handleUserSignIn(data) {
    setIsLoading(true);
    apiAuth.signIn(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          setEmail(data);
          history.push('/');
        }
      }
      )
      .catch((res) => {
        console.log(res.status);
        setLoggedIn(false);
        setErrorStatus(true);
        setIsInfoToolTipPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    loggedIn ? history.push('/') : history.push('/sign-in')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function checkToken(localToken) {
    apiAuth
      .checkToken(localToken)
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (localStorage.token) {
      checkToken(localStorage.token);
    }
  }, []);


  function deleteToken() {
    setLoggedIn(false)
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} quit={deleteToken} />
      <Switch>
        <ProtectedRoute
          exact path="/"
          component={Main}
          loggedIn={loggedIn}
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Route path="/sign-up">
          <Register onSubmit={handleUserSignUp} buttonText={isLoading} />
        </Route>
        <Route path="/sign-in">
          <Login onSubmit={handleUserSignIn} buttonText={isLoading} />
        </Route>
      </Switch>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handlePopupClose} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handlePopupClose} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handlePopupClose} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
      <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={handlePopupClose} />
      <InfoTooltip isOpen={isInfoToolTipPopupOpen} error={errorStatus} onClose={handlePopupClose} />
    </CurrentUserContext.Provider>
  );
}

export default App;
