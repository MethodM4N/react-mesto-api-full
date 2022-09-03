import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
   const avatarRef = React.useRef();

   function handleSubmit(event) {
      event.preventDefault();
      onUpdateAvatar({
         avatar: avatarRef.current.value
      });
   }

   return (
      <PopupWithForm isOpen={isOpen} title='Обновить аватар' buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} onClose={onClose} onSubmit={handleSubmit}>
         <input type="url" name="avatarLink" id="avatarLink" className="popup__input" placeholder="Ссылка на картинку" ref={avatarRef} required />
         <span className="popup__input-error avatarLink-error"></span>
      </PopupWithForm>
   )
}

export default EditAvatarPopup;