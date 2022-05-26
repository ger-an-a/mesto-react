import React from "react";

function Card(props) {
    const [likes, setLikes] = React.useState(props.cardData.likes.length);

    function handleClick() {
        props.onCardClick(props.cardData);
    }

    function handleLikeClick() {
        props.onCardLike(props.cardData, setLikes);
        setLikes('...');
    }

    function handleDeleteClick() {
        props.onCardDelete(props.cardData);
    }

    React.useEffect(() => {
        setLikes(props.cardData.likes.length);
    }, [props.cardData.likes.length]);

    return (
        <li className="card">
            <button onClick={handleDeleteClick} className={`button ${props.deleteBtnClass}`} type="button" aria-label="Удалить."></button>
            <img onClick={handleClick} className="card__img" src={props.cardData.link} alt={props.cardData.name} />
            <div className="card__description">
                <h2 className="card__title">{props.cardData.name}</h2>
                <div className="card__like">
                    <button onClick={handleLikeClick} className={`button ${props.likeBtnClass}`} type="button" aria-label="Нравится."></button>
                    <p className="card__likes">{likes}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;