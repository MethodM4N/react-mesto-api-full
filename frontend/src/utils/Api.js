class Api {
   constructor(api) {
      this._link = api.link;
      this._token = api.token;
      console.log(this._token);
   };

   getUserInfo() {
      return fetch(`${this._link}/users/me`, {
         headers: this._token,
         credentials: 'include',
      })
         .then(this._getStatus);
   }

   getInitialCards() {
      return fetch(`${this._link}/cards`, {
         headers: this._token,
         credentials: 'include',
      })
         .then(this._getStatus);
   }

   updateUserInfo(profile) {
      return fetch(`${this._link}/users/me`, {
         method: 'PATCH',
         headers: this._token,
         credentials: 'include',
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
         headers: this._token,
         credentials: 'include',
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
         headers: this._token,
         credentials: 'include',
      })
         .then(this._getStatus);
   }

   changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
         method: `${!isLiked ? 'DELETE' : 'PUT'}`,
         credentials: 'include',  
         headers: {
            authorization: `Bearer ${this._token}`,
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
            authorization: `Bearer ${this._token}`,
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
   token: {
      'Content-Type': 'application/json',
  },
});