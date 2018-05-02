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

export const CheckBox = ({ label, ...props }) => (
    <InputBase
        renderCustomItem={() =>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'center' }}>
                <Ripple style={{ flex: 1, justifyContent: 'center' }} onPress={() => {
                    if (props.input) props.input.onChange((!props.input.value) ? true : false)
                }}>
                    <Text style={{ textAlign: 'left', color: 'black', flex: 1, justifyContent: 'center' }} >{label}</Text>
                </Ripple>
                {
                    React.createElement(CheckBoxAndroid, {
                        label: label,
                        value: (props.input.value) ? true : false,
                        checked: (props.input.value) ? true : false,
                        onValueChange: () => { if (props.input) props.input.onChange((!props.input.value) ? true : false) }
                    })}
            </View>

        }
        {...props}
    />
)
