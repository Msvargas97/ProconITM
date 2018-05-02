import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, ToastAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Ripple from 'react-native-material-ripple'
import { TextField } from 'react-native-material-textfield'
import PropTypes from 'prop-types';
import { IconToggle } from '../Icon';
import { InputBase } from './InputBase'
//color

export class InputText extends React.Component{
    constructor(props) {
      super(props)
      this.getRenderedInput = this.getRenderedInput.bind(this)

    }
    getRenderedInput(){
        return this.input;
    }
    render(){
        return (
            <InputBase inputRef={ref => this.input = ref}  rightIcon="clear" {...this.props} />
        )
    }
}