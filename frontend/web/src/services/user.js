import { apiRequest } from '../network/request'
import api from '../network/api'

export const userInfoRequest = () => {
    return apiRequest(api.GET_USER_INFO)
}

export const loginRequest = (params) => {
    return apiRequest(api.LOGIN_BY_USERNAME, { body: params });
}

export const registerRequest = (params) => {
    return apiRequest(api.REGISTER_BY_USERNAME, { body: params });
}
