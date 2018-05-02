import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    FlatList,
    ToastAndroid
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';
import { Field as Input } from "redux-form";
import { InputBase } from "./InputBase"
import { InputText } from "./InputText";
import { InputPassword } from './InputPassword';
import { InputDate } from "./InputDate";
import { CheckBox } from "./CheckBox";
import { MyRadioButton } from './RadioButton'
import { Selector } from './Selector'

export class RenderField extends React.PureComponent {
    constructor(props) {
        super(props)

    }
    componentDidMount() {

    }
    getRenderedField() {
        return this.input;
    }
    render() {
        let { type, ...props } = this.props;
        props.ref = (ref) => this.input = ref;

        switch (type.toLowerCase()) {
            case 'text':
                return React.createElement(InputText, props);
            case 'password':
                return React.createElement(InputPassword, props);
            case 'date':
                return React.createElement(InputDate, props);
            case 'checkbox':
                return React.createElement(CheckBox, props)
            case 'radiobutton':
                return React.createElement(MyRadioButton, props)
            case 'selector':
                return React.createElement(Selector,props)
            case 'default':
            default:
                return React.createElement(InputBase, props);
        }
    }
}