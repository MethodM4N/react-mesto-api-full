import done from "../images/Union-Done.svg"
import fail from "../images/Union-Fail.svg"

function InfoTooltip({ isOpen, error, onClose }) {
    return (
        <div className={`popup ${isOpen ? ' popup_open' : ''}`} onClick={onClose}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <img className="popup__icon" alt="Изображение статуса" src={error ? fail : done} />
                <p className="popup__auth-title">{error ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}</p>
            </div>
        </div>
    )
}

export default InfoTooltip;
