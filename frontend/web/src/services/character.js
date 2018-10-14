import { get } from '../network/request';
import api from '../network/api';

export const loadCharacter = (id) => {
    return get(api.LOAD_CHARACTER, {
        params: {
            id
        }
    });
}