import { FETCH_LOGIN, UPDATE_ACCOUNT, FETCH_STATUS, LOGOUT } from "../actions/actionTypes";

const accountReducer = (state = {
    id: 0,
    name: "",
    last_name: "",
    email: "",
    id_number: "",
    cellphone_number: "",
    user_type: "",
    api_key: "",
    company: "",
    image: "",
    status: 1,
    created_at: "",
    version: 1,
    login: false
}, action) => {
    switch (action.type) {
        case UPDATE_ACCOUNT:
            return {
                ...state,
                data: action.data
            }
        case FETCH_STATUS:
            return {
                ...state,
                isFetching: action.isFetching,
                request: action.request
            }
        case LOGOUT:
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}

export default accountReducer;