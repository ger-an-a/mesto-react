import React from "react";
import { CardsContext } from "../contexts/CardsContext";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [btnText, setBtnText] = React.useState('Создать');

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeUrl(e) {
        setUrl(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Сохранение...');
        props.onAddPlace({
            title,
            sorce: url,
        });
    }

    React.useEffect(() => {
        setBtnText('Создать');
        setTitle('');
        setUrl('');
    }, [props.isOpen]);

    return (
        <PopupWithForm onSubmit={handleSubmit} name="add" title="Новое место" btn={btnText} onClose={props.onClose} isOpen={props.isOpen} children={
            <>
                <input value={title} onChange={handleChangeTitle} className="form__input" id="title-input" minLength="2" maxLength="30" type="text" name="title"
                    placeholder="Название" required />
                <span className="form__input-error title-input-error"></span>
                <input value={url} onChange={handleChangeUrl} className="form__input" id="sorce-input" type="url" name="sorce" placeholder="Ссылка на картинку" required />
                <span className="form__input-error sorce-input-error"></span>
            </>
        } />
    )
}

export default AddPlacePopup;