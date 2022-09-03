import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
   const currentUser = React.useContext(CurrentUserContext);

   return (
      <main>
         <section className="profile">
            <div className="profile__info">
               <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
               <div className="profile__overlay-button" onClick={onEditAvatar}></div>
               <div className="profile__info-blocks">
                  <div className="profile__info-block">
                     <h1 className="profile__name">{currentUser.name}</h1>
                     <button className="profile__button-edit" type="button" aria-label="редактировать профиль" onClick={onEditProfile}></button>
                  </div>
                  <p className="profile__description">{currentUser.about}</p>
               </div>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
         </section>
         <section className="elements">
            {cards.map((card) => (<Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
         </section>
      </main>
   )
}

export default Main;