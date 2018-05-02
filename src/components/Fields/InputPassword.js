import React,{Component} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, ToastAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Ripple from 'react-native-material-ripple'
import { TextField } from 'react-native-material-textfield'
import PropTypes from 'prop-types';
import { IconToggle } from '../Icon'
import { InputBase } from './InputBase';
import Toast from 'react-native-simple-toast'

export class InputPassword extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            secureTextEntry : true
        }
        this.getRenderedInput = this.getRenderedInput.bind(this)
    }
    getRenderedInput(){
        return this.input;
    }
    render(){
        return (
            <InputBase 
                inputRef={ref => this.input = ref}
                leftIcon="lock"
                rightIcon={{
                    name : ( this.state.secureTextEntry ? 'eye' : 'eye-off') ,
                    onPress : () => {
                        this.setState({secureTextEntry: !this.state.secureTextEntry});
                    }
                }}
                secureTextEntry={this.state.secureTextEntry || this.props.disabled}
                {...this.props}
            />
        )
    }
}