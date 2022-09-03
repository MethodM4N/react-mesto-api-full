function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit }) {
   return (
      <div className={`popup ${isOpen ? 'popup_open' : ''}`} onClick={onClose}>
         <div className="popup__container">
            <button className="popup__close-button" type="button" onClick={onClose}></button>
            <h2 className="popup__title">{title}</h2>
            <form className="popup__form" name={name} onSubmit={onSubmit}>
               {children}
               <button className="popup__save-button" type="submit"
                  aria-label={buttonText}>{buttonText}</button>
            </form>
         </div>
      </div>
   )
}

export default PopupWithForm;