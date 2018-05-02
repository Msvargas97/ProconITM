import React from 'react';
import { blur, clearFields, autofill, initialize } from "redux-form";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, ToastAndroid, Platform, } from 'react-native';
import Ripple from 'react-native-material-ripple'
import { TextField } from 'react-native-material-textfield'
import PropTypes from 'prop-types';
import { IconToggle, Icon } from '../Icon'


export class InputBase extends React.PureComponent {
    constructor(props) {
        super(props)
        const { rightIcon } = props;
        const isFocused = (rightIcon === 'clear') ? false : true;
        this.state = {
            isFocused,
            text: (props.input.value) ? props.input.value : null //obtiene el valor inicial
        }
        this.getInitialValue = this.getInitialValue.bind(this)
        this.focus = this.focus.bind(this)
        this.blur = this.blur.bind(this)
        this.clear = this.clear.bind(this)
        this.setValue = this.setValue.bind(this)
        this.restore = false
    };
    focus() {
        if (this.input) {
            this.input.focus()
        }
    }
    blur() {
        if (this.input) {
            this.input.blur()
        }
    }
    clear() {
        if (this.input) {
            this.input.clear()
            // this.setState({text : ''})
        }
    }
    getRenderedInput() {
        if (this.input) {
            return this.input
        }
    }

    setValue = (val) => {
        if (this.props.input.onChange)
            this.props.input.onChange(val)
    }
    getInitialValue = () => {
        return this.state.text;
    }

    render() {
        let { meta: { form, touched, error, warning, asyncValidating, pristine, dirty, visited },
            input: { name, onChange, value, onFocus, onBlur, dispatch, ...restInput },
            onFocused, onChangeText, inputRef, onEnter, style, title, restore, characterRestriction, hasError, type, suffix, onSubmitEditing, leftIcon, rightIcon, focusNext, ...othersProps }
            = this.props;
        if(hasError) hasError((error) ? true : false)
        if (restore) {
            this.props.meta.dispatch({
                type: '@@redux-form/CHANGE',
                payload: this.getInitialValue(),
                meta: { form, field: name },
            })
            this.props.meta.dispatch({
                type: '@@redux-form/UNTOUCH',
                meta: { form, fields: [name] },
            })
        }
        if (this.props.renderCustomItem) {
            return this.props.renderCustomItem();
        }
        if (characterRestriction && !title) {
            title = ' ';
        }
        if (leftIcon != undefined) {
            if (typeof leftIcon == 'string') {
                const name = leftIcon;
                leftIcon = { name };
            }
            if (!leftIcon.size) leftIcon.size = 24
            if (!leftIcon.style) leftIcon.style = { marginRight: 16, marginTop: 28, alignSelf: 'flex-start', }
        }
        if (rightIcon != undefined) {
            if (typeof rightIcon == 'string') {
                if (rightIcon === "clear") {
                    rightIcon = {
                        name: 'close-circle',
                        onPress: () => {
                            //if(save)
                            if (value) onChange('')
                            //else    
                            this.clear()
                        }
                    };
                } else {
                    const name = rightIcon;
                    rightIcon = { name };
                }

            } else if (rightIcon === true) {
                rightIcon = { name: 'close-circle' };
            }
            if (!rightIcon.size) rightIcon.size = 24
        }
        const renderLeftIcon = () => (
            (leftIcon) ? <Icon {...leftIcon} /> : undefined
        )
        const renderRigthIcon = () => (
            (rightIcon) ? <IconToggle {...rightIcon} style={[{ margin: 15 }, (rightIcon.style) ? rightIcon.style : {}]} /> : null
        )
        const renderRigthIconEmpty = () => (
            (rightIcon) ? <View pointerEvents='box-none' style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', width: rightIcon.size, margin: 15 }} /> : null
        )

        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start', ...style }}>
                {renderLeftIcon()}
                <View style={{ flex: 1 }}>
                    <TextField
                        {...othersProps}
                        ref={(ref) => {
                            if (inputRef) inputRef(ref)
                            this.input = ref
                        }}
                        containerStyle={{ flex: 1, alignSelf: 'stretch', }}
                        value={value}
                        onSubmitEditing={(event) => {
                            if (onSubmitEditing) onSubmitEditing(event)
                            if (onEnter) onEnter(event)
                        }}
                        onBlur={(e) => {
                            if (rightIcon)
                                if (rightIcon.name === 'close-circle') this.setState({ isFocused: false })
                            if (onBlur) onBlur(e);
                        }}
                        onChangeText={(text) => {
                            onChange(text);
                            //this.setState({ text })
                            if (onChangeText) onChangeText(text)
                        }}
                        onFocus={(event) => {
                            if (rightIcon)
                                if (rightIcon.name === 'close-circle') this.setState({ isFocused: true })

                            if (onFocus) onFocus(event)
                            if (onFocused) onFocused(event)
                        }}
                        suffix={suffix}
                        characterRestriction={characterRestriction}
                        title={title}
                        error={touched && error && <Text><Icon name='alert-circle-outline' size={14} /> {error}</Text>}
                        renderAccessory={(suffix && rightIcon && this.state.isFocused) ? renderRigthIconEmpty : undefined}
                    />
                    {(rightIcon && this.state.isFocused) ?
                        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'flex-end', top: (title || (touched && error)) ? 0 : 16 }]}>
                            {renderRigthIcon()}
                        </View> :
                        null}
                </View>
            </View>
        )
    }
}

TextField.propTypes = {
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool])
}
