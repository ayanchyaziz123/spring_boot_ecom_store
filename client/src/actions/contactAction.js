import axios from 'axios';
import{
    CONTACT_LIST_REQUEST,
    CONTACT_LIST_SUCCESS,
    CONTACT_LIST_FAIL,

    CONTACT_CREATE_REQUEST,
    CONTACT_CREATE_SUCCESS,
    CONTACT_CREATE_FAIL,

} from '../constants/contactConstants';

export const createContact = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/contact/create/`,
            {},
            config
        )
        dispatch({
            type: CONTACT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CONTACT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

