import { View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'

const VideoScreen = ({navigation,route}) => {
    const {title,description,image,url}= route.params;
  return (
    <View style={{ flex: 1, marginBottom:5 }}>
            <Image style={{ height: 220, width: '100%', borderRadius: 5 }}
            src={"https:" + image} />
            <Text style={{ paddingTop:15,padding:10, color: 'black', fontWeight: 500 ,fontSize:22,justifyContent:'space-around'}}>{title}</Text>
            <Text style={{ paddingTop:0,padding:10,fontSize: 11, color: '#000000CE' }}>{description}</Text>
            <View style={{flex:1,justifyContent:'flex-end'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('VideoPlayer',{url:url})}
            style={{alignItems:'center',justifyContent:'center',
            paddingVertical:12,width:'100%',backgroundColor:'#00C8AC',alignSelf:'flex-end',}}>
                <Text style={{fontWeight:500,fontSize:20,color:'white'}}>
                  WATCH NOW
                </Text>
            </TouchableOpacity>
            </View>
    </View>
  )
}

export default VideoScreen