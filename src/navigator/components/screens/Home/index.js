import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableWithoutFeedback, CheckBox } from 'react-native'
import ImagePicker from "react-native-image-picker";
import FastImage from "react-native-fast-image"
import realm, { ACCOUNT_SCHEMA } from "../../../../config/database";
import { ActionButton } from 'react-native-material-ui';
import DialogAndroid from 'react-native-dialogs';
import { dialogAction } from "../../../../actions"
import { reset } from "redux-form";
//import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { color } from '../../../../config';
import  RadioButton  from '@rh389/react-native-radio-button'

const futch = (url, opts = {}, onProgress) => {
  console.log(url, opts)
  return new Promise((res, rej) => {
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    for (var k in opts.headers || {})
      xhr.setRequestHeader(k, opts.headers[k]);
    xhr.onload = e => res(e.target);
    xhr.onerror = rej;
    if (xhr.upload && onProgress)
      xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    xhr.send(opts.body);
  });
}
const originalFetch = fetch
global.fetch = (url, opts) => {
  console.log(opts.onProgress)
  if (opts.onProgress && typeof opts.onProgress === 'function') {
    return futch(url, opts, opts.onProgress)
  } return originalFetch(url, opts)
}

export class Home extends Component {
  constructor(props) {
    super(props)
    this.api_key = realm.objectForPrimaryKey(ACCOUNT_SCHEMA, 0).api_key
    this.state = {
      progress: 0,
      update: 0,
      text: '',
      checked : false

    }
    this.onSelect = this.onSelect.bind(this)

    // alert(`${JSON.stringify(props,null,2)}`)
  }
  onSelect(index, value) {
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
  }

  render() {

    var options = {
      title: 'Seleccionar imagen',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tomar foto',
      chooseFromLibraryButtonTitle: 'Escoger de la galeria',
      quality: 0.5,
      storageOptions: {
        cameraRoll: true,
        skipBackup: true,
        waitUntilSaved: true,
        path: 'images'
      }
    };
    const { account } = this.props.screenProps;
    return (
      <View>
        <View style={{ margin: 20 }}>
        <RadioButton
        value = {!this.state.checked}
         onValueChange={(event) => {
          this.setState({checked : !this.state.checked})
        }} />
        <CheckBox text={'asdasdasd'}  value = {this.state.checked}
         onValueChange={(event) => {
          this.setState({checked : !this.state.checked})
        }} />
          {/* <RadioGroup
            size={24} 
            thickness={3}
            selectedIndex={1}
            onSelect={(index, value) => this.onSelect(index, value)}
            style={{ flexDirection: 'row' }}
          >
             <RadioButton value={true} >
              <Text>SI</Text>
            </RadioButton>
            <RadioButton value={false}>
              <Text>NO</Text>
            </RadioButton>
          </RadioGroup> */}
         
          <Text>{this.state.text}</Text>
        </View>
        <Button title='Open ImagePicker' onPress={() => {
          let options = {
            title: 'Hello, World!',
            content: 'I\'m just simple Dialog',
            input: {
              hint: 'Test 2',
              maxLength: 10
            },
            positiveText: 'OK',
            negativeText: 'Cancel'
          };
          this.props.navigation.dispatch(dialogAction({
            open: true,
            renderDialog: () => {
              return (<Text>Hereee Yuppp!</Text>)
            }
          }))
          setTimeout(() => {
            this.props.navigation.dispatch(dialogAction({
              open: false,
            }))
          }, 3000)
          //this.props.navigation.navigate('Dialog')
          // var dialog = new DialogAndroid();
          // dialog.set(options);
          // dialog.show();
          /*ImagePicker.showImagePicker(options, async (response) => {
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
              alert(`${JSON.stringify(response, (key, value) => (key == 'data') ? (value.length - 1) * 8 : value, 2)} `)
              //let source = { uri: response.uri };
              const data = new FormData();
              data.append('inputtest', 'asdasd'); // get in $_REQUEST
              data.append('image', { //get in $_FILES
                uri: response.uri,
                type: 'image/jpg', // or photo.type
                name: 'testPhotoName'
              });

              fetch("https://www.procontroles.com/report_manager/v1/upload", {
                method: 'POST',
                body: data,
                onProgress: (e) => {
                  const progress = e.loaded / e.total;
                  //console.log(progress);
                  this.setState({
                    progress: (progress < 1) ? progress * 100 : 'https://www.procontroles.com/report_manager/v1/image/1' + '?' + Date.now()
                  });
                }
              }).then((res) => console.log(res), (e) => console.log(e))
              //then(res => res.json())
              //  .then(result => {
              //    alert(`${JSON.stringify(result)} `)
              //  });
              // You can also display the image using data:
              let source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
          });*/
        }}></Button>
        {(typeof account === 'object' && account.image == true) ?
          <Image style={{ height: 200, width: 200 }}
            resizeMode='contain'
            source={{ uri: `data:image/jpg;base64,${realm.objectForPrimaryKey(ACCOUNT_SCHEMA, 0).image}` }} /> : null}
        {/* <FastImage
          style={{ height: 200, width: 200 }}
          source={{
            uri: (typeof this.state.progress != 'string') ? 'https://www.procontroles.com/report_manager/v1/image/1' : this.state.progress,
            headers: { Authorization: this.api_key },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        /> */}
        <Text>{this.state.progress}</Text>
        {/* <Text>Hello World {JSON.stringify(this.props, null, 2)}</Text> */}
        <ActionButton onPress={() => {
          this.props.navigation.navigate('Report')

        }} />
      </View>
    )
  };
};
/*export const Home = (props) => {
  return (
    <View>
    <Text>Hello World... {JSON.stringify(props, null, 2)}</Text>
  </View>
  )
 }
<Image source={this.state.avatarSource} style={{ height: 200, width: 200 }} resizeMode='cover' />

 */