export default {
    LOGIN_BY_USERNAME: {
        path: '/auth/login/username', method: 'POST'
    },
    REGISTER_BY_USERNAME: {
        path: '/auth/register/username', method: 'POST'
    },
    LOAD_CHARACTER: {
        path: '/character/:id', method: 'GET'
    },
    LOAD_ALL_CHARACTERS: {
        path: '/user/characters', method: 'GET'
    },
    CREATE_CHARACTER: {
        path: '/character/create', method: 'PUT'
    }
}