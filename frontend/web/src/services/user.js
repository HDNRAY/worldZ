import { post } from '../network/request'
import api from '../network/api'

export const loginRequest = (params) => {
    return post(api.LOGIN_BY_USERNAME.path, { body: params });
}

export const registerRequest = (params) => {
    return post(api.REGISTER_BY_USERNAME.path, { body: params });
}
