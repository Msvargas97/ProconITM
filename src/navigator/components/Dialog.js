import Modal from "react-native-modalbox"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { color } from '../../config'
import { dialogAction } from "../../actions";
import realm, { ACCOUNT_SCHEMA } from "../../config/database"
import { Platform, StyleSheet, View, Text, Dimensions, Button, TouchableOpacity, Alert } from 'react-native';
import { IconToggle, Icon } from "../../components/Icon";

class DialogModal extends Component {
    static defaultProps = {
        open: false,
        enableButtons: false
    }
    constructor(props) {
        super(props);
        this.state = {
            Alert_Visibility: false,
        };
        this.error = false
    }

    Show_Custom_Alert(visible) {
        this.setState({ Alert_Visibility: visible });
    }
  
    render() {
        const { dialog: { open, renderDialog, onConfirm, form, onCancel, onClosed, key, section, enableButtons, position, dialogTitle, style, ...props } } = this.props;
        if (open) {
            if (this.modal) {
                this.modal.open();
            }
        }
       
        return (
            <Modal
                ref={ref => this.modal = ref}
                position={position ? position : 'center'}
                style={[{ flex: 1, justifyContent: 'center' }, styles.Alert_Main_View]}
                onClosed={() => {
                    //Toast.show(`error:${this.error}`, Toast.SHORT)
                    if (onClosed) onClosed();
                    form.setError(key, this.error, section);
                }}
                {...props}>
                <Text style={styles.Alert_Title}>{dialogTitle}</Text>
                <Icon style={styles.icon} name='chevron-down' size={48} onPress={() => this.modal.close()} />

                <View style={styles.Alert_Message}>
                    {React.createElement(renderDialog,{
                        ref : (ref) => this.subForm = ref,
                        subForm : true,
                        hasError : (error) => {
                            this.error = error; 
                        }
                    })}
                    
                    
                </View>
                {/*(enableButtons &&
                    <View style={{ flexDirection: 'row', height: '15%', width: '100%' }}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => {
                                if (onCancel) onCancel();
                                this.subForm.wrappedInstance.restore();
                                this.restore = false;
                                this.modal.close();
                            }}
                            activeOpacity={0.7}>
                            <Text style={styles.TextStyle}> CANCELAR </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => {
                                this.restore = false;
                                Toast.show('Guardado');
                                this.modal.close();
                            }}
                            activeOpacity={0.7} >
                            <Text style={styles.TextStyle}>GUARDAR</Text>
                        </TouchableOpacity>
                    </View>)*/}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (Platform.OS == 'ios') ? 20 : 0

    },
    Alert_Main_View: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        width: '100%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        paddingBottom: 20,
        paddingTop: 20
    },
    icon: {
        justifyContent: 'flex-start',
        alignSelf: 'center',
        alignItems: 'center',
    },
    Alert_Title: {
        fontSize: 20,
        fontWeight: '500',
        color: "#009688",
        textAlign: 'center',
        width: '100%'
    },

    Alert_Message: {
        //height: '70%',
        flex : 1,
        width: '100%',
        backgroundColor: 'white',
    },

    buttonStyle: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
        // marginVertical : 10
    },

    TextStyle: {
        color: "#009688",
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '300',
        //marginTop: -5
    }

});

const mapStateToProps = (state) => ({
    dialog: state.dialog
})

const Dialog = connect(mapStateToProps)(DialogModal)


export default Dialog;
