import { normalize } from '../../../../utils/normalize';
import { validation } from '../../../../utils';

export default {
    //form: 'Section2',
    form: 'Report', // a unique identifier for this form
    //enableReinitialize: true, //Borra los campos cuando se llama la funcion reset
    touchOnChange: true, //Cambia el touched cuando se ejecuta el onChange
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    formSection: 'nominal_data', //sub seccion
    persistentSubmitErrors: true,
    //title: 'Crear cuenta nueva', //Titulo del formulario
    isNeedNetwork: false, //Indica que el formulario necesita conexión a internet [true || false]
    //  validate, //validacion del formulario
    /*     initialValues: {  //Valores iniciales
    }, */
    sections: [
        {
            //title: 'Condensandor',
            fields: [
                {
                    name: 'capacitor.model',
                    label: 'Modelo',
                    type: 'text',
                    //validate: validation.required,
                    normalize: normalize.trim
                },
            ],
        },
        {
            title: 'Compresores',
            subtitle: 'Compresor No {n}',
            formSection: 'capacitor.compressor',
            dialogForm: true,
            multiple: true,
            htm: '',
            maxItems: 5,
            minItems: 1,
            button: {
                label: 'AÑADIR COMPRESOR',
                position: 'bottom'
            },
            sections: [
                {
                    fields: [
                        {
                            name: 'brand',
                            label: 'Marca',
                            type: 'text',
                            validate: validation.required,
                            normalize: normalize.trim
                        },
                        {
                            name: 'refrigerant',
                            label: 'Refrigerante',
                            type: 'text',
                            normalize: normalize.trim
                        },
                        {
                            name: 'model',
                            label: 'Modelo',
                            type: 'text',
                            normalize: normalize.trim
                        },
                        {
                            name: 'amp',
                            label: 'Amperaje LRA [A]',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'volt',
                            label: 'Voltaje [V]',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                    ]
                },
                {
                    title: 'Voltaje [VAC]',
                    fields: [
                        {
                            name: 'volt12',
                            label: 'L1 - L2',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'volt13',
                            label: 'L1 - L3',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'volt23',
                            label: 'L2 - L3',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                    ]
                },
                {
                    title: 'Amperaje [A]',
                    fields: [
                        {
                            name: 'amp1',
                            label: 'A1',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'amp2',
                            label: 'A2',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'amp3',
                            label: 'A3',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                    ]
                },
                {
                    title: 'Presión de alta',
                    fields: [
                        {
                            name: 'highpressure',
                            label: 'PSI',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'hightemp',
                            label: 'Temperatura [ºC]',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                    ]
                },
                {
                    title: 'Presión de baja',
                    fields: [
                        {
                            name: 'lowpressure',
                            label: 'PSI',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'lowtemp',
                            label: 'Temperatura [ºC]',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                    ],
                }
            ]
        },
        {
            title: ' Moto-ventiladores',
            subtitle: ' Moto-ventilador No {n}',
            formSection: 'capacitor.fanmotor',
            dialogForm: true,
            multiple: true,
            maxItems: 5,
            minItems: 1,
            button: {
                label: 'AÑADIR MOTO-VENTILADOR',
                position: 'bottom',
                backgroundColor: 'darkorange'
            },
            sections: [
                {
                    title: 'Datos nominales',
                    fields: [
                        {
                            name: 'brand',
                            label: 'Marca',
                            type: 'text',
                            //   validate: validation.required,
                            normalize: normalize.trim
                        },
                        {
                            name: 'model',
                            label: 'Modelo',
                            type: 'text',
                            normalize: normalize.trim
                        },
                        {
                            name: 'amp',
                            label: 'Amperaje RLA [A]',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'volt',
                            label: 'Voltaje [V]',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                    ],
                },
                {
                    title: 'Voltaje [VAC]',
                    fields: [
                        {
                            name: 'volt12',
                            label: 'L1 - L2',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'volt13',
                            label: 'L1 - L3',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'volt23',
                            label: 'L2 - L3',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                    ]
                },
                {
                    title: 'Amperaje [A]',
                    fields: [
                        {
                            name: 'A1',
                            label: 'A1',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'A2',
                            label: 'A2',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                        {
                            name: 'A3',
                            label: 'A3',
                            type: 'text',
                            validate: [validation.number],
                            normalize: normalize.trim,
                            keyboardType: 'numeric'
                        },
                    ]
                },
            ]
        },
        {
            title: 'Trabajos realizados',
            fields: [
                {
                    name: 'capacitor.task1',
                    label: 'Des-incrustación química',
                    type: 'checkbox'
                },
                {
                    name: 'capacitor.task2',
                    label: 'Lavado de serpentín',
                    type: 'checkbox'
                },
                {
                    name: 'capacitor.task3',
                    label: 'Limpieza de álabes',
                    type: 'checkbox'
                },
                {
                    name: 'capacitor.task4',
                    label: 'Limpieza y ajuste de sistema eléctrico',
                    type: 'checkbox'
                },
                {
                    name: 'capacitor.task5',
                    label: 'Revisión de circuitos eléctricos',
                    type: 'checkbox'
                },
                {
                    name: 'capacitor.task6',
                    label: 'Ajuste general de tornillos',
                    type: 'checkbox'
                },
            ]
        },
        {
            title: 'Nivel de aceite compresor',
            fields: [
                {
                    name: 'capacitor.task7',
                    label: 'Se encontró visor de aceite?',
                    type: 'radiobutton',
                    selectedIndex: 1,
                    data: [{
                        label: 'SI',
                        value: true
                    },
                    {
                        label: 'NO',
                        value: false
                    }
                    ]
                },
                {
                    name: 'capacitor.task8',
                    label: 'Nivel [%]:',
                    type: 'selector',
                    data: [
                        {
                            label: '-'
                        },
                        {
                            label: '25%',
                        },
                        {
                            label: '50%',
                        },
                        {
                            label: '75%',
                        },
                        {
                            label: '100%',
                        }
                    ]

                },
                {
                    name: 'capacitor.task9',
                    label: 'Estado:',
                    type: 'selector',
                    data: [
                        {
                            label: '-'
                        },
                        {
                            label: 'Malo',
                        },
                        {
                            label: 'Regular',
                        },
                        {
                            label: 'Bueno',
                        }
                    ]

                }
            ]
        }
    ],/*  button: {
        label: 'CREAR INFORME'
    }, */
};