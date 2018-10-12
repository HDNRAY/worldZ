

export const registerAction = (username, password) => {
    return {
        type: 'user/login',
        payload: {
            username,
            password
        }
    }
}

export const loginAction = (username, password) => {
    return {
        type: 'user/login',
        payload: {
            username,
            password
        }
    }
}