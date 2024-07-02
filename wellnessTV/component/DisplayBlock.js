import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, ScrollView } from 'react-native'
import React, { useState, useEffect, } from 'react'
import useRequest from '../hook/useRequest'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoScreen from '../screens/VideoScreen';

const DisplayBlock = ({ onPressDisplay,title, description, image }) => {
    return (
    <TouchableOpacity onPress={onPressDisplay} style={{ flex: 1, padding: 15, marginBottom:5,  }}>
            <Image style={{ height: 220, width: '95%', borderRadius: 5 }}
            src={"https:" + image} />
            <Text style={{ color: 'black', fontWeight: 500 ,justifyContent:'space-around'}}>{title}</Text>
            <Text style={{ fontSize: 11, color: '#000000CE' }}>{description}</Text>
    </TouchableOpacity>
    )
}

export default DisplayBlock