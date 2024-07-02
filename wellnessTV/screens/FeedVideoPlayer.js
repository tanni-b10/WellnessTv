import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, {useRef, useState } from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import IonIcon from 'react-native-vector-icons/Ionicons'

const FeedVideoPlayer = ({ route }) => {
    const { item } = route.params;
    const [clicked, setClicked] = useState(false);
    const [puased, setPaused] = useState(false);
    const [progress, setProgress] = useState(null);
    const [fullScreen, setFullScreen] = useState(false)
    const ref = useRef();
    const format = seconds => {
        let mins = parseInt(seconds / 60)
            .toString()
            .padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <View style={{ flex: 1, }}>
            <TouchableOpacity
                style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
                onPress={() => {
                    setClicked(true);
                }}>
                <Video
                    paused={puased}
                    source={{
                        uri: item.videoUrl,
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
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", marginBottom: 30, marginHorizontal: 16 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingHorizontal: 16, }}>
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
                                <IonIcon name='scan-outline' size={24} color='white' />
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
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 17, fontWeight: 600, color: 'black' }}>{item.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text >{item.views} views   </Text>
                    <Text>{item.uploadTime}</Text>
                </View>
                {item.isLive&& <Text style={{justifyContent:'flex-end',fontWeight:500,color:'red'}}>LIVE</Text>}
                <View style={{ marginTop: 20, flexDirection: 'row' }}>
                    <Image src={item.thumbnailUrl} style={{ marginRight: 5, height: 40, width: 40, borderRadius: 15 }} />
                    <View>
                        <Text style={{ marginLeft: 10, color: 'black' }}>{item.author}</Text>
                        <Text style={{ marginLeft: 10 }}>{item.subscriber}</Text>
                    </View>
                </View>
                <Text style={{ marginTop: 10,marginBottom:25 }}>{item.description}</Text>
                <View style={{ alignSelf: 'center', marginTop: 30, justifyContent: 'center', width: 300, height: 35, marginTop: 10, alignItems: 'center', backgroundColor: '#00C8AC', borderRadius: 16 }}>
                    <Text style={{ fontSize: 16, color: 'white', alignSelf: 'center' }}>subscribe to {item.author}</Text>
                </View>
                
            </View>
        </View>
    )
}

export default FeedVideoPlayer