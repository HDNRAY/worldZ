import request from '../utils/request';

export function character(id){
    return request('/api/character/:id',id);
}