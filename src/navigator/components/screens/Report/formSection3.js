import { normalize } from '../../../../utils/normalize';
import { validation } from '../../../../utils';

export default {
    //form: 'Section3',
    form: 'Report', // a unique identifier for this form
    //enableReinitialize: true, //Borra los campos cuando se llama la funcion reset
    touchOnChange: true, //Cambia el touched cuando se ejecuta el onChange
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    formSection: 'nominal_data', //sub seccion
    persistentSubmitErrors : true,
    //title: 'Crear cuenta nueva', //Titulo del formulario
    isNeedNetwork: false, //Indica que el formulario necesita conexión a internet [true || false]
    //  validate, //validacion del formulario
    /*     initialValues: {  //Valores iniciales
    }, */
    sections: [
        {
            // title: 'Condensandor',
            fields: [
                {
                    name: 'evaporator.brand',
                    label: 'Marca',
                    type: 'text',
                    validate: validation.required,
                    normalize: normalize.trim
                },
                {
                    name: 'evaporator.model',
                    label: 'Modelo',
                    type: 'text',
                    validate: validation.required,
                    normalize: normalize.trim
                },
                {
                    name: 'evaporator.number',
                    label: 'Número de evaporadores',
                    type: 'text',
                    keyboardType: 'numeric',
                    validate: validation.required,
                    normalize: normalize.trim
                }
            ],
        },
        {
            title : 'Motores',
            fields: [
                {
                    name: 'evaporator.motor.brand',
                    label: 'Marca',
                    type: 'text',
                    validate: validation.required,
                    normalize: normalize.trim
                },
                {
                    name: 'evaporator.motor.num_motors',
                    label: 'Número de motores',
                    type: 'text',
                    keyboardType: 'numeric',
                    validate: validation.required,
                    normalize: normalize.trim
                },
                {
                    name: 'evaporator.motor.model',
                    label: 'Modelo o capacidad',
                    type: 'text',
                    validate: validation.required,
                    normalize: normalize.trim
                },
                {
                    name: 'evaporator.motor.volt',
                    label: 'Voltaje [V]',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
            ],
        },
        {
            title: 'Trabajos realizados',
            fields: [
                {
                    name: 'evaporator.task1',
                    label: 'Des-incrustación química',
                    type: 'checkbox'
                },
                {
                    name: 'evaporator.task2',
                    label: 'Lavado de serpentín',
                    type: 'checkbox'
                },
                {
                    name: 'evaporator.task3',
                    label: 'Limpieza de álabes',
                    type: 'checkbox'
                },
                {
                    name: 'evaporator.task4',
                    label : 'Revisión de rodamientos',
                    type: 'checkbox'
                },
                {
                    name: 'evaporator.task5',
                    label: 'Revisión de correas y  poleas',
                    type: 'checkbox'
                },
                {
                    name: 'evaporator.task6',
                    label: 'Ajuste general de tornillos',
                    type: 'checkbox'
                },
                {
                    name: 'evaporator.task7',
                    label: 'Pintura bandeja condensado',
                    type: 'checkbox'
                },
                {
                    name: 'evaporator.task8',
                    label: 'Engrase de chumaceras',
                    type: 'checkbox'
                },
            ]
        },
        {
            title: 'Voltaje [VAC]',
            fields: [
                {
                    name: 'evaporator.volt12',
                    label: 'L1 - L2',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name: 'evaporator.volt13',
                    label: 'L1 - L3',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name: 'evaporator.volt23',
                    label: 'L2 - L3',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
            ]
        },
        {
            title: 'Amperaje defrost [A]',
            fields: [
                {
                    name: 'evaporator.A1',
                    label: 'A1',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name: 'evaporator.A2',
                    label: 'A2',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name: 'evaporator.A3',
                    label: 'A3',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
            ]
        },
        {
            title: 'Amperaje motores [A]',
            fields: [
                {
                    name: 'evaporator.motor.A1',
                    label: 'A1',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name: 'evaporator.motor.A2',
                    label: 'A2',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name: 'evaporator.motor.A3',
                    label: 'A3',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
            ]
        },
        {
            title : 'Temperatura',
            fields : [
                {
                    name : 'evaporator.temp1',
                    label : 'Temperatura de retorno',
                    type : 'text'
                },
                {
                    name : 'evaporator.temp2',
                    label : 'Temperatura rejilla sum',
                    type : 'text'
                },
                {
                    name : 'evaporator.temp3',
                    label : 'Temperatura ambiente',
                    type : 'text'
                },
                {
                    name : 'evaporator.temp4',
                    label : 'Temperatura del área',
                    type : 'text'
                }
            ]
        },
        {
            title : 'Unidad Condensadora',
            fields : [
                {
                    name: 'condesator_unit.brand',
                    label: 'Marca',
                    type: 'text',
                    validate: validation.required,
                    normalize: normalize.trim
                },
                {
                    name: 'condesator_unit.amp',
                    label: 'Amperaje LRA [A]',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name: 'condesator_unit.volt',
                    label: 'Voltaje [V]',
                    type: 'text',
                    validate: [validation.required, validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
            ]
        },
        {
            title : 'Condensadora CW',
            fields : [
                {
                    name : 'cw_condensator.pressure1',
                    label : 'Presión diferencial - DP [PSI]',
                    type: 'text',
                    validate: [ validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name : 'cw_condensator.pressure2',
                    label : 'Presión de entrada - Pin [PSI]',
                    type: 'text',
                    validate: [ validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name : 'cw_condensator.pressure3',
                    label : 'Presión de salida - Pout [PSI]',
                    type: 'text',
                    validate: [ validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name : 'cw_condensator.temp1',
                    label : 'Temperatura diferencial - DT [°C]',
                    type: 'text',
                    validate: [ validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name : 'cw_condensator.temp2',
                    label : 'Temperatura de entrada - Tin [°C]',
                    type: 'text',
                    validate: [ validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name : 'cw_condensator.temp3',
                    label : 'Temperatura de salida - Tout [°C]',
                    type: 'text',
                    validate: [ validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
            ]
        },
        {
            title : 'Medidas del equipo',
            fields : [
                {
                    name : 'equipment.long',
                    label : 'Largo [m]',
                    type: 'text',
                    validate: [ validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name : 'equipment.width',
                    label : 'Ancho [m]',
                    type: 'text',
                    validate: [ validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                },
                {
                    name : 'equipment.height',
                    label : 'Alto [m]',
                    type: 'text',
                    validate: [ validation.number],
                    normalize: normalize.trim,
                    keyboardType: 'numeric'
                }
            ]
        }
    ],/*  button: {
        label: 'CREAR INFORME'
    }, */
};