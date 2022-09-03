import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
   const [name, setName] = useState('');
   const [link, setLink] = useState('');

   function handleSubmit(event) {
      event.preventDefault();
      onAddPlace({
         name,
         link
      })
   }

   function handleChangeName(event) {
      setName(event.target.value);
   }

   function handleChangeLink(event) {
      setLink(event.target.value);
   }

   useEffect(() => {
      setName('')
      setLink('')
   }, [isOpen]);

   return (
      <PopupWithForm isOpen={isOpen} title='Новое место' buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} onClose={onClose} onSubmit={handleSubmit}>
         <input type="text" id="elementDescription" name="elementDescription" className="popup__input" placeholder="Название" minLength="2"
            maxLength="40" onChange={handleChangeName} value={name || ''} required />
         <span className="popup__input-error elementDescription-error"></span>
         <input type="url" name="link" id="elementLink" className="popup__input" placeholder="Ссылка на картинку" onChange={handleChangeLink} value={link || ''} required />
         <span className="popup__input-error elementLink-error"></span>
      </PopupWithForm>
   )
}

export default AddPlacePopup;