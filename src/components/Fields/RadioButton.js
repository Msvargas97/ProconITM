import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, ToastAndroid, Platform, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Ripple from 'react-native-material-ripple'
import { TextField } from 'react-native-material-textfield'
import PropTypes from 'prop-types';
import { IconToggle } from '../Icon'
import { InputBase } from './InputBase';
import Toast from 'react-native-simple-toast'
import { color } from "../../config";
import { Checkbox as InputCheckbox } from 'react-native-material-ui'
import { CheckBox as CheckBoxAndroid } from 'react-native';
import RadioButton from '@rh389/react-native-radio-button'

export const MyRadioButton = ({ label, ...props }) => (
    <InputBase
        renderCustomItem={() =>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'center' }}>
                <Ripple style={{ flex: 0, justifyContent: 'center' }} onPress={() => {
                    props.input && props.input.onChange((!props.input.value) ? true : false)
                }}>
                    <Text style={{ textAlign: 'left', color: 'black', flex: 0, justifyContent: 'center' }} >{label}</Text>
                </Ripple>
                <RadioButton
                    label={label}
                    value={(props.input.value) ? true : false}
                    onValueChange={(event) => {
                        props.input && props.input.onChange((!props.input.value) ? true : false)
                    }}
                />
            </View>

        }
        {...props}
    />
)

/*
export class RadioGroup extends React.PureComponent {
    static defaultProps = {
        direction: 'row'
    }
    constructor(props) {
        super(props)
        this.state = {
            checkedArray: props.data.map((item, index) => false)
        }

    }

    render() {
        return <View style={{ flexDirection: this.props.direction }}></View>
        this.props.data.map((item, index) => {
            return <MyRadioButton key={`${index}`} label={item.label} />
        })
    }
} */