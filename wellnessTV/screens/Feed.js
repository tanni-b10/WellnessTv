import { View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'
import feedData from '../assets/videos 1.json'
import { Dimensions } from "react-native";
import Video from 'react-native-video';
import {
  OffsetYProvider,
  IndexProvider,
  InCenterConsumer
} from "@n1ru4l/react-in-center-of-screen";
const { height: windowHeight } = Dimensions.get("window");

const boxHeight = windowHeight / 3;

const Feed = ({ navigation }) => {
  const more = useState(false);
  return (
    <View style={{ backgroundColor: 'white' }}>
      <OffsetYProvider

        columnsPerRow={1}
        listItemHeight={boxHeight}
        centerYStart={(windowHeight * 1) / 3}
        centerYEnd={(windowHeight * 2) / 3}
      >
        {({ setOffsetY }) => (
          <FlatList
            data={feedData}
            onScroll={ev => {
              setOffsetY(ev.nativeEvent.contentOffset.y);
            }}
            keyExtractor={({ item, index }) => index}
            renderItem={({ index, item }) => (
              <IndexProvider index={index}>
                {() => (
                  <View >
                    <View style={{ height: boxHeight }}>
                      <InCenterConsumer>
                        {({ isInCenter }) =>
                          isInCenter ? (
                            <TouchableOpacity onPress={() => navigation.navigate('FeedVideoPlayer', { item: item })}>
                                
                                <Video paused={false}

                                  source={{ uri: item?.videoUrl }}
                                  style={{ width: '100%', height: '100%' }}
                                  resizeMode={'cover'}
                                />
                          </TouchableOpacity>
                          ) : (
                            <TouchableOpacity style={{pddding:10}}onPress={() => navigation.navigate('FeedVideoPlayer', { item: item })}>
                               
                                <Video paused={true}
                                  source={item.videoUrl}
                                  style={{ width: '100%', height: '100%' }}
                                  resizeMode={'cover'}
                                />
                            </TouchableOpacity>
                          )
                        }
                      </InCenterConsumer>
                    </View>
                    <View style={{ marginBottom: 20, backgroundColor: 'white' }}>
                      <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                        <Image src={item.thumbnailUrl} style={{ marginRight: 5, height: 40, width: 40, borderRadius: 15 }} />
                        <View>
                          <Text style={{ fontSize: 18, color: 'black' }}>{item.title}</Text>
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>{item.author}</Text>
                            {!item.isLive && <Text>{item.duration}</Text>}
                            {item.isLive && <Text style={{ justifyContent: 'flex-end', fontWeight: 500, color: 'red' }}>LIVE</Text>}
                          </View>

                        </View>
                      </View>
                    </View>
                  </View>

                )}
              </IndexProvider>
            )}
          />
        )}
      </OffsetYProvider>
    </View>
  )
}

export default Feed


