import { MODAL_DIALOG, SHOW_DIALOG, DISMISS_DIALOG } from "../actions/actionTypes";


const dialogReducer = (state = {
    open: false,
    backButtonClose: false,
    backdropPressToClose: false,
}, action) => {

    let { type, data } = action;
    if (data) {
        if (!data.backButtonClose) data.backButtonClose = true
        if (!data.backdropPressToClose) data.backdropPressToClose = true
    }
    
    switch (type) {
        case MODAL_DIALOG:
            return {
                ...data
            }
        case SHOW_DIALOG:
            return {
                open: true,
                ...data
            }
        case DISMISS_DIALOG:
            return {
                open: false
            }
        default:
            return state;
    }
}

export default dialogReducer;