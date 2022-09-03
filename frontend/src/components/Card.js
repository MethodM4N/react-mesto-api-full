import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
   const currentUser = React.useContext(CurrentUserContext);

   function handleClick() {
      onCardClick(card);
   }

   function handleLike() {
      onCardLike(card);
   }

   function handleDelete() {
      onCardDelete(card);
   }

   // Определяем, являемся ли мы владельцем текущей карточки
   const isOwn = card.owner._id === currentUser._id;

   // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
   const isLiked = card.likes.some(i => i._id === currentUser._id);

   // Создаём переменную, которую после зададим в `className` для кнопки лайка
   const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : ''}`);

   return (
      <div className="element">
         <img src={card.link} className="element__photo" alt={card.name} onClick={handleClick} />
         {isOwn && <button className="element__delete-button" type="button" aria-label="Удалить" onClick={handleDelete}></button>}
         <div className="element__description">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like-container">
               <button className={cardLikeButtonClassName} onClick={handleLike} type="button" aria-label="поставить лайк"></button>
               <p className="element__like-value">{card.likes.length}</p>
            </div>
         </div>
      </div>
   )
}

export default Card;