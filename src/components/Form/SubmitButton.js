import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { Button } from 'react-native-elements';
import { color, server } from '../../config';
import { Icon } from '../../components';
import Ripple from 'react-native-material-ripple';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    SkypeIndicator,
    UIActivityIndicator,
} from 'react-native-indicators';

const SubmitButton = ({ button, onCancel, onConfirm, showAlert, style = {}, ...props, backgroundColor }) => (<View>
    {button && (<Button
        buttonStyle={{ marginVertical: 20, ...style }}
        backgroundColor={(backgroundColor) ? backgroundColor : color.primary}
        disabledStyle={{ backgroundColor: 'tomato' }}
        loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
        {...button.props}
        {...props}
    />)}

</View>) 

export default SubmitButton;
/* 
buttonStyle={{
            backgroundColor: color.backgroundPrimary,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
        }}
        icon={(button.icon) ? <Icon {...button.icon} /> : undefined}
        iconRight={true}
        */