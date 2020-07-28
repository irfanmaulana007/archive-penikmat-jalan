import { combineReducers } from 'redux'
import utilsReducer from './utilsReducer'
import galleryReducer from './galleryReducer'

const rootReducer = combineReducers({
    
    utils: utilsReducer,
    gallery: galleryReducer,
  
})


export default rootReducer;