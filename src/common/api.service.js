import axios from 'axios';
import { API_URL } from './config'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const apiService = {
	get (resource) {
		return axios
            .get(API_URL + resource)
            .catch((err) => {
                console.log('err: ', err);
            })
	},

	put (resource, params) {
		return axios
			.put(API_URL + resource, params)
	},

	post (resource, params) {
		return axios
			.post(API_URL + resource, params)
	},

	delete (resource) {
		return axios
			.delete(API_URL + resource)
	}
}
export const galleryService = {
	get () {
		return apiService
			.get('gallery')
    },
    
	detail (id) {
		return apiService
			.get('gallery/' + id)
	}
}