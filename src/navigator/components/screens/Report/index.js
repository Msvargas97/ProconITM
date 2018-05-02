import React, { Component } from 'react';
import {
    View, StyleSheet, Dimensions, Keyboard, Alert
} from 'react-native';
import {
    reduxForm,
    getFormValues,
    getFormMeta,
    getFormInitialValues,
    getFormError,
    getFormNames,
    destroy
} from 'redux-form';

import { DrawerNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import { color, headerToolbar } from "../../../../config";
import { IconToggle } from "../../../../components";
import Form from '../../../../components/Form';
//import validate from './validate'
import { normalize } from '../../../../utils/normalize';
import { fetchRegisterAction } from '../../../../actions';
import { tabSections } from "./tabSections";

const reportConfig = {
    logo: {
        uri: 'https://procontroles.com/assets/images/logo_procon.png',
        style: {
            height: 150,
            width: 300,
            opacity: 0.1
        }
    },
    html: ''
    //sections
}
const getRouteConfigs = () => {
    let routeConfigs = {};
    tabSections.forEach((formSection, index) => {
        routeConfigs[`section${index}`] = {
            screen: Form(formSection.body),
            navigationOptions: {
                title: formSection.title
            }
        }
    })
    return routeConfigs;
}

let tabNavigatorConfig = {
    //    initialRouteName: 'Section0',
    backBehavior: 'none',
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: false, //Deslizamiento entre pestañas
    activeTintColor: 'white',
    lazy: true, // Por defecto a true. Si false, todas las pestañas se representan de inmediato. Cuando true, las pestañas se representan solo cuando se activan.
    tabBarOptions: {
        labelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        style: {
            backgroundColor: color.primary,
        },
        scrollEnabled: true //Habilita el scroll de los tabs si son varios
    },
    initialLayout: {//avoid of expand header with scrollEnabled equal true
        height: 0,
        width: Dimensions.get('window').width,
    },
};

const TabNav = TabNavigator(getRouteConfigs(), tabNavigatorConfig);

export class Report extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        const cancel = () => {
            Alert.alert(
                'Cerrar',
                'Esta seguro que desea cerrar el informe',
                [
                    { text: 'CANCELAR', onPress: undefined, style: 'cancel' },
                    { text: 'CERRAR', onPress: () => navigation.goBack() },
                ],
                { cancelable: false }
            )
        }
        return {
            gesturesEnabled: false,
            header: headerToolbar({
                title: (params) ? params.title : 'Informe',
                menu: ['Guardar', 'Enviar', 'Cancelar'],
                onMenuSelect: (select) => {
                    switch (select) {
                        case 2:
                            cancel();
                            break;
                    }
                },
                leftIcon: 'close',
                onLeftElementPress: () => {
                    cancel();
                },
                style: { container: { elevation: 0 } }
            })

        }
    }

    constructor(props) {
        super(props)
        Keyboard.dismiss()
    };
    componentWillUnmount() {
        this.props.navigation.dispatch(destroy('Report'))
    }

    render() {
        const { navigation, ...props } = this.props;
        return (
            <TabNav
                screenProps={{
                    setTitle: (title) => {
                        navigation.setParams({ title })
                    },
                    ...props,
                    reportConfig,
                }} />
        );
    }
}
