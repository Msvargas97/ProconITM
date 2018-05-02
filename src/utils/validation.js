import React from 'react'

import moment from 'moment';
import { Toast } from 'react-native-simple-toast';
import { grab } from '../utils'

const required = value => !value ? '* Requerido' : undefined;
const email = value => value ? !validation.isEmailAddress(value) ? 'Correo electrónico incorrecto' : undefined : undefined;
const alphabet = value => value ? !validation.isAlphabet(value) ? 'Soló texto' : undefined :undefined;
const number = value => value ? !validation.isNumber(value)  ? 'Soló números' : undefined: undefined

const maxLength = max => value =>
    value && value.length > max ? `Máximo ${max} caracteres o menos` : undefined
const minLength = min => value =>
    value && value.length < min ? `Mínimo ${min}  caracteres o más` : undefined

const date = value => {
    if(!value) return
    const pattern = /^([a-zA-Z]{4,15}[\s])([0-9]{2}[\s])del([\s][0-9]{4})$/;
    const example = moment(new Date()).format('MMMM DD [del] YYYY');
    if (!pattern.test(value.trim())) return "Fecha incorrecta. Ejem:" + example;
    //  if (!moment("Febrero 17 del 2018", 'MMMM DD [del] YYYY', 'es', true).isValid()) return "Ingrese una fecha válida..."
    //if(!moment(String(value)).isValid()) return "Ingrese una fecha válida"    
    // ToastAndroid.show(`date:${value} isValid:${checkDate}`,ToastAndroid.SHORT)
    return undefined;
}


const isAfter = (otherField,msg) => (value, allValues, props, name) => {
   // alert(JSON.stringify(grab(allValues,otherField) ,null,2))
    if (grab(allValues,otherField)) {
        if (value.trim() === '' || grab(allValues,otherField).trim() === '') return undefined;
        const date1 = getDate(value.toString());
        const date2 = getDate(grab(allValues,otherField).toString());
        //alert(`Fecha1:${date1} Fecha2:${date2}`)
         if (moment(date2).isBefore(date1)) {
            return msg;
        } 
    }else{
        return undefined;
    }
   
}

const getDate = dayWrapper => {
    let date1 = dayWrapper.toString().replace('del', '').replace(/[\s]{1,5}/g, "-");
    date1 = date1.split('-');
    date1 = moment(dateHash[date1[0]] + "-" + date1.slice(1), 'MM-DD-YYYY').format('YYYY-MM-DD');
    return date1;
}

const dateHash = {
    Enero: '01',
    Febrero: '02',
    Marzo: '03',
    Abril: '04',
    Mayo: '05',
    Junio: '06',
    Julio: '07',
    Agosto: '08',
    Septiembre: '09',
    Octubre: '10',
    Noviembre: '11',
    Deciembre: '12'
};

export const validation = {
    isEmailAddress: (str) => {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(str);  // returns a boolean
    },
    isNotEmpty: (str) => {
        const pattern = /\S+/;
        return pattern.test(str);  // returns a boolean
    },
    isNumber: (str) => {
        const pattern = /^\d+$/;
        const pattern2 = /[-+]?([0-9]*\.[0-9]+|[0-9]+)/;
        return pattern.test(str) || pattern2.test(str) ;  // returns a boolean
    },
    isSame: (str1, str2) => {
        return str1 === str2;
    },
    isAlphabet: (str) => {
        const pattern = /^[a-zA-Z]+$/;
        return pattern.test(str);
    },
    isPhoneNumber: (str) => {
        const pattern = /^(\d{1,3})[-](\d{1,3})[-](\d{4,10})$/;
        return pattern.test(str);
    },
    isIdNumber: (str) => {
        const pattern = /^(((\d{1,3})[.])*)$/;
        return pattern.test(str);
    },
    isRequired: (str) => value => !value ? '* Requerido' : undefined,
    required,
    date,
    email,
    alphabet,
    number,
    isAfter
};

//export default validation;