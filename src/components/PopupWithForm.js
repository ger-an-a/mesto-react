import React from 'react';
function PopupWithForm(props) {
    return (
        <div onClick={props.onClose} className={`popup popup_target_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div onClick={(evt) => { evt.stopPropagation(); }} className="popup__container popup__container_contain_form">
                <button className="button button_target_close popup__close-btn" onClick={props.onClose} type="button" aria-label="Отмена."></button>
                <form className="form" name={props.name} onSubmit={props.onSubmit}>
                    <h2 className="form__title">{props.title}</h2>
                    {props.children}
                    <button className="button form__submit" type="submit" aria-label="Сохранить">{props.btn}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;