import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet,Dimensions } from 'react-native';

/* const maxSize = Dimensions.get('window').height - 38;
 */
const CardView = ({style = {},...props}) => (
    <View style={[styles.container,styles.decoration,style]} >
            {props.children}
    </View>
)

export {CardView};

const styles = StyleSheet.create({
    container: (Platform.OS === 'ios') ?
        {
            shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowOffset: {
                height: 0,
                width: 0
            },
        } :
        {
            elevation: 4,
        },
    decoration : {
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 7,
       // overflow: 'visible',
      /*   maxHeight: maxSize  */
    }
})