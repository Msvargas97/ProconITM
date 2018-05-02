import React, { Component } from "react";
import {
    View,
    Text,
    SectionList,
    Keyboard,
    ScrollView,
    PixelRatio,
    RefreshControl,
    Dimensions,
    FlatList,
    Alert
} from "react-native";
import {
    reduxForm,
    unregisterField,
    change,
    registerField,
    initialize,
    getFormValues,
    getFormInitialValues,
    clearFields,
    untouch,
    touch,
    destroy
} from 'redux-form';
import Field from '../Fields';
import Toast from 'react-native-simple-toast';
import { Button, Divider } from 'react-native-elements';
import { color, server } from '../../config';
import Header from './Header';
import EmptyList from './EmptyList';
import SubmitButton from "./SubmitButton";
import Wrapper from './Wrapper';
import SectionHeader from './SectionHeader';
import Separator from "./Separator";
import styles from './styles';
import { CardView } from "../CardView";
import Modal from "react-native-modalbox"
import Swipeout from 'react-native-swipeout';
import { IconToggle, Icon } from '../Icon'
import { showDialog, dismissDialog } from "../../actions";
import { connect } from 'react-redux'
//import { grab } from '../utils';


class Form extends React.PureComponent {
    static defaultProps = {
        cardStyle: true, //Asigna el estilo tipo tarjeta
        autofill: false, //auto llenado
        dialogForm: false //Tipo popup
    }
    constructor(props) {
        super(props)
        this.setSections = this.setSections.bind(this)
        this.getField = this.getField.bind(this)
        this.getFieldByKey = this.getFieldByKey.bind(this)
        this.scrollToField = this.scrollToField.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this)
        this._keyboardDidShow = this._keyboardDidShow.bind(this)
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
        this.blurFields = this.blurFields.bind(this)
        this.renderField = this.renderField.bind(this)
        this.onPressSubmit = this.onPressSubmit.bind(this)
        this._onEndReached = this._onEndReached.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
        this.renderHeader = this.renderHeader.bind(this)
        this.getSection = this.getSection.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.restore = this.restore.bind(this)
        this.setError = this.setError.bind(this)

        this.params = null; //variable para parametros del scroll to input
        this.state = {
            isKeyboardOpen: false,//Variable para indicar si el teclado esta abierto
            sections: this.setSections(props), //Genera las secciones del formulario
            refreshing: true, //si se realiza el refresh
            restore: false//si se desea restaurar el formulario
        }
    };
    /**
     * @author Michael Vargas
     * @description Asigna las secciones del formulario
     * @param {sections} Object contiene la palabra clave 'sections'
     */
    setSections({ sections }) {//Obtiene las secciones del formulario
        this.fieldRef = {}; //Crea el vector de referencias
        this.currentFocus = undefined //El 'key' del field que actualmente posee focus
        /**
         * Añade parametros necesarios para el SectionList y sus respectivos campos
         */
        this.totalFields = 0;//# total de campos
        if (!sections) sections = [{ data: new Array() }]; //Inicializa el array de secciones, para evitar warnings en el sectionList
        const num_sections = (sections.length == 0 && sections[0].data.length == 0) ? 0 : sections.length - 1;//Obtiene el # de secciones

        //Mapeo y retorno de secciones ajustadas
        return sections.map((element, index) => { //Renderizar las secciones ajustando los campos,...
            // let element = item;
            if (!element.dialogForm) {
                if (!element.fields && element.data) {
                    element.fields = element.data;
                }
                const num_fields = element.fields.length - 1; //Obtiene el # de campos de la seccion
                this.totalFields += num_fields;//Suma el numero de fields en la seccion y lo añade al total
                if (!element.max) element.max = 5
                let fields = element.fields.map((properties, indexField) => { //Obtiene los campos de la seccion y ajusta los parametros
                    const key = `field${index}${(indexField)}`; //Crea la clave unica para field, con el numero de la seccion y el numero del field ej: field01
                    const style = { marginHorizontal: 15, marginTop: 0, marginBottom: (indexField === num_fields) ? 8 : 0, }//añade la distancia entre el uitlimo field y el ultimo
                    const addIndex = { key, style, sectionIndex: index, itemIndex: indexField, focusNext: (index == num_sections && indexField == num_fields) ? false : true } //añade los index a cada field
                    this.fieldRef[key] = null; //Añade la referencia del field al objecto
                    return (indexField < num_fields) ? { ...properties, ...addIndex } : { ...properties, ...addIndex, }  //Verifica cual es el ultimo field y deshabilita focusNext
                })
                return { key: "" + index, data: fields, title: element.title, };
            } else {
                if (!element.items) element.items = [{ key: element.formSection + index, data: new Array() }];
                return {
                    key: "" + index,
                    data: element.items,
                    title: element.title,
                    subtitle: element.subtitle,
                    dialogForm: element.dialogForm,
                    multiple: element.multiple,
                    maxItems: element.maxItems,
                    minItems: element.minItems,
                    formSection: element.formSection,
                    button: element.button,
                    sections: this.setSections({ sections: element.sections }),
                }; //Retorna la seccion ajustada
            }

        })
    }
    /**
     * Obtiene la seccion 
     * @param {Number} index 
     */
    getSection(index) {
        return this.state.sections[index]
    }
    /**
     * Cuando el el formulario es desmontado
     */
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    /**
     * Cuando el formulario es montado
     */
    componentDidMount() {
        Keyboard.dismiss(); //Ocultar teclado
    }
    /**
     * Cuando el teclado se muestra
     */
    _keyboardDidShow(frames) {
        if (!this.state.isKeyboardOpen) {
            this.setState({ isKeyboardOpen: true });
            if (this.params) {
                this.scrollToField();
            }
        }
    }
    /**
     * Cuando el teclado se oculta
     */
    _keyboardDidHide() {
        if (this.state.isKeyboardOpen) {
            this.setState({ isKeyboardOpen: false });
            this.blurFields(this.currentFocus); //blur all fields
        }
    }
    /**
     * @description Unfocus the field
     * @param {string} fieldUnfocus key of field for blur
     */
    blurFields(fieldUnfocus) {
        if (this.fieldRef) {
            Object.keys(this.fieldRef).forEach((ref) => {
                if (ref === fieldUnfocus) {
                    const field = this.fieldRef[ref] ? this.fieldRef[ref].getRenderedComponent().getRenderedField().getRenderedInput() : undefined;
                    if (field) {
                        if (field.blur)
                            field.blur()
                    }
                    //console.log('blurField',field)
                    this.currentFocus = undefined;
                    this.params = undefined;
                }
            })
        }
    }
    /**
     * @description Get an instance of field
     * @param {number} sectionIndex # section
     * @param {number} itemIndex # field into section
     */
    getField(sectionIndex, itemIndex) {
        return (this.fieldRef[`field${sectionIndex}${(itemIndex)}`]) ? this.fieldRef[`field${sectionIndex}${(itemIndex)}`].getRenderedComponent().getRenderedField().getRenderedInput() : undefined;
    }
    /**
     * 
     * @param {string} key get field by your key
     */
    getFieldByKey(key) {
        return (this.fieldRef[key]) ? this.fieldRef[key].getRenderedComponent().getRenderedField().getRenderedInput() : undefined;
    }
    /**
     * @description scroll to input focus
     */
    scrollToField() {
        if (this.params == null || !this.sectionList) return;
        this.sectionList.scrollToLocation(this.params);
    }
    /**
     * Crea el componente del final del formulario, ejem: botton de submit
     */
    renderFooter = () => {
        let footerProps = undefined;
        if (this.props.button) {
            footerProps = {
                button: this.props.button,
                title: (this.props.button) ? this.props.button.label : 'Enviar',
                loading: this.props.submitting,
                onPress: this.onPressSubmit.bind(this),
            };
        }
        return (//Renderiza el boton de submit
            <View>
                {this.props.button && <SubmitButton  {...footerProps} />}
                { /* <Text>{JSON.stringify(this.props, null, 2)}</Text> */}
            </View>
        )
    }

    onPressSubmit = (e) => {
        const { anyTouched, pristine, submitting, initialValues, valid, handleSubmit } = this.props;
        if (!anyTouched && pristine) {
            Toast.show('Por favor llenar los campos del formulario', Toast.SHORT)
            return;
        }
        if (anyTouched || initialValues)
        handleSubmit(e)
        return
        if (!submitting) {
            if (valid) {
               if (anyTouched || initialValues)
                    handleSubmit(e)
            } else {
                /*let flds = new Array()
                this.props.sections.forEach((item) => { 
                    if (typeof item == 'object') {
                        if (!item.fields) item.fields = item.data
                        item.fields.forEach((fld, index) => {
                            flds.push(fld.name)
                            //if (index == 0) Toast.show(fld.name, Toast.SHORT)
                        })
                    }
                })

                this.props.dispatch({
                    type: '@@redux-form/TOUCH',
                    meta: { form: this.props.form, fields: flds },
                })*/
                // Toast.show('Verificar los errores en el formulario', Toast.SHORT)
                //this.props.dispatch(touch(this.props.form,flds))

            }
        } else {
            Toast.show('Procensado formulario...', Toast.SHORT)
        }
    }

    /**
     * @param {object} item render properly field to show into form
     * @param {number} index number field
     * @param {object} section data aditional of field
     */
    renderField = ({ item, index, section, separators }) =>
        (item && <Field {...item} title={item.help}
            inputRef={(ref) => this.fieldRef[item.key] = ref}
            onFocused={(event) => {
                this.currentFocus = item.key; //Guarda la clave del field actual
                this.params = { //Crea los parametros para el scroll
                    animated: this.state.isKeyboardOpen, //si el teclado esta abierto o en pantalla realiza animacion
                    sectionIndex: parseInt(section.key),//numero de index del a seccion
                    itemIndex: index, //numero de item -> index 
                    viewOffset: (section.title) ? 30 : 10, //offset igual al ancho del sectionHeader
                    viewPosition: 0 // 0: top, 1: down, 0.5: center
                }
                this.scrollToField() //realiza el scroll al componente
            }}
            restore={this.state.restore}
            onSubmitEditing={(this.props.button && (!item.focusNext)) ? this.onPressSubmit.bind(this) : undefined}
            disabled={this.props.submitting}
            hasError={(error) => {
                if (this.props.subForm) {
                    if (this.props.hasError) {
                        this.props.hasError(error)
                    }
                }
            }}
            onEnter={(event) => {
                // Toast.show(`${Number(section.key)} ${index} `, Toast.SHORT)
                //Function to get of TextField
                let field = this.getField(Number(section.key), index + 1);
                let params = undefined;
                if (field) { // is defined ?
                    if (field.focus) field.focus();
                    else Keyboard.dismiss()
                } else if (item.focusNext) { //is the last?
                    field = this.getField(Number(section.key) + 1, 0)
                    if (field) {
                        if (field.focus) field.focus()
                        else Keyboard.dismiss()
                    }
                }
            }}
        />)

    restore = () => {
        this.setState({ restore: true })
    }
    setError = (key, stateError, section) => {
        let found = false;
        this.setState(previousState => {
            let result = previousState.sections.map((element, index, arr) => {
                if (element.key === section.key) {
                    element.data[0].data = element.data[0].data
                        .map((item, index) => ({ key: `${section.formSection}${index}`, error: (item.key === key) ? stateError : item.error }))
                }
                return element
            })
            // alert(JSON.stringify(result2, null, 2))
            return { sections: result };
        })
        // Toast.show(`${key} here ${found}`, Toast.SHORT);
        /*let sections = this.state.sections.map((element,index) => {
            if(!element.dialogForm)
                return element;
            else {
                if(element.data[0].key == key)
                    element.data[0].data[index].error = stateError;
                return { ...element}
            }
        })*/
        //sections.data[0].data[index] = { ...section.data[0].data[index], error: stateError }
    }
    /**
     * @param {object} item render properly field to show into list subform
     * @param {number} index number field into subform
     * @param {object} section data aditional of field
     */
    renderItem = ({ item, index, section, separators }) => {
        // let sec = this.getSection(Number(section.key))
        //Toast.show(`${sec.dialogForm} ${section.key}`, Toast.SHORT)
        if (section.dialogForm) { //si es un subform creado con dialogForm
            // Buttons
            const { button, subtitle, items, formSection, maxItems } = section;
            if (!button)
                section.button = {}
            const renderDialog = (title, key) => {
                let fields = new Array();
                let sectionsDialog = new Array();
                this.state.sections.map((element, index2, arr) => {
                    if (element.key === section.key) {
                        element.sections = element.sections.map((item, indexSec) => {
                            item.data = item.data.map(({ name, ...properties }, indexField) => ({
                                name: `${key}.${name}`, ...properties
                            }))
                            return item;
                        })
                        sectionsDialog = element.sections;
                        //     alert(JSON.stringify(element.sections, null, 2))
                        /*element.sections = element.sections.map((element, index3) => {
                            element.fields.map(({ name, ...properties }, index) => {
                                fields.push({ name: `${key}.${name}`, ...properties })
                            })
                        })*/
                        //   sectionsDialog = element.sections;
                    }
                    return element
                })
                //sectionsDialog.push({ fields });
                const CustomDialog = formWithReduxForm({
                    form: this.props.form, //Guarda las variables del subform dentro del mismo formulario
                    touchOnChange: true, //Cambia el touched cuando se ejecuta el onChange
                    destroyOnUnmount: false,
                    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount,
                    sections: sectionsDialog,
                    screenProps: this.props.screenProps,
                    account: this.props.account,
                    navigation: this.props.navigation,
                    cardStyle: false,
                    autofill: true, //deshabilita el autoguardado
                    sections: sectionsDialog
                });
                return CustomDialog;
            }
            // Swipeout component
            const renderItem = ({ item, index }) => {
                const key = `${formSection}${index}`;
                const itemName = String(subtitle).replace('{n}', `${(index + 1)}`);
                const swipeoutBtns = [
                    {
                        text: 'Eliminar',
                        type: 'delete',
                        onPress: () => {
                            Alert.alert(
                                `Eliminar ${itemName}`,
                                `Esta seguro que desea eliminar el ${itemName}?`,
                                [
                                    { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                    {
                                        text: 'Eliminar', onPress: () => {
                                            //Toast.show(`${key}`, Toast.SHORT)
                                            section.sections.forEach((item) => {
                                                item.data.forEach((item, index) => {
                                                    this.props.dispatch(change(this.props.form, `${key}.${item.name}`, ''))
                                                })
                                            })
                                            this.setState(previousState => {
                                                let result = previousState.sections.map((element, index, arr) => {
                                                    if (element.key === section.key) {
                                                        element.data[0].data = element.data[0].data
                                                            .filter((item, index) => (item.key != key))
                                                            .map((item, index) => ({ key: `${formSection}${index}`, error: item.error }))
                                                    }
                                                    return element
                                                })
                                                // alert(JSON.stringify(result2, null, 2))
                                                return { sections: result };
                                            })
                                        }
                                    },
                                ],
                                { cancelable: true }
                            )
                        }
                    },
                    {
                        text: 'Editar',
                        type: 'primary',
                        onPress: () => {
                            this.props.dispatch(showDialog({
                                dialogTitle: itemName.toUpperCase() + ':', //titulo
                                renderDialog: renderDialog(itemName, key),
                                form: this,
                                section: section,
                                key,
                            }))
                        }
                    }
                ];
                return (
                    <Swipeout left={swipeoutBtns} autoClose={true}>
                        <View style={{ backgroundColor: 'white', flexDirection: 'row', flex: 1, alignItems: 'center', paddingTop: (index == 0 && button && button.position == 'top') ? 15 : 0 }} >
                            <Text style={{ flex: 1, marginLeft: 17, color: 'black', fontSize: 16, fontWeight: '100' }} >{itemName}</Text>
                            {item.error && <Icon name='alert-circle' size={20} style={{ marginRight: 5 }} color='rgb(213,0,0)' />}
                            <Icon name='chevron-right' size={32} style={{ marginRight: 5 }} />
                        </View>
                    </Swipeout>)
            };

            const renderButton = (position) => (
                (button && button.position == position) ? (
                    <Button title={button.label}
                        onPress={() => {
                            this.setState(previousState => {
                                if (section.data[0].data.length >= maxItems) {
                                    Toast.show(`Máximo ${maxItems} ${section.title}`);
                                    return;
                                }
                                const key = `${formSection}${section.data[0].data.length}`
                                const result = previousState.sections.map((element, index, arr) => {
                                    if (element.key === section.key)
                                        element.data[0].data.push({ key })
                                    return element
                                })
                                // alert(JSON.stringify(result, null, 2))
                                return { sections: result };
                            });
                            //Toast.show(`${section.title} añadido`,Toast.SHORT);
                        }}
                        rounded backgroundColor={'forestgreen'}
                        buttonStyle={{ margin: 15 }} {...button} />) : null)

            return (
                <FlatList
                    ListHeaderComponent={renderButton('top')}
                    data={section.data[0].data}
                    extraData={this.state.sections}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <Divider />}
                    ListFooterComponent={renderButton('bottom')}
                />)
        } else {
            return this.renderField({ item, index, section, separators }) //rendiriza como un field normal
        }

    }

    _onRefresh() {
        Toast.show('Reporte actualizado', Toast.SHORT)

    }

    _onEndReached({ distanceFromEnd }) {
        this.setState({ refreshing: false })
        //Toast.show(`end: ${distanceFromEnd}`,Toast.SHORT)
    }

    renderScrollComponent = (props) => (<ScrollView  {...props} style={styles.scroll} contentContainerStyle={styles.contentContainer} />);

    renderHeader = () => <Header title={this.props.title} />

    render() {
        const { title, button, formSection, isNeedNetwork, anyTouched, valid, invalid, dirty, initialValues, handleSubmit, pristine, submitting, reset, submitSucceeded, dispatch, sections, ...sectionListProps } = this.props;
        const { network, account } = this.props.screenProps;

        return (
            <Wrapper formSection={formSection}>
                <SectionList
                    ref={ref => this.sectionList = ref}
                    style={styles.scroll}
                    contentContainerStyle={(this.props.cardStyle) ? styles.contentContainer : { backgroundColor: 'white' }}
                    keyboardShouldPersistTaps='handled'
                    scrollEnabled={true}
                    extraData={this.state.sections}
                    sections={this.state.sections}
                    initialNumToRender={parseInt(this.totalFields * 0.70)} //carga por defecto el 70% del número de campos
                    stickySectionHeadersEnabled={true} //activa las etiquetas de encabezado
                    scrollEventThrottle={150}
                    onEndReachedThreshold={10}
                    renderItem={this.renderItem}
                    renderSectionHeader={SectionHeader}
                    ListEmptyComponent={EmptyList}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this._onEndReached}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                    SectionSeparatorComponent={Separator}
                    {...sectionListProps} //Asigna las propiedades sobrantes al sectionList
                />
            </Wrapper>
        )
    }
}
/**
 * Submit por default para pruebas
 * */
const defaultSubmit = (values, props, dispatch) => {
    alert(JSON.stringify(values, null, 2))
}
/**
 * @param formConfig objecto de configuracion del formulario
 */
const formWithReduxForm = (formConfig) => {
    //const getOtherProps = otherProps(form);
    //walert(JSON.stringify(formConfig,null,2));
    const { form, button, ...otherConfig } = formConfig;
    return reduxForm({ form, onSubmit: (button) ? (button.onSubmit) ? button.onSubmit : defaultSubmit : defaultSubmit, button, ...otherConfig })(Form);
}


export default formWithReduxForm