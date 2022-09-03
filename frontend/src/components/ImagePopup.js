function ImagePopup({ isOpen, card, onClose }) {
   return (
      <div className={`popup popup_type_image ${isOpen ? 'popup_open' : ''}`} onClick={onClose}>
         <div className="popup__image-container">
            <button className="popup__close-button popup__close-button_image" type="button" aria-label="закрыть" onClick={onClose}></button>
            <img className="popup__image" src={card.link} alt={card.name} />
            <p className="popup__image-caption">{card.name}</p>
         </div>
      </div>
   )
}

export default ImagePopup;