import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, ToastAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Ripple from 'react-native-material-ripple'
import { TextField } from 'react-native-material-textfield'
import PropTypes from 'prop-types';
import { IconToggle } from '../Icon';
import { InputBase } from './InputBase'

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export class InputDate extends React.Component {
    constructor(props) {
        super(props)
        this.getRenderedInput = this.getRenderedInput.bind(this);
        this.onConfirm = this.onConfirm.bind(this)
        this.state = {
            isDateTimePickerVisible: false,
        };
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    getRenderedInput() {
        return this.input;
    }
    onConfirm = (date) => {
        let dayWrapper = moment(date).format("MMMM DD [del] YYYY");
        this.inputBase.setValue(dayWrapper.toString());
        if(!this.input.isFocused()){
            this.input.focus()
        }
        this._hideDateTimePicker();
               // ToastAndroid.show(dayWrapper.toString(),ToastAndroid.SHORT);
    }
    render() {
        return (
            <View>
                <InputBase 
                    ref={ref => this.inputBase = ref}
                    inputRef={ref => this.input = ref}
                    rightIcon={{
                        name: "calendar-range",
                        onPress: () => {
                            this._showDateTimePicker();
                        }
                    }}
                    //editable={false}
                    {...this.props} />
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.onConfirm}
                    onCancel={this._hideDateTimePicker}
                />
            </View>

        )
    }
}
