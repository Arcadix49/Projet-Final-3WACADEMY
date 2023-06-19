const findToken = () => {
    const token = localStorage.getItem("token")
    if (token) {
        return token;
    } else {
        return ""
    }
}



export async function get(url, config = {}) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${findToken()}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((err) => reject(err))
            })
            .catch(error => reject(error))
    })
}

export async function post(url, data, config = {}) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${findToken()}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((err) => reject(err))
            })
            .catch(error => reject(error))
    })
}

export async function remove(url, config = {}) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${findToken()}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    resolve()
                } else {
                    reject(response.statusText)
                }
            })
            .catch(error => reject(error))
    })
}

export async function put(url, data, config = {}) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${findToken()}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((err) => reject(err))
            })
            .catch(error => reject(error))
    })
}