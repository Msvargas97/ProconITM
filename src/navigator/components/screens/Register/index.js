import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import Form from '../../../../components/Form';
import validate from './validate'
import { normalize } from '../../../../utils/normalize';
import { fetchRegisterAction } from '../../../../actions';

const formConfig = {
    form: 'Register', // a unique identifier for this form
    enableReinitialize: true, //Borra los campos cuando se llama la funcion reset
    touchOnChange: true, //Cambia el touched cuando se ejecuta el onChange
    //title: 'Crear cuenta nueva', //Titulo del formulario
    sections: [
        {
            title: 'Información personal',
            fields: [
                {
                    name: 'name',
                    label: 'Nombre',
                    type: 'text',
                    leftIcon: 'account-circle',
                    help: '~Primer nombre',
                    normalize: normalize.trim
                },
                {
                    name: 'last_name',
                    label: 'Apellido',
                    type: 'text',
                    leftIcon: 'rename-box',
                    help: '~Primer apellido',
                    normalize: normalize.trim
                },
                {
                    name: 'id_number',
                    label: 'Número de documento',
                    type: 'text',
                    suffix: 'C.C',
                    leftIcon: 'account-card-details',
                    keyboardType: 'numeric',
                    autoCorrect: false,
                    maxLength: 13,
                    normalize: normalize.numberWithDots
                },
                /*                 {
                                    name: 'age',
                                    label: 'Edad',
                                    keyboardType: 'numeric',
                                    help: '(Opcional)',
                                    autoCorrect: false,
                                    leftIcon: 'sort-numeric'
                                }, */
            ],
        },
        {
            title: 'Información de contacto',
            fields: [
                {
                    name: 'email',
                    label: 'Correo electrónico',
                    type: 'text',
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                    leftIcon: 'at',
                },
                {
                    name: 'cellphone_number',
                    label: 'Número de celular',
                    type: 'text',
                    prefix: '+57 ',
                    keyboardType: 'phone-pad',
                    leftIcon: 'cellphone',
                    maxLength: 12,
                    normalize: normalize.phone
                },
                /*                 {
                                    name: 'address',
                                    label: 'Dirección',
                                    type: 'text',
                                    help: '(Opcional)',
                                    leftIcon: 'map-marker'
                                }, */

            ],
        },

        {
            title: 'Información de la cuenta',
            fields: [
                /*     {
                        name: 'company',
                        label: 'Nombre de la empresa',
                        autoCapitalize: 'words',
                        type: 'text',
                        leftIcon: 'domain',
                        autoCorrect: false,
                        normalize: normalize.trim
                    },
                    {
                        name: 'user_type',
                        label: 'Tipo de cuenta',
                        type: 'text',
                        leftIcon: 'account-settings-variant',
                    }, */
                {
                    name: "password",
                    label: 'Contraseña',
                    type: 'password',
                    help: '~Mínimo 6 caracteres',
                    characterRestriction: 32,
                    maxLength: 32,
                    normalize: normalize.trim
                },
                {
                    name: "repassword",
                    label: 'Confirmar contraseña',
                    type: 'password',
                    characterRestriction: 32,
                    maxLength: 32,
                    normalize: normalize.trim
                },
                {
                    name: 'registerkey',
                    label: 'Clave de autorización',
                    type: 'text',
                    leftIcon: 'account-key',
                    secureTextEntry: true,
                    help: '~Código de autorización de registro',
                    characterRestriction: 32,
                    maxLength: 32,
                    normalize: normalize.trim
                }
            ],
        },
    ],
    button: {
        label: 'REGISTRAR',
        onSubmit: (values, dispatch, props) => {
            dispatch(fetchRegisterAction(values))
        },
        icon : {
            name : 'account-plus'
        }
    },
    isNeedNetwork: true, //Indica que el formulario necesita conexión a internet 
/*     initialValues: {  //Test - register
        name: 'Michael',
        last_name: 'Vargas',
        email: 'msvargas97@gmail.com',
        cellphone_number: '319-329-4127',
        id_number: '1.098.795.589',
        companny: 'Procontroles',
        password: '123456',
        repassword: '123456',
        registerkey: 'Procon201'
    }, */
    validate
    //formSection : 'formreg'
}

export const Register = Form(formConfig)
