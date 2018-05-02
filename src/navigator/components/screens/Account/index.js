import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Button, Divider, Avatar } from "react-native-elements";
import { Subheader, ActionButton } from 'react-native-material-ui';
import Ripple from 'react-native-material-ripple';
import { CardView, Icon } from "../../../../components";
import styles, { avatar } from './styles'
import realm, { ACCOUNT_SCHEMA } from "../../../../config/database";
import Header from "./Header";
import { color } from "../../../../config";
import ImagePicker from "react-native-image-picker";
import { optionsImagePicker } from "../../../../utils";
import { updateProfilePhoto, fetchUploadAction } from "../../../../actions";
import Toast from 'react-native-simple-toast'

export const Account = (props) => {
    const { account } = props.screenProps;
    const { navigation } = props;
    const status_name = (account.status == 0) ? 'Desactivada' : 'Activada';
    const user = (account.user_type === 'technician') ? 'Técnico' : (account.user_type === 'admin') ? 'Administrador' : 'normal';

    const data = [{ label: 'Nombre', value: account.name + ' ' + account.last_name },
    { label: 'Correo electrónico', value: account.email },
    { label: 'No de documento', value: account.id_number },
    { label: 'Número de celular', value: account.cellphone_number },
    { label: 'Tipo de cuenta', value: user },
    { label: 'Empresa', value: account.company },
    { label: 'Estado de la cuenta', value: status_name },
    { label: 'Fecha de registro', value: account.created_at }];

    const onPress = () => {
        ImagePicker.showImagePicker(optionsImagePicker, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                const data = new FormData();
                data.append('inputtest', 'asdasd'); // get in $_REQUEST
                data.append('image', { //get in $_FILES
                    uri: response.uri,
                    type: 'image/jpg', // or photo.type
                    name: 'testPhotoName'
                });
                navigation.dispatch(fetchUploadAction(data))
                //navigation.dispatch(updateProfilePhoto({ uri: response.uri }));
            }
        })
    }


    return (
        <View style={{ backgroundColor: 'transparent' }}>
            <FlatList
                contentContainerStyle={{ backgroundColor: 'transparent' }}
                keyExtractor={(item, index) => '' + index}
                data={data}
                renderItem={({ item, index }) => (
                    <Ripple>
                        <View style={{ paddingHorizontal: 17, paddingVertical: 10, backgroundColor: 'white' }} >
                            <Text style={{ color: color.primaryLight, fontSize: 17, fontWeight: 'bold' }} >{item.label}</Text>
                            <Text stye={{ color: 'black' }}  >{item.value}</Text>
                        </View>
                    </Ripple>

                )}
                ListHeaderComponent={() => (<Header account={account} onPress={onPress} />)}
                ItemSeparatorComponent={() => <Divider style={{ marginHorizontal: 15 }} />}
            //ListFooterComponent={() => <Text>{JSON.stringify(props, null, 2)}</Text>}
            />
        </View>
    )
}
