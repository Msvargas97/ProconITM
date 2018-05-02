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
import { RadioButton } from "./RadioButton";
import { CheckBox } from "./ChecBox"

export const Group = ({ data, ...props }) => {
    return (<FlatList
        keyExtractor={(item, index) => '' + index}
        data={data}
        renderItem={({item,index}) => React.createElement(RadioButton,{
            label : item.label,
        })}
    />)
}