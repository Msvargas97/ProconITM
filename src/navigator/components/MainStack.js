import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import {
    StackNavigator,
    addNavigationHelpers,
} from 'react-navigation';
import { connect } from 'react-redux';
import { Home, Login, Register, Account,Report } from "../components/screens";
import { header } from "../../config"
import realm, { ACCOUNT_SCHEMA } from "../../config/database";
import { headerToolbar } from "../../config";
import { closeSession } from "../../utils";

const account = realm.objectForPrimaryKey(ACCOUNT_SCHEMA, 0);

const routerConfig = {
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            title: 'Procontroles',
        }),
    },
    Register: {
        screen: Register,
        navigationOptions: ({ navigation }) => ({
            title: 'Registro',
        }),
    },
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            const { params = {} } = navigation.state;
            return ({
                header: headerToolbar({
                    title: 'Informes ITM',
                    searchable: {
                        autoFocus: true,
                        placeholder: 'Buscar informes por cliente',
                    },
                    menu: ['Cuenta', 'Cerrar sesión'],
                    onMenuSelect: (select) => {
                        switch (select) {
                            case 0:
                                navigation.navigate('Account')
                                break;
                            case 1:
                                closeSession()
                                break;
                        }
                    }
                })
            })
        },
    },
    Account: {
        screen: Account,
        navigationOptions: ({ navigation }) => ({
            title: 'Info cuenta',
        }), 
    },
    Report : {
        screen : Report
    }
}

const stackConfig = {
    //initialRouteName: 'Login',
    initialRouteName: (typeof account == 'object')  ? (account.login) ? 'Home' : 'Login' : 'Login', //Verifica si ya inició sesión previamente
    navigationOptions: {
        gesturesEnabled: false,
        ...header
    }
};

//Navigator principal de la App
const MainStack = StackNavigator(routerConfig, stackConfig);

export default MainStack;
