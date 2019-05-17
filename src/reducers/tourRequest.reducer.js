import { GET_KITS } from '../constants/tourRequest.constants'

const INITIAL_STATE = {
    kitEnum: {}
}

export const tourRequestReducer = (state = INITIAL_STATE, action) => {
    switch (action) {
        case GET_KITS:
            return { ...state, kitEnum: action.payload }
        default:
            return state
    }
}