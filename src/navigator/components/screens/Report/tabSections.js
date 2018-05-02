import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import Form from '../../../../components/Form';
//import validate from './validate'
import { normalize } from '../../../../utils/normalize';
import { fetchRegisterAction } from '../../../../actions';
import formSection1 from "./formSection1";
import formSection2 from "./formSection2"
import formSection3 from './formSection3'
import formSection4 from './formSection4'

export const tabSections = [
    {
        title: 'DATOS DEL EQUIPO',
        body: formSection1
    },
    {
        title: 'CONDENSADOR',
        body: formSection2
    },
    {
        title : 'EVAPORADOR',
        body : formSection3
    },
    {
        title : 'OBSERVACIONES',
        body : formSection4
    }
]