import React, { Component } from "react";
import { View, Text, SectionList, Keyboard, ScrollView, PixelRatio, RefreshControl } from "react-native";
import Toast from 'react-native-simple-toast';
import { Button, Divider } from 'react-native-elements';

const Separator = () => {
    return (<Divider style={{backgroundColor:'grey', height : 1}} />)
}

export default Separator;