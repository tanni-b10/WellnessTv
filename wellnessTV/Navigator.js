import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import CategoryDetails from './screens/CategoryDetails';
import CollectionDetails from './screens/CollectionDetails';
import VideoScreen from './screens/VideoScreen';
import VideoPlayer from './screens/VideoPlayer';
import Feed from './screens/Feed';
import FeedVideoPlayer from './screens/FeedVideoPlayer';
import { StatusBar } from 'react-native';
const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
      <NavigationContainer>
        <StatusBar backgroundColor={'#00C8AC'} barStyle={'dark-content'} />
        <Stack.Navigator screenOptions={{  headerStyle: {backgroundColor: '#00C8AC'}}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
          <Stack.Screen name="CollectionDetails" component={CollectionDetails} />
          <Stack.Screen name="VideoScreen" component={VideoScreen} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
          <Stack.Screen name="FeedVideoPlayer" component={FeedVideoPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
   
  );
}

export default Navigator;