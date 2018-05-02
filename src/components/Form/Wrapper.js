import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { color, server } from '../../config';
import { FormSection } from "redux-form";
import { Card } from 'react-native-elements';

const Wrapper = ({ formSection, children }) => (//Si se asigna un nombre al formSection crea la section si no crea el formulario normal
    (typeof formSection == 'string') ?
        <FormSection name={formSection}>
            <View style={{ flex: 1 }}  >
                {children}
            </View>
        </FormSection> :
        <View style={{ flex: 1 }}  >
            {children}
        </View>
)
export default Wrapper