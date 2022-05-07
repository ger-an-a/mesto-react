import React from 'react';
function PopupWithForm(props) {
    React.useEffect(() => {
        function handleEscClose(evt) {
            if (evt.key === 'Escape') {
                props.onClose();
            }
        }
        document.addEventListener('keydown', handleEscClose);
        return () => {
            document.removeEventListener('keydown', handleEscClose);
        };
    });
    return (
        <div onClick={props.onClose} className={`popup popup_target_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div onClick={(evt) => { evt.stopPropagation(); }} className="popup__container popup__container_contain_form">
                <button className="button button_target_close popup__close-btn" onClick={props.onClose} type="button" aria-label="Отмена."></button>
                <form className="form" name={props.name} noValidate>
                    <h2 className="form__title">{props.title}</h2>
                    {props.children}
                    <button className="button form__submit" type="submit" aria-label="Сохранить">{props.btn}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
