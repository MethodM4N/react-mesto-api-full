class Api {
   constructor(link, token) {
      this._link = link;
      this._token = token;
   };

   getUserInfo() {
      return fetch(`${this._link}/users/me`, {
         headers: {
            authorization: this._token,
            'Content-type': 'application/json',
         },
         credentials: 'include',  
      })
         .then(this._getStatus);
   }

   getInitialCards() {
      return fetch(`${this._link}/cards`, {
         headers: {
            authorization: this._token,
            'Content-type': 'application/json',
         },
         credentials: 'include',  
      })
         .then(this._getStatus);
   }

   updateUserInfo(profile) {
      return fetch(`${this._link}/users/me`, {
         method: 'PATCH',
         credentials: 'include',  
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: profile.name,
            about: profile.about
         })
      })
         .then(this._getStatus);
   }

   addNewCard(card) {
      return fetch(`${this._link}/cards`, {
         method: 'POST',
         credentials: 'include',  
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: card.name,
            link: card.link
         })
      })
         .then(this._getStatus);
   }

   deleteCard(cardId) {
      return fetch(`${this._link}/cards/${cardId}`, {
         method: 'DELETE',
         credentials: 'include',  
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         }
      })
         .then(this._getStatus);
   }

   changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._link}/cards/likes/${cardId}`, {
         method: `${!isLiked ? 'DELETE' : 'PUT'}`,
         credentials: 'include',  
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         }
      })
         .then(this._getStatus);
   }

   updateAvatar(avatar) {
      return fetch(`${this._link}/users/me/avatar`, {
         method: 'PATCH',
         credentials: 'include',  
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(avatar)
      })
         .then(this._getStatus);
   }

   _getStatus(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
   }
}

export const api = new Api({
   link: 'http://localhost:3001',
   token:
      localStorage.getItem('token'),
});