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