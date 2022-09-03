import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onSubmit, buttonText }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   function handleChangeEmail(e) {
      setEmail(e.target.value);
   }

   function handleChangePassword(e) {
      setPassword(e.target.value);
   }

   function handleSubmit(e) {
      e.preventDefault();
      onSubmit({
         email,
         password
      })
   }

   return (
      <form className="auth" onSubmit={handleSubmit}>
         <h2 className="auth__title">Регистрация</h2>
         <input className="auth__input" placeholder="Почта" onChange={handleChangeEmail} value={email || ''} />
         <input className="auth__input" placeholder="Пароль" onChange={handleChangePassword} value={password || ''} />
         <button className="auth__button">{buttonText ? 'Подождите...' : 'Зарегистрироваться'}</button>
         <p className="auth__caption">Уже зарегистрированы?
            <Link className="auth__caption-link" to="/sign-in" >&#8194; Войти</Link>
         </p>
      </form>
   )
}

export default Register;