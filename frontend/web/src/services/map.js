import request from '../utils/request';

export function init() {
	return request('/api/map');
}