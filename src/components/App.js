import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWihForm from './PopupWithForm';

function App() {
  const [isEditProfilePopupOpen, setStateEditPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setStateAddPopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setStateAvatarPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function closeAllPopups() {
    setStateAvatarPopup(false);
    setStateEditPopup(false);
    setStateAddPopup(false);
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

  return (
    <div className="background">
      <div className="page">
        <Header />
        <Main onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
        <Footer />
        <PopupWihForm name="edit" title="Редактировать профиль" btn="Сохранить" onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} children={
          <>
            <input className="form__input" id="name-input" type="text" minLength="2" maxLength="40" name="userName"
              placeholder="Имя пользователя" required />
            <span className="form__input-error name-input-error"></span>
            <input className="form__input" id="activity-input" type="text" minLength="2" maxLength="200" name="activity"
              placeholder="Деятельность" required />
            <span className="form__input-error activity-input-error"></span>
          </>
        } />
        <PopupWihForm name="add" title="Новое место" btn="Создать" onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} children={
          <>
            <input className="form__input" id="title-input" minLength="2" maxLength="30" type="text" name="title"
              placeholder="Название" required />
            <span className="form__input-error title-input-error"></span>
            <input className="form__input" id="sorce-input" type="url" name="sorce" placeholder="Ссылка на картинку" required />
            <span className="form__input-error sorce-input-error"></span>
          </>
        } />
        <PopupWihForm name="avatar" title="Обновить аватар" btn="Сохранить" onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} children={
          <>
            <input className="form__input" id="avatar-input" type="url" name="sorce" placeholder="Ссылка на картинку"
              required />
            <span className="form__input-error avatar-input-error"></span>
          </>
        } />
        <PopupWihForm name="delete" title="Вы уверены?" btn="Да" onClose={closeAllPopups} children={<></>} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
