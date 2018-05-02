'use strict';
import React, { Component } from 'react';

import ReactNative, {
    ScrollView,
    View,
    Keyboard,
    ToastAndroid,
    Text
} from 'react-native';
import Toast from 'react-native-simple-toast'

class KeyboardHandler extends Component {
    constructor(props) {
        super(props);
        this.onKeyboarDidShow = this.onKeyboarDidShow.bind(this);
        this.onKeyboardWillHide = this.onKeyboardWillHide.bind(this);
        this.inputFocused = this.inputFocused.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.state = { keyboardSpace: 0 };
        this.focused = null;
        this._didShowListener = null;
        this._willHideListener = null;

        this._didShowListener = Keyboard.addListener('keyboardDidShow', this.onKeyboarDidShow);
        this._willHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardWillHide);

        this.scrollviewProps = {
            automaticallyAdjustContentInsets: true,
            keyboardShouldPersistTaps: 'handled',
            scrollEventThrottle: 20,
        };
        // pass on any props we don't own to ScrollView
        Object.keys(this.props).filter((n) => {
            return n != 'children'
        })
            .forEach((e) => {
                this.scrollviewProps[e] = this.props[e]
            });
    }

    onKeyboarDidShow(frames) {

        if (!frames.endCoordinates || !this.focused) {
            return;
        }
        //  this.setState({ keyboardSpace: frames.endCoordinates.height });
        this.scrollTo();
    }

    onKeyboardWillHide() {

    }
    scrollTo() {
        let scrollResponder = this.refs.scrollView.getScrollResponder();
        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            this.focused,
            this.props.offset, //additionalOffset
            false
        );
    }
    componentWillUnmount() {
        this._didShowListener.remove();
        this._willHideListener.remove();
    }
    /*     renderFields(children) {
            return React.Children.map(children, (child, index) => {
                if (Array.isArray(child.props.children)) {
                    return this.renderFields(child.props.children)
                } else {
                    return (child.type.name && child.type.name !== 'Field') ? child : React.cloneElement(child,{
                        onFocused : (event) =>{
                            this.inputFocused(event)
                            Toast.show('Here',Toast.SHORT);
                        } 
                    }) ;
                }
            })
        } */
    render() {
        return (
            <ScrollView ref='scrollView' {...this.scrollviewProps} scrollEnabled={this.state.scrollEnabled} >
                {this.props.children}
                {/* <View style={{ height: this.state.keyboardSpace }} /> */}
            </ScrollView>
        );
    }
/*     onFocus(component){
        this.focused = ReactNative.findNodeHandle(component);
        this.scrollTo();
    } */
    inputFocused(event) {
        this.focused = ReactNative.findNodeHandle(event.target);
        this.scrollTo();
    }
    static defaultProps = {
        offset: 45
    };
}

export default KeyboardHandler;