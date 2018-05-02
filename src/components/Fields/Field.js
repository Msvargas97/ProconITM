import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    FlatList
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';
import { Field as Input } from "redux-form";
import { RenderField } from './RenderField';
import Toast from 'react-native-simple-toast';

export default class Field extends React.PureComponent {

    static defaultProps = {
        type: 'default',
    }
    render() {
        const { inputRef, validate, normalize, name, group, ...props } = this.props;
        if (props.focusNext === undefined) props.focusNext = true;
        if (props.disableFullscreenUI === undefined) props.disableFullscreenUI = false;
        if (props.focusNext === true) {
            props.blurOnSubmit = false;
            props.returnKeyType = 'next';
        }
        if (!props.enablesReturnKeyAutomatically) props.enablesReturnKeyAutomatically = true;
        if (this.props.group) props.group = true;
        else props.group = undefined;
        if (props.save === undefined) props.save = true;
        //props.containerStyle = { flex: 1, paddingTop: 0, alignSelf: 'flex-start', marginTop: 0, justifyContent: 'flex-start' };
        props.labelHeight = 24;
        props.animationDuration = 70;
        return (
            <Input
                ref={inputRef}
                name={(!name) ? group : name}
                component={RenderField}
                name={this.props.name}
                props={this.props}
                component={RenderField}
                props={props}
                normalize={normalize}
                validate={validate}
                withRef={true}
            />);
    }
}

Field.propTypes = {
    type: PropTypes.oneOf(['default', 'autocomplete', 'text', 'id-document', 'numeric', 'email-address', 'phone-pad', 'password', 'radiobutton', 'checkbox', 'selector', 'date', 'user', 'phone', 'address', 'email', 'button', 'selector', 'file', 'multichoice']).isRequired,
    inputRef: PropTypes.func,
    props: PropTypes.shape({
        onFocused: PropTypes.func,
        onEnter: PropTypes.func,
        onSubmitEditing: PropTypes.func,
        onBlur: PropTypes.func,
        leftIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        rightIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.string]),
        focusNext: PropTypes.bool,
    }),
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string
}

