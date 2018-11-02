import { get, apiRequest } from '../network/request';
import api from '../network/api';

export const loadCharacter = (id) => {
    return get(api.LOAD_CHARACTER.url, {
        params: {
            id
        }
    });
}

export const createCharacter = (params) => {
    console.log(params)
    return apiRequest(api.CREATE_CHARACTER, { body: params })
}