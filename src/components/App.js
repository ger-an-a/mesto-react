import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: 'Загрузка...', about: 'Загрузка...', avatar: '' });
  const [cardList, setCardList] = React.useState([]);
  const [selectedDeleteCard, setDeleteCard] = React.useState({});
  const [isEditProfilePopupOpen, setStateEditPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setStateAddPopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setStateAvatarPopup] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function closeAllPopups() {
    setStateAvatarPopup(false);
    setStateEditPopup(false);
    setStateAddPopup(false);
    setDeletePopup(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard({
      ...card,
      name: card.name,
      link: card.link,
      isOpen: true,
    });
  }

  function handleEditAvatarClick() {
    setStateAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setStateEditPopup(true);
  }

  function handleAddPlaceClick() {
    setStateAddPopup(true);
  }

  function handleUpdateUser({ name, about }) {
    api.patchInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api.patchAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddCard({ title, sorce }) {
    api.postCard(title, sorce)
      .then((newCard) => {
        setCardList([newCard, ...cardList]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCardList((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    setDeletePopup(true);
    setDeleteCard({
      ...card
    });
  }

  function cardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCardList((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getInitialInfo()])
      .then(([cardsData, userData]) => {
        setCurrentUser(userData);
        setCardList(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={[cardList, setCardList]}>
        <div className="background">
          <div className="page">
            <Header />
            <Main cards={cardList} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
            <Footer />
            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <AddPlacePopup onAddPlace={handleAddCard} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
            <DeletePopup card={selectedDeleteCard} onDeleteCard={cardDelete} onClose={closeAllPopups} isOpen={isDeletePopupOpen} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </div>
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
