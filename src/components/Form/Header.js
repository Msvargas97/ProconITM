import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import { color, server } from '../../config';


const Header = ( { title }) => {
    return (
        <View>
            {title && <Text style={{fontSize : 20, color : 'black', fontWeight : '200', fontFamily : 'sans-serif-condensed', padding : 5}} >{title}</Text>}
        </View>
    )
}

export default Header;