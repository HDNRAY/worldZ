import { get, apiRequest } from '../network/request';
import api from '../network/api';

export const loadCharacter = (id) => {
    return get(api.LOAD_CHARACTER.path, {
        params: {
            id
        }
    });
}

export const loadAllCharacters = () => {
    return apiRequest(api.LOAD_ALL_CHARACTERS)
}

export const createCharacter = (params) => {
    console.log(params)
    return apiRequest(api.CREATE_CHARACTER, { body: params })
}