import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);
    const [btnText, setBtnText] = React.useState('Сохранить');

    React.useEffect(() => {
        setBtnText('Сохранить');
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Сохранение...');
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} name="edit" title="Редактировать профиль" btn={btnText} onClose={props.onClose} isOpen={props.isOpen} children={
            <>
                <input value={name} onChange={handleChangeName} className="form__input" id="name-input" type="text" minLength="2" maxLength="40" name="userName"
                    placeholder="Имя пользователя" required />
                <span className="form__input-error name-input-error"></span>
                <input value={description} onChange={handleChangeDescription} className="form__input" id="activity-input" type="text" minLength="2" maxLength="200" name="activity"
                    placeholder="Деятельность" required />
                <span className="form__input-error activity-input-error"></span>
            </>
        } />
    )
}

export default EditProfilePopup;