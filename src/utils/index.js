import Toast from "react-native-simple-toast";
import { Alert } from 'react-native';
import { updateAccountAction, logoutAction } from '../actions';
import realm, { ACCOUNT_SCHEMA, logout } from "../config/database";

/**
 * Cierra sesión
 */
export const closeSession = (onCloseSession) => {
    Alert.alert('Cerrar sesión',
        'Esta seguro que desea cerrar sesión? Soló podrá volver a iniciar sesión con conexión a internet',
        [
            { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
                text: 'Cerrar sesión', onPress: () => {
                    if (realm.objectForPrimaryKey(ACCOUNT_SCHEMA, 0).login) {
                        logout().then(() => {
                            Toast.show('Sesión finalizada', Toast.SHORT);
                            if (onCloseSession) onCloseSession()
                        })
                    } else {
                        Toast.show('Porfavor inicie sesión', Toast.SHORT);
                    }
                }
            },
        ],
        { cancelable: true })

}
/**
* Options image picker
*/
export const optionsImagePicker = {
    title: 'Seleccionar imagen',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Tomar foto',
    chooseFromLibraryButtonTitle: 'Escoger de la galeria',
    quality: 0.5,
    storageOptions: {
        cameraRoll: true,
        skipBackup: true,
        waitUntilSaved: true,
        path: 'images'
    }
};

/**
 * Permite hacer una busqueda en un objecto
 */
export function grab( val, names ) {
    names = names.split( '.' );    
    while ( val && names.length ) { val = val[ names.shift() ]; }    
    return val;
}

export { normalize } from './normalize'
export { validation } from './validation'
export const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t))