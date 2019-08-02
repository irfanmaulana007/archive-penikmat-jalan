import axios from 'axios';
import { API_URL } from './config'
import _ from 'lodash'

// TEMP
var token = localStorage.getItem('token')

axios.defaults.baseURL = API_URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

const apiService = {
	get (resource) {
		return axios
			.get(resource)
            .catch((err) => {
                console.log('err: ', err);
                return false
            })
	},

	put (resource, params) {
		return axios
			.put(resource, params)
	},

	post (resource, params) {
		return axios
			.post(resource, params)
	},

	delete (resource) {
		return axios
			.delete(resource)
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

export const authService = {
    login (payload) {
        return apiService
            .post('login', payload)
    }
}