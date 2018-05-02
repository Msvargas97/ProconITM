import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../store/configureStore";
import { AppContainer as App } from "../containers";
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { uiTheme } from "../../config"
import Dialog from "./Dialog";



export const Root = () => (
    <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}>
            <App />
            <Dialog />
        </ThemeProvider>
    </Provider>
)
