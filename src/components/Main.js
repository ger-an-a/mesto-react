import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
    const [userName, setUserName] = React.useState('Имя');
    const [userDescription, setUserDescription] = React.useState('Деятельность');
    const [userAvatar, setUserAvatar] = React.useState('https://clck.ru/g9tef');
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        Promise.all([api.getInitialCards(), api.getInitialInfo()])
            .then(([cardsData, userData]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [])
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <button className="profile__avatar-btn" onClick={props.onEditAvatar} type="button" aria-label=""></button>
                    <img className="profile__avatar" src={userAvatar} alt="Фото профиля." />
                    <h1 className="profile__title">{userName}</h1>
                    <p className="profile__subtitle">{userDescription}</p>
                    <button className="button profile__edit-btn" onClick={props.onEditProfile} type="button" aria-label="Редактировать."></button>
                </div>
                <button className="button profile__add-btn" onClick={props.onAddPlace} type="button" aria-label="Добавить."></button>
            </section>
            <section className="cards">
                <ul className="cards__grid">
                    {
                        cards.map((item) => {
                            return (
                                <Card key={item._id} cardData={item} onCardClick={props.onCardClick} />
                            )
                        })
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;


