function Card(props) {
    function handleClick() {
        props.onCardClick(props.cardData);
    }

    return (
        <li className="card">
            <button className="button card__delete-btn" type="button" aria-label="Удалить."></button>
            <img onClick={handleClick} className="card__img" src={props.cardData.link} />
            <div className="card__description">
                <h2 className="card__title">{props.cardData.name}</h2>
                <div className="card__like">
                    <button className="button card__like-btn" type="button" aria-label="Нравится."></button>
                    <p className="card__likes">{props.cardData.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;