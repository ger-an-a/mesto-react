import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {
    const inputRef = React.useRef();
    const [btnText, setBtnText] = React.useState('Сохранить');

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Сохранение...');
        props.onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    React.useEffect(() => {
        setBtnText('Сохранить');
        inputRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm onSubmit={handleSubmit} name="avatar" title="Обновить аватар" btn={btnText} onClose={props.onClose} isOpen={props.isOpen} children={
            <>
                <input ref={inputRef} className="form__input" id="avatar-input" type="url" name="sorce" placeholder="Ссылка на картинку"
                    required />
                <span className="form__input-error avatar-input-error"></span>
            </>
        } />
    )

}

export default EditAvatarPopup;