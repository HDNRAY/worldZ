import { apiRequest } from '../network/request';
import api from '../network/api';

export const loadCharacter = (id) => {
    return apiRequest(api.LOAD_CHARACTER, {
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

export const equipGear = (params) => {
    return apiRequest(api.EQUIP_GEAR, { body: params })
}

export const unequipGear = (params) => {
    return apiRequest(api.UNEQUIP_GEAR, { body: params })
}