import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    FlatList,
    ToastAndroid,
    Platform,
    Picker
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons'
import Ripple from 'react-native-material-ripple'
import { TextField } from 'react-native-material-textfield'
import PropTypes from 'prop-types';
import { IconToggle } from '../Icon'
import { InputBase } from './InputBase';
import Toast from 'react-native-simple-toast'
import { color } from "../../config";


export class Selector extends React.PureComponent {
    static defaultProps = {
        mode: 'dialog',
        direction: 'row',
        width: 200,
        selectedIndex : 0
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedItem: (props.input.value) ? props.input.value : (props.data[props.selectedIndex].value == undefined) ? props.data[props.selectedIndex].label : props.data[props.selectedIndex].value
        }
        if (this.state.selectedItem == undefined) {
            props.input.onChange((props.data[props.selectedIndex].value == undefined) ? props.data[props.selectedIndex].label : props.data[props.selectedIndex].value )
        }
        this.getRenderedInput = this.getRenderedInput.bind(this)
    }
    getRenderedInput() {
        return this.input;
    }
    onSelect(index, value) {
        this.props.input.onChange({ value, index })
    }
    render() {
        let { data, multichoice, label, ...props } = this.props;
        return (
            <View>
                <InputBase
                    renderCustomItem={() =>
                        <View style={{ flexDirection: this.props.direction }} >
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: '100', margin: 10, flex: 1 }} >{label}</Text>
                            <Picker
                                mode={this.props.mode}
                                prompt={label}
                                selectedValue={(this.props.input.value) ? this.props.input.value : (this.props.data[props.selectedIndex].value == undefined) ? this.props.data[props.selectedIndex].label : this.props.data[props.selectedIndex].value}
                                style={{ height: 50, width: this.props.width }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ selectedItem: itemValue })
                                    this.props.input.onChange(itemValue)
                                }}>
                                {data.map((item, index) => <Picker.Item label={item.label} value={(item.value) ? item.value : item.label} key={`item${index}`} />)}
                            </Picker>
                        </View>
                    }
                    {...props}
                />
            </View>

        )
    }
}
