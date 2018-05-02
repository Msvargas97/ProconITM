import React from 'react'
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';

const IconToggle = ({ size = 24, onPress, style, iconStyle,  rippleDuration = 200, rippleRatio = 2,...props }) => (
        <Ripple rippleContainerBorderRadius={size * 2} rippleDuration={rippleDuration} rippleOpacity={0.6} rippleSize={size* rippleRatio} rippleCentered onPress={onPress} >
                <View pointerEvents='box-none' style={[{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', width: size },style]}>
                        <Icon size={size} style={iconStyle} {...props} />
                </View>
        </Ripple>

);

export { IconToggle, Icon, Ripple }
