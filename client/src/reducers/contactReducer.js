import {
    CONTACT_LIST_REQUEST,
    CONTACT_LIST_SUCCESS,
    CONTACT_LIST_FAIL,

    CONTACT_CREATE_REQUEST,
    CONTACT_CREATE_SUCCESS,
    CONTACT_CREATE_FAIL,


} from '../constants/contactConstants';


export const contactCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_CREATE_REQUEST:
            return { loading: true }

        case CONTACT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case CONTACT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}