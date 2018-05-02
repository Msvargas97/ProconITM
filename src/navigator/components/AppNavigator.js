import React, { Component } from 'react';
import { View, Text, Easing, Animated } from 'react-native';
import {
    StackNavigator,
    addNavigationHelpers,
} from 'react-navigation';
import MainStack from "./MainStack";


//Configuración de rutas, de screens
const routerConfig = {
    Main: {
        screen: MainStack
    },
};

//Configuración del stack
const stackConfig = {
    initialRouteName: 'Main',
    headerMode: 'none',
    mode: 'modal',
    transitionConfig: () => ({
        transitionSpec: {
            duration: 200,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        isModal: true,
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            const height = layout.initHeight;
            const translateY = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [height, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });
            return { opacity, transform: [{ translateY }] };
        },
    }),

};

//Navigator principal de la App
export const AppNavigator = StackNavigator(routerConfig, stackConfig);

//export {MainStack as AppNavigator}