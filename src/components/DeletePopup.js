import PopupWithForm from "./PopupWithForm"
import React from "react";

function DeletePopup(props) {
    const [btnText, setBtnText] = React.useState('Да');

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Удаление...');
        props.onDeleteCard(props.card);
    }

    React.useEffect(() => {
        setBtnText('Да');
    }, [props.isOpen]);

    return (
        <PopupWithForm onSubmit={handleSubmit} name="delete" title="Вы уверены?" btn={btnText} onClose={props.onClose} isOpen={props.isOpen} children={<></>} />
    )
}

export default DeletePopup