import React from 'react'
import { Alert } from 'react-native';
import { IconToggle } from '../components';
import { Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';
import { closeSession } from "../utils";

/** 
 * Color de la aplicación
*/
const color = {
    primary: '#01579b',
    primaryLight: '#4f83cc',
    primaryDark: '#002f6c',
    backgroundPrimary: '#F5FCFF',
};
/**
 * Header del navigator
 */
const headerRight = (
    <IconToggle name="information-outline" color="white" size={24} style={{ margin: 15 }} onPress={() => alert('Proyectos y controles de ingeniería S.A.S\n2018')} />
)
const headerRightMenu = (
    <IconToggle name="dots-vertical" color="white" size={24} style={{ margin: 15 }} />
)
const header = {
    headerTintColor: 'white',
    headerStyle: { backgroundColor: color.primary },
    headerRight
}
const headerToolbar = (headerConfig) => (
    <Toolbar
        centerElement={headerConfig.title}
        searchable={(headerConfig.searchable) ? headerConfig.searchable : undefined}
        rightElement={headerConfig.menu ? {
            menu: { labels: headerConfig.menu },
        } : undefined}
        leftElement={(headerConfig.leftIcon) ? headerConfig.leftIcon : undefined}
        onLeftElementPress={(headerConfig.onLeftElementPress) ? headerConfig.onLeftElementPress : undefined}
        onRightElementPress={(select) => (headerConfig.onMenuSelect) ? (select.action == 'menu') ? headerConfig.onMenuSelect(Number(select.index)) : undefined : undefined}
        style={headerConfig.style}
    />
)
/**
 * Configuración del servidor 
 */
const server = {
    url: 'https://www.procontroles.com',
    logo: require('../images/logo.png')
}

/**
 * Material ui config
 */
const uiTheme = {
    palette: {
        primaryColor: color.primary,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

export { color, header, server, uiTheme, headerToolbar }
