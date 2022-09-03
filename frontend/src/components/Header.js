import { Link, Route, Switch } from 'react-router-dom';

function Header({ email, quit }) {
   return (
      <header className="header">
         <div className="header__logo"></div>
         <div className="header__auth">
            <Switch>
               <Route path="/sign-in">
                  <Link className="header__link" to="/sign-up">Регистрация</Link>
               </Route>
               <Route path="/sign-up">
                  <Link className="header__link" to="/sign-in">Войти</Link>
               </Route>
               <Route path="/">
                  <p className="header__email"> {email.email}&#8194;|&#8194;</p>
                  <Link className="header__link" to="/sign-in" onClick={quit}>Выйти</Link>
               </Route>
            </Switch>
         </div>
      </header >
   )
}

export default Header;