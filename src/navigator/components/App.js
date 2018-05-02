import React, { Component } from 'react';
import {
    StackNavigator,
    addNavigationHelpers,
    NavigationActions
} from 'react-navigation';
import { YellowBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { AppNavigator } from './AppNavigator'
import { addListener } from "../../store/configureStore";
import { connect } from 'react-redux';
import { BackHandler, Alert, StatusBar, View, Platform, Keyboard, Text } from 'react-native'
import Toast from 'react-native-simple-toast';
import { color } from '../../config'
import { initAction } from "../../actions";
import realm, { ACCOUNT_SCHEMA } from "../../config/database"

class App extends React.Component {
    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
          
        ]);        
        props.init(); // inicializa la base de datos
        this.exit = false;
        this.updateUI = this.updateUI.bind(this)
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor(color.primaryDark, true);
        if (Platform.OS === 'ios') StatusBar.setNetworkActivityIndicatorVisible(false);
        StatusBar.setTranslucent(false);
        Keyboard.dismiss();
        if (!__DEV__) {
            // eslint-disable-line no-undef
            [
                'assert',
                'clear',
                'count',
                'debug',
                'dir',
                'dirxml',
                'error',
                'exception',
                'group',
                'groupCollapsed',
                'groupEnd',
                'info',
                'log',
                'profile',
                'profileEnd',
                'table',
                'time',
                'timeEnd',
                'timeStamp',
                'trace',
                'warn',
            ].forEach(methodName => {
                console[methodName] = () => {
                    /* noop */
                };
            });
        }
    };

    componentDidMount() {
        Keyboard.dismiss()
        realm.addListener("change", this.updateUI);
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        setTimeout(() => SplashScreen.hide(), 500)
    }
    componentWillUnmount() {
        realm.removeListener('change', this.updateUI);
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    updateUI() {
        const navigationAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: (realm.objectForPrimaryKey(ACCOUNT_SCHEMA, 0).login) ? 'Home' : 'Login' })
            ]
        });
        this.props.dispatch(navigationAction)
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        const index = nav.index;
        const current = nav.routes[index].routes;
        const nameScreen = current[0].routeName;
        //Toast.show(`length:${current.length} name:${current[0].routeName}`, Toast.LONG);
        if (current[current.length - 1]) {
            if (current[current.length - 1].routeName == 'Report') {
                Alert.alert(
                    'Cerrar',
                    'Esta seguro que desea cerrar el informe?',
                    [
                        { text: 'CANCELAR', onPress: undefined, style: 'cancel' },
                        { text: 'CERRAR', onPress: () => dispatch(NavigationActions.back()) },
                    ],
                    { cancelable: false }
                )
            }
            return true;
        }
        if (nav.index === 0 && current.length == 1 && (nameScreen == 'Home' || nameScreen == 'Login')) {
            if (this.exit === true) {
                return false;
            }
            this.exit = !this.exit;
            Toast.showWithGravity('Presione una vez más para salir de la aplicación', Toast.LONG, Toast.CENTER);
            this.setState({ visible: true })
            setTimeout(() => {
                this.exit = false;
            }, 3000)
            return true;
        }
        /*     if (nameScreen === REPORT_SCREEN) {
                Alert.alert(
                    'Guardar informe',
                    'Desea guardar los cambios realizados al informe?',
                    [
                        { text: 'Cancelar', onPress: () => { } },
                        { text: 'NO', onPress: () => dispatch(NavigationActions.back()), style: 'cancel' },
                        {
                            text: 'SI', onPress: () => {
                                ToastAndroid.show('Informe guardado exitosamente', ToastAndroid.SHORT);
                                dispatch(NavigationActions.back());
                            }
                        },
                    ],
                    { cancelable: false }
                )
            } else { */
        dispatch(NavigationActions.back());
        //}
        return true;
    };
    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: { ...this.props.nav },
                addListener,
            })} screenProps={{
                network: this.props.network, account: this.props.account,
            }} />
        );
    }
}

export default App;
