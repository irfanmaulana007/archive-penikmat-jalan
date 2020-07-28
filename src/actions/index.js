export const handleInput = (name, value) => {
	return {
		type: "HANDLE_INPUT_CHANGE",
		payload: { [name]: value }
	}
}

export const errorHandler = (value) => {
	return {
		type: "ERROR_HANDLER",
		payload: value
	}
}

export const startLoading = (message) => {
	return {
		type: "START_LOADING",
		payload: message
	}
}
export const stopLoading = () => {
	return {
		type: "STOP_LOADING"
	}
}

export const editPhoto = () => {
	return {
		type: "EDIT_PHOTO"
	}
}
export const cancelEditPhoto = () => {
	return {
		type: "CANCEL_EDIT_PHOTO"
	}
}
export const selectPhoto = (image) => {
	return {
		type: "SELECT_PHOTO",
		payload: image
	}
}
export const allowSetAsThumbnail = (bool) => {
	return {
		type: "ALLOW_SET_AS_THUMBNAIL",
		payload: bool
	}
}
export const setStatePhotos = (images) => {
	return {
		type: "SET_STATE_PHOTOS",
		payload: images
	}
}