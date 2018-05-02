import {validation} from "../../../../utils";

const validate = values => {
    const errors = {};
    errors.username = !values.username
        ? 'Por favor ingrese el usuario'
        : !validation.isEmailAddress(values.username)
            ? (!validation.isNumber(values.username) | (validation.isNumber(values.username) && (values.username.length < 7 || values.username.length > 20))) ? 'El usuario no es válido' : undefined
            : undefined;
    errors.password = !values.password
        ? 'Por favor ingrese la contraseña'
        : values.password.length < 6
            ? 'La contraseña debe tener al menos 6 caracteres'
            : undefined;
    return errors;
} 

export default validate;
