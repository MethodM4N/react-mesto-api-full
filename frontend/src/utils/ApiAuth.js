class ApiAuth {
    constructor({ baseUrl }) {
        this._url = baseUrl;
    }

    signUp(data) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then((data) => {
                if (data.ok) {
                    return data.json();
                } else if (data.status === 400) {
                    return Promise.reject(`Некорректно заполнено одно из полей!`)
                } else {
                    return Promise.reject(`Ошибка: ${data.status}`)
                }
            })
    }

    signIn(data) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            credentials: 'include',  
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then((data) => {
                if (data.ok) {
                    return data.json();
                } else if (data.status === 400) {
                    return Promise.reject(`Не передано одно из полей!`)
                } else if (data.status === 401) {
                    return Promise.reject(`Пользователь с таким e-mail не найден!`)
                } else {
                    return Promise.reject(`Ошибка: ${data.status}`)
                }
            })
    }

    checkToken() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',  
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => {
                if (data.ok) {
                    return data.json();
                } else if (data.status === 400) {
                    return Promise.reject(`Токен не передан или передан не в том формате!`)
                } else if (data.status === 401) {
                    return Promise.reject(`Переданный токен некорректен!`)
                } else {
                    return Promise.reject(`Ошибка: ${data.status}`)
                }
            })
    }
}

export const apiAuth = new ApiAuth({
    baseUrl: 'http://localhost:3001'
})