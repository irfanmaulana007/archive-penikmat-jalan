import _ from 'lodash'

const initialState = {
	selectedPhoto: [],
    isEdit: false,
    allowSetAsThumbnail: false,
    photos: []
}

export default function galleryReducer(state = initialState, action) {
	switch(action.type) {
		case "EDIT_PHOTO": 
			return {
                ...state,
				isEdit: true
			}

		case "CANCEL_EDIT_PHOTO": 
			return {
                ...state,
				selectedPhoto: [],
				isEdit: false
            }
            
        case "SELECT_PHOTO":
            if (_.includes(state.selectedPhoto, action.payload)) {
                _.remove(state.selectedPhoto, (e) => e === action.payload);
                return {
                    ...state,
                    selectedPhoto: state.selectedPhoto
                }
            } else {
                return {
                    ...state,
                    selectedPhoto: [...state.selectedPhoto, action.payload],
                }
            }

        case "ALLOW_SET_AS_THUMBNAIL":
            return {
                ...state,
                allowSetAsThumbnail: action.payload
            }

        case "SET_STATE_PHOTOS":
            return {
                ...state,
                photos: action.payload
            }
			
		default: return state;
	}
}