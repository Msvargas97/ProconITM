import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Button, Divider, Avatar } from "react-native-elements";
import { Subheader, ActionButton } from 'react-native-material-ui';
import Ripple from 'react-native-material-ripple';
import { CardView, Icon } from "../../../../components";
import styles, { avatar } from './styles'
import realm, { ACCOUNT_SCHEMA } from "../../../../config/database";
import Toast from 'react-native-simple-toast'


const Header = ({ account, onPress }) => {
    const lettersName = String(account.name).charAt(0).toUpperCase() + String(account.last_name).charAt(0).toUpperCase();
    return (
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <Avatar
                    xlarge
                    title={lettersName}
                    rounded
                    source={(account.image == true) ? { uri: `data:image/jpg;base64,${realm.objectForPrimaryKey(ACCOUNT_SCHEMA, 0).image}` } : undefined}
                    imageProps={{ resizeMode: 'contain' }} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 70, bottom: -10 }}>
                <View style={{ borderRadius: 10, height: 100, width: 100, borderRadius: 100 / 2 }} pointerEvents='box-none' >
                    <ActionButton icon="camera-alt" style={{ container: { backgroundColor: 'darkblue' } }} onPress={onPress}/>
                </View>
            </View>
        </View>
    )
}

export default Header;