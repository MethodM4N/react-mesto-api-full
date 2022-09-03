import { useState } from "react";

function Login({ onSubmit, buttonText }) {
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
         <h2 className="auth__title">Вход</h2>
         <input className="auth__input" placeholder="Почта" onChange={handleChangeEmail} value={email || ''} />
         <input className="auth__input" placeholder="Пароль" onChange={handleChangePassword} value={password || ''} />
         <button className="auth__button">{buttonText ? 'Подождите...' : 'Войти'}</button>
      </form>
   )
}

export default Login;