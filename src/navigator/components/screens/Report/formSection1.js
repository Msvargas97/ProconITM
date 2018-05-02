import { normalize } from '../../../../utils/normalize';
import { validation } from '../../../../utils';

export default {
   // form: 'Section1',
    form: 'Report', // a unique identifier for this form
    enableReinitialize: false, //Borra los campos cuando se llama la funcion reset
    touchOnChange: true, //Cambia el touched cuando se ejecuta el onChange
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    formSection: 'equipment_data', //sub seccion
    persistentSubmitErrors : true,
    //title: 'Crear cuenta nueva', //Titulo del formulario
    isNeedNetwork: false, //Indica que el formulario necesita conexión a internet [true || false]
    //  validate, //validacion del formulario
    /*     initialValues: {  //Valores iniciales
    }, */
    sections: [
        {
            fields: [
                {
                    name: 'equipment_number',
                    label: 'Equipo #',
                    type: 'text',
                    keyboardType: 'numeric',
                    validate : [validation.required,validation.number],
                    normalize: normalize.trim
                },
                {
                    name: 'created_at',
                    label: 'Fecha de creación del informe',
                    type: 'date',
                    validate : [validation.required,validation.date],
                    normalize: normalize.trim
                },
                {
                    name: 'execution_at',
                    label: 'Fecha de ejecución del servicio',
                    type: 'date',
                    validate : [validation.required,validation.date,validation.isAfter('equipment_data.created_at','Fecha incorrecta')],
                    normalize: normalize.trim
                },
                {
                    name: 'client',
                    label: 'Cliente',
                    type: 'text',
                    validate : [validation.required],
                    normalize: normalize.trim
                },
                {
                    name: 'address',
                    label: 'Dirección',
                    type: 'text',
                    normalize: normalize.trim
                },
                {
                    name: 'city',
                    label: 'Ciudad o municipio',
                    type: 'text',
                    validate : [validation.required],
                    normalize: normalize.trim
                },
                {
                    name: 'location',
                    label: 'Ubicación del equipo',
                    type: 'text',
                    validate : [validation.required],
                    normalize: normalize.trim
                },
                {
                    name: 'equipment_type',
                    label: 'Tipo de equipo',
                    type: 'text',
                    normalize: normalize.trim
                },
                {
                    name: 'brand',
                    label: 'Marca',
                    type: 'text',
                    normalize: normalize.trim
                },
                {
                    name: 'capacity',
                    label: 'Capacidad',
                    type: 'text',
                    normalize: normalize.trim
                },
            ],
        }
    ], /* button: {
        label: 'CREAR INFORME'
    }, */
};