import request from '../network/request';

export function character(id){
    return request('/api/character/:id',id);
}