import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';

import { connect } from 'react-redux'
import KeyboardHandler from '../../../../components/KeyboardHandler';
import { reduxForm, reset, startSubmit, stopSubmit, untouch, blur, change, initialize } from 'redux-form';
import Field from '../../../../components/Fields';
import Toast from 'react-native-simple-toast';
import { TextField } from 'react-native-material-textfield';
import { Button } from "react-native-elements";
import styles from "./styles";
import { color, server } from "../../../../config"
import validate from "./validate";
import onSubmit from "./onSubmit"
import Ripple from 'react-native-material-ripple'
import { closeSession } from "../../../../utils";

const LoginScreen = (props) => {

    const account = props.screenProps.account
    let isLoggedin = (account) ? account.login : false;
    const isConnected = props.screenProps.network.isConnected;
    const { anyTouched, initialValues, handleSubmit, submitting, reset, submitSucceeded, navigation: { navigate, replace, addListener }, dispatch } = props;

    const onCloseSession = () => {
        dispatch(logoutAction())
        reset()
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <KeyboardHandler ref={ref => this.kh = ref} offset={95} contentContainerStyle={{ alignItems: 'stretch', backgroundColor: 'white' }} >
                <Image
                    style={{ height: 150, width: 300, alignSelf: 'center' }}
                    source={server.logo}
                    resizeMode='contain' />
                <View style={{ flexGrow: 1, paddingHorizontal: 20 }} >
                    <Field
                        name="username"
                        leftIcon="account"
                        suffix="Email o C.C"
                        label="Usuario"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onSubmitEditing={() => {
                            this.field2.getRenderedComponent().input.getRenderedInput().focus();
                        }}
                        onFocused={(event) => this.kh.inputFocused(event)}
                        disabled={submitting} />
                    <Field
                        inputRef={(ref) => this.field2 = ref}
                        name="password"
                        type="password"
                        label="Contraseña"
                        autoCapitalize="none"
                        focusNext={false}
                        onSubmitEditing={(anyTouched || initialValues) ? handleSubmit : undefined}
                        onFocused={(event) => this.kh.inputFocused(event)}
                        disabled={submitting} />
                    <Button
                        title='INICIAR SESIÓN'
                        buttonStyle={{ marginTop: 20, }}
                        onLongPress={() => closeSession(onCloseSession)}
                        onPress={(anyTouched || initialValues) ? handleSubmit : undefined}
                        loading={(submitting === true) ? true : false}
                        loadingRight
                        rounded
                        backgroundColor={color.primary}
                        disabledStyle={(isConnected) ? { backgroundColor: color.primary } : undefined}
                        disabled={(!isConnected || submitting) ? true : false} />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end', alignSelf: 'center' }}>
                    <Ripple style={{ marginTop: 20, marginBottom: 20 }}
                        onPress={() => {
                            if (!this.disableNavigate) {
                                navigate('Register');
                                this.disableNavigate = true;
                                const didFocusSubscription = addListener(
                                    'didFocus',
                                    payload => {
                                        this.disableNavigate = false
                                    }
                                );
                            }
                        }}>
                        <Text style={styles.footer}>No tienes una cuenta?<Text style={styles.hyperLink}> Registrate</Text></Text>
                    </Ripple>
                    <Text style={styles.footer}>{"Calle 21A Nº 8 - 62\nBucaramanga - Santander\n(+57) 313 454 0706 - (+57) 697 8625\n"}</Text>
                    <Image source={require('../../../../images/logo_co.png')} style={{ width: 32, height: 32, }} />
                    <Text style={{ fontWeight: 'bold' }}>Copyright © 2018</Text>
                    {/* <Text>{JSON.stringify(props, null, 2)}</Text> */}
                </View>
            </KeyboardHandler>
        </View>)
}

export const Login = reduxForm({
    form: 'Login', // a unique identifier for this form
    enableReinitialize: true, //Borra los campos cuando se llama la funcion reset
    touchOnChange: true, //Cambia el touched cuando se ejecuta el onChange
    initialValues: { //Valores iniciales
        username: '1098795589',
        password: '123456'
    },
    onSubmit, //Ejecuta el fetch cuando el formulario esta sin errores
    validate,  //Valida que el formulario sea correcto
    /* onSubmitSuccess : (result,dispatch,props) => {
        alert("Success"+JSON.stringify(result,null,2))
    },
    onSubmitFail : (errors,dispatch,submitError,props) => {
        alert("Fail:"+JSON.stringify(errors,null,2))
    } */
})(LoginScreen);


