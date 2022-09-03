import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
   const currentUser = React.useContext(CurrentUserContext);
   const [name, setName] = useState(currentUser.name);
   const [description, setDescription] = useState(currentUser.about);

   function handleChangeName(event) {
      setName(event.target.value);
   }

   function handleChangeDescription(event) {
      setDescription(event.target.value);
   }

   React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
   }, [currentUser, isOpen]);


   function handleSubmit(event) {
      event.preventDefault();
      onUpdateUser({
         name,
         about: description,
      });
   }

   return (
      <PopupWithForm isOpen={isOpen} title='Редактировать профиль' buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} onClose={onClose} onSubmit={handleSubmit}>
         <input type="text" name="profileName" id="popupName" className="popup__input" placeholder="Моё имя" minLength='2'
            maxLength='40' onChange={handleChangeName} value={name || ''} required />
         <span className="popup__input-error popupName-error"></span>
         <input type="text" name="profileDescription" id="popupDescription" className="popup__input"
            placeholder="Немного о себе" minLength='2' maxLength='200' onChange={handleChangeDescription}
            value={description || ''} required />
         <span className="popup__input-error popupDescription-error"></span>
      </PopupWithForm>
   )
}

export default EditProfilePopup;