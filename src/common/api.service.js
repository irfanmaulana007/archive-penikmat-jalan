import axios from 'axios';
import { API_URL } from './config'

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
	
	getById (id) {
		return apiService
			.get('gallery/category/' + id)
    },
    
	detail (id) {
		return apiService
			.get('gallery/' + id)
	},
    
	create (payload) {
		return apiService
			.post('gallery/', payload)
	},
    
	update (id, payload) {
		return apiService
			.put('gallery/' + id, payload)
	},
    
	updateThumbnail (id, payload) {
		return apiService
			.put('gallery/update-thumbnail/' + id, payload)
	}
}

export const galleryDetailService = {
	getByGalleryID (id) {
		return apiService
			.get('gallery/detail/' + id)
	},

	create (id, payload) {
		return apiService
			.post('gallery/detail/' + id, payload)
	},

	delete (payload) {
		return apiService
			.post('gallery/detail/', payload)
	}
}

export const categoryService = {
	get () {
		return apiService
			.get('category')
    },

	getById (id) {
		return apiService
			.get('category/' + id, )
	},

	create (payload) {
		return apiService
			.post('category', payload)
	},

	update (id, payload) {
		return apiService
			.put('category/' + id, payload)
	},

	delete (id) {
		return apiService
			.delete('category/' + id)
	}
}

export const culinaryService = {
	get () {
		return apiService
			.get('culinary')
    },
    
	detail (id) {
		return apiService
			.get('culinary/' + id)
	},

	getByBucketListId (id) {
		return apiService
			.get('culinary/bucket-list/' + id, )
	},

	create (payload) {
		return apiService
			.post('culinary', payload)
	},

	update (id, payload) {
		return apiService
			.put('culinary/' + id, payload)
	},

	delete (id) {
		return apiService
			.delete('culinary/' + id)
	}
}

export const bucketListService = {
	get () {
		return apiService
			.get('bucket-list')
    },
    
	detail (id) {
		return apiService
			.get('bucket-list/' + id)
	},

	create (payload) {
		return apiService
			.post('bucket-list/', payload)
	},
}

export const bucketListDetailService = {
	getByBucketListID (id) {
		return apiService
			.get('bucket-list/' + id + '/detail')
	},

	getByID (id) {
		return apiService
			.get('bucket-list-detail/' + id)
	},

	create (payload) {
		return apiService
			.post('bucket-list-detail/', payload)
	},

	update (id, payload) {
		return apiService
			.put('bucket-list-detail/' + id, payload)
	},

	delete (id) {
		return apiService
			.delete('bucket-list-detail/' + id)
	}
}

export const authService = {
    login (payload) {
        return apiService
            .post('login', payload)
    }
}