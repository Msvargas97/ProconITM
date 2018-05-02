import { validation } from "../../../../utils";

/* const KEY_REGISTER = "Procon2018";
 */

const validate = values => {
    const errors = {};
    let phone = String(values.cellphone_number).replace(/[^\d]/g, '');
    let id = String(values.id_number).replace(/[^\d]/g, '');
    //console.log('onlynums',onlyNums);
    errors.name = !values.name
        ? '*Por favor ingrese su primer nombre' :
        !validation.isAlphabet(values.name) ? 'Por favor ingrese un nombre valido' : undefined
    errors.last_name = !values.last_name
        ? '*Por favor ingrese su primer apellido' :
        !validation.isAlphabet(values.last_name) ? 'Por favor ingrese un nombre valido' : undefined
    errors.email = !values.email ?
        '*Por favor ingrese un correo electrónico' :
        !validation.isEmailAddress(values.email) ? 'Correo electrónico no válido' : undefined;

    errors.id_number = !id ?
        '*Por favor ingrese su número de C.C' : !validation.isNumber(id) || id.length < 7 ? 'No de documento no válido' : undefined;
    errors.cellphone_number = !phone ?
        '*Por favor ingrese su número de celular' : (!validation.isNumber(phone) || phone.length < 10) ? 'Número de celular no válido' : undefined;

    errors.password = !values.password
        ? '*Por favor ingrese la contraseña'
        : values.password.length < 6
            ? 'La contraseña debe tener al menos 6 caracteres'
            : undefined;
    errors.repassword = !values.repassword ? '*Por favor confirme la contraseña' :
        !validation.isSame(values.password, values.repassword) ? 'Las contraseñas no coinciden' : undefined;
    errors.registerkey = !values.registerkey ? '*Por favor ingrese la clave de autorización' : /* !validation.isSame(KEY_REGISTER, values.registerkey) ? 'Clave incorrecta' :  */undefined;
    errors.company = !values.company ? '*Porfavor ingrese la empresa' : !validation.isAlphabet(values.company) ? 'Nombre incorrecto' : undefined;
    return errors;
}

export default validate;