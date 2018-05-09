import request from '../utils/request';

export function initMap() {
	return request('/api/map');
}