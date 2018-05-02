import { FETCH_STATUS, FETCH_LOGIN, UPDATE_ACCOUNT, INIT_APP, FETCH_REGISTER, UPDATE_PHOTO,FETCH_UPLOAD } from "../actions/actionTypes";
import { reduxForm, reset, startSubmit, stopSubmit, untouch, blur, change, setSubmitFailed, setSubmitSucceeded } from 'redux-form';
import Toast from "react-native-simple-toast";
import DialogProgress from 'react-native-dialog-progress';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

//import { errorMessage, message } from '../components/SnackbarMessage';
//Saga effects
import { put, takeLatest, delay, call } from 'redux-saga/effects';
import { Api } from './Api';
import * as db from './db';


const ERROR_MSG = 'Error al comunicarse con el servidor, compruebe la conexión a internet';

/**
 * Fetch init app
 */
function* init() {
    try {
        const { image, ...account } = yield db.init();
        yield put({ type: UPDATE_ACCOUNT, data: (account) ? { image: (image) ? true : false, ...account } : undefined });
        // alert(`${JSON.stringify(account)}`)
    } catch (error) {
        alert(error + " init[0]")
    }
}
export function* watchInitDatabase() {
    yield takeLatest(INIT_APP, init)
}

/**
 *  Fetch request login
 * @param {Object} action 
 */
function* fetchLogin(action) {
    try {
        const options = {
            title: "Iniciando sesión",
            message: "Porfavor espere",
            isCancelable: false
        }
        yield DialogProgress.show(options)
        yield put(startSubmit('Login'))
        let result = yield Api.requestLoginFromApi(action.payload);
        if (result.error === false) yield db.updateAccount({ ...result.payload, login: true })
        const { image, ...payload_redux } = result.payload;
        yield put({ type: UPDATE_ACCOUNT, data: { ...payload_redux, image: (image && image.length > 0) ? true : false, login: !result.error } });
        if (!result.error) {
            yield put(setSubmitSucceeded('Login'))
        } else {
            yield put(setSubmitFailed('Login'))

        }
        yield put(stopSubmit('Login', result.payload))
        yield put(reset('Login'))
        yield DialogProgress.hide();
        yield Toast.show(result.message, Toast.LONG)
    } catch (error) {
        yield put(setSubmitFailed('Login'))
        yield put(stopSubmit('Login'))
        yield put(reset('Login'))
        yield DialogProgress.hide()
        //alert(error)
        yield Toast.show(ERROR_MSG, Toast.LONG)
    }
}

export function* watchFetchLogin() {
    yield takeLatest(FETCH_LOGIN, fetchLogin);
}
/**
 * Fetch register 
 */
function* fetchRegister(action) {
    try {
        const options = {
            title: "Registrando",
            message: "Porfavor espere",
            isCancelable: true
        }
        yield DialogProgress.show(options)
        yield put(startSubmit('Register'))
        const result = yield Api.requestRegisterFromApi({ ...action.payload, user_type: 'technician' }); //realiza el registro y por defecto crea una cuenta con tipo de usario tecnico
        if (!result.error) {
            yield put(setSubmitSucceeded('Register'))
        } else {
            yield put(setSubmitFailed('Register'))
        }
        yield put(reset('Register'))
        yield put(stopSubmit('Register', result.payload))
        /*    if (!result.error) yield Toast.show(result.message, Toast.LONG)
           else { */
        yield Alert.alert(
            'Registro',
            result.message,
            [
                {
                    text: 'Aceptar', onPress: () => console.log('clear')
                },
            ],
            { cancelable: true }
        )
        //}

        yield DialogProgress.hide()
    } catch (error) {
        //alert(error)
        yield put(reset('Register'))
        yield put(setSubmitFailed('Register'))
        yield DialogProgress.hide()
        yield Toast.show(ERROR_MSG, Toast.LONG)
    }
}

export function* watchFetchRegister() {
    yield takeLatest(FETCH_REGISTER, fetchRegister);
}


/**
 * Fetch update photo
 */

function* fetchUpdatePhoto(action) {
    try {
        const options = {
            title: "Subiendo imagen",
            message: "Porfavor espere...",
            isCancelable: true
        }
        // yield DialogProgress.show(options)
        const result = yield Api.requestUpdatePhotoFromApi(action.payload, action.profile);
        if (result !== null) {
            yield db.updateAccountImage(result)
            //const { image, ...payload_redux } = result.payload;
            //yield put({ type: UPDATE_ACCOUNT, data: { ...payload_redux, image: (image && image.length > 0) ? true : false} });
        }
        //    yield DialogProgress.hide()
    } catch (error) {
        // yield DialogProgress.hide()
        alert(JSON.stringify(error, null, 2))
    }
}


export function* watchFetchUpdatePhoto() {
    yield takeLatest(UPDATE_PHOTO, fetchUpdatePhoto);
}

/**
 * Upload function
 */
function* fetchUpload(action) {
    try {
        const response = Api.requestUploadFromApi(action.data);
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}

export function* watchFetchUpload(){
    yield takeLatest(FETCH_UPLOAD,fetchUpload);
}