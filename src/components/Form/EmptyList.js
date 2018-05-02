import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import { color, server } from '../../config';


const EmptyList = ( { message }) => {
    return (
        <View>
            {<Text>{(!message) ? 'Formulario vacio' : message}</Text>}
        </View>
    )
}

export default EmptyList;