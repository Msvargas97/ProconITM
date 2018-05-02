import {
    FETCH_LOGIN,
    UPDATE_ACCOUNT,
    FETCH_STATUS,
    INIT_APP,
    LOGOUT,
    FETCH_REGISTER,
    UPDATE_PHOTO,
    FETCH_UPLOAD,
    MODAL_DIALOG,
    SHOW_DIALOG,
    DISMISS_DIALOG
} from "./actionTypes";

export const initAction = () => ({
    type: INIT_APP
})

export const logoutAction = () => ({
    type: LOGOUT,
    data: { login: false }
})

//###################### ACTIONS SETTING,LOGIN AND REGISTER ##########################
export const fetchLoginAction = (payload) => {
    return {
        type: FETCH_LOGIN,
        payload
    }
}

export const fetchRegisterAction = (payload) => ({
    type: FETCH_REGISTER,
    payload
})

export const updateAccountAction = (data) => ({
    type: UPDATE_ACCOUNT,
    data
})

/**
 *######################### Update and send image################################
 */
export const updateProfilePhoto = (payload) => ({
    type: UPDATE_PHOTO,
    profile: (payload.profile) ? true : false,
    payload
})

export const fetchUploadAction = (data) => ({
    type: FETCH_UPLOAD,
    data
})

export const dialogAction = (data) => ({
    type: MODAL_DIALOG,
    data: data
})

export const showDialog = (data) => ({
    type: SHOW_DIALOG,
    data
})

export const dismissDialog = () => ({
    type: DISMISS_DIALOG,
    open : false
})