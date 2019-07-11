import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default class FaceCamera extends React.Component {
    state = {
        hasCameraPermission: null
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    handleFacesDetected(e) {
        console.log(e)
    }
    snap = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          try{
              let detect = await this.detectFaces(photo.uri)
              if(detect.faces.length){
                  alert('Face Auth Done')
                  this.props.faceAuth()
              }else{alert('Pleas Capture Your face Image to access Quiz')}
          }catch(e){
            console.log(e)
          }
          
        }
      };
      detectFaces = async imageUri => {
        const options = { mode: FaceDetector.Constants.Mode.accurate };
        return await FaceDetector.detectFacesAsync(imageUri, options);
      };
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={Camera.Constants.Type.front}
                        ref={ref => {
                            this.camera = ref;
                        }}
                    />
                    <Button onPress={()=>{this.snap()}} title='Take Your Picture for authontication' />
                </View>
            );
        }
    }
}