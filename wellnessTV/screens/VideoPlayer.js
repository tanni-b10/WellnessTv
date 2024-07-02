import { View, Text, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import IonIcon from 'react-native-vector-icons/Ionicons'

import Orientation from 'react-native-orientation-locker';

const VideoPlayer = ({ navigation, route }) => {
  const { url } = route.params;

  const [clicked, setClicked] = useState(false);
  const [puased, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false); 
  const ref = useRef();
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <View style={{ backgroundColor:'black', flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
        onPress={() => {
          setClicked(true);
        }}>
        <Video
          paused={puased}
          source={{
            uri: url,
          }}
          ref={ref}
          onProgress={x => {
            // console.log(x);
            setProgress(x);
          }}

          muted
          style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
          resizeMode="contain"
        />
        {clicked && (
          <TouchableOpacity
            style={{
              flex: 1,

              right: 0, left: 0, bottom: 0, marginHorizontal: 28,
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row', alignItems: "center", 
            justifyContent: "space-between", marginBottom: 30, marginHorizontal: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', 
              justifyContent: 'space-between', flex: 1, paddingHorizontal: 16, }}>
                <TouchableOpacity
                  style={{ marginRight: 16 }}
                  onPress={() => {
                    ref.current.seek(parseInt(progress.currentTime) - 10);
                  }}>
                  <IonIcon name='play-skip-back-outline' color='white' size={24} />

                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginRight: 16 }}
                  onPress={() => {
                    setPaused(!puased);
                  }}>
                  {puased ?
                    <IonIcon name='play' color='white' size={24} />
                    :
                    <IonIcon name='pause-outline' color='white' size={24} />
                  } 
                </TouchableOpacity>
                <TouchableOpacity

                  onPress={() => {
                    ref.current.seek(parseInt(progress.currentTime) + 10);
                  }}>
                  <IonIcon name='play-skip-forward-outline' color='white' size={24} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => {
                if (fullScreen) {
                  Orientation.lockToPortrait();
                } else {
                  Orientation.lockToLandscape();
                }
                setFullScreen(!fullScreen)
              }}
              >
                {fullScreen?
                    <IonIcon name='contract-outline' size={24} color='white' />:
                    <IonIcon name='expand-outline' size={24} color='white' />
                }
                
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center'
              }}>
              <Text style={{ color: 'white' }}>
                {format(progress.currentTime)}
              </Text>
              <Slider
                style={{ width: '80%', height: 40 }}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#fff"
                onValueChange={(x) => {
                  ref.current.seek(x);
                }}
              />
              <Text style={{ color: 'white' }}>
                {format(progress.seekableDuration)}
              </Text>
            </View>


          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
}


export default VideoPlayer;


