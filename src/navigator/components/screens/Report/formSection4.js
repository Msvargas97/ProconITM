import { normalize } from '../../../../utils/normalize';
import { validation } from '../../../../utils';

export default {
   // form: 'Section1',
    form: 'Report', // a unique identifier for this form
    enableReinitialize: false, //Borra los campos cuando se llama la funcion reset
    touchOnChange: true, //Cambia el touched cuando se ejecuta el onChange
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    formSection: 'Observatios', //sub seccion
    persistentSubmitErrors : true,
    //title: 'Crear cuenta nueva', //Titulo del formulario
    isNeedNetwork: false, //Indica que el formulario necesita conexión a internet [true || false]
    //  validate, //validacion del formulario
    /*     initialValues: {  //Valores iniciales
    }, */
    sections: [
        {
            title : 'Mantenimiento correcctivo',
            fields: [
                {
                    name: 'corrective',
                    label: 'Ingrese las observaciones', 
                    type: 'text',
                    multiline : true,
                    numberOfLines: 5,
                    normalize: normalize.trim
                },
            ],
            
        },
        {
            title : 'Mantenimiento Preventivo',
            fields: [
                {
                    name: 'preventive',
                    label: 'Ingrese las observaciones', 
                    type: 'text',
                    multiline : true,
                    numberOfLines: 5,
                    normalize: normalize.trim
                },
            ],
        }
    ], button: {
        label: 'CREAR INFORME'
    },
};