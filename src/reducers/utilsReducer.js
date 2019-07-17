const initialState = {
	loaders: "invisible",
	message: ""
}

export default function utilsReducer(state = initialState, action) {
	switch(action.type) {
		case "START_LOADING": 
			return {
				loaders: "visible",
				message: action.payload
			}

		case "STOP_LOADING": 
			return {
				loaders: "invisible",
				message: ""
			}
			
		default: return state;
	}
}