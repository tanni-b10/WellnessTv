import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, ScrollView } from 'react-native'
import React, { useState, useEffect, } from 'react'
import useRequest from '../hook/useRequest'; 

const Home = ({ navigation }) => {
  const { fetchData } = useRequest();
  const [categories, setCategories] = useState([1, 2]);
  const [collections,setCollections]=useState([])

  const fetchDataloader1 = async () => {
    const method = 'GET';
    const body = {};
    await fetchData('https://api.thewellnesscorner.com/wellness-tv/categories', method, body, (x) => setCategories(x));

  }
  const fetchDataloader2 = async () => {
    const method = 'GET';
    const body = {};
    await fetchData('https://api.thewellnesscorner.com/wellness-tv/collections', method, body, (x) => setCollections(x));
  }
  useEffect(() => {
    fetchDataloader1();
    fetchDataloader2();
  }, [])
  return (
    <ScrollView style={{ padding: 10 }}>

      <View style={{borderRadius:10,backgroundColor:'#00C8AC',width:'100%',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Feed')}>
          <Text style={{fontSize:16,fontWeight:500,color:'white',padding:12}}> View our FEED </Text>
        </TouchableOpacity>
      </View>
      
      <View>
        <Text style={{ marginLeft: 10, marginBottom: 5, fontWeight: 400, color: 'black', fontSize: 18 }}>
          Browse By Category
        </Text>
        <Text style={{ color:'#000000CE',marginLeft: 10, marginBottom: 8, }}>
          Explore all the wellness sessions on The Wellness Corner
        </Text>
      </View>

      {
        categories.length == 0 ? <ActivityIndicator />
          : (
            <FlatList
              data={categories.items}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${index}`}
              scrollEnabled={false}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={()=>navigation.navigate('CategoryDetails',{pageName:item.fields.name})} style={{
                     marginBottom: 17, flex: 1,
                    flexDirection: 'row', paddingLeft: 0,justifyContent: 'center', alignItems: 'center'
                  }}>
                    <Image style={{ height: 140, width: '95%', borderRadius: 10 }} src={"https:" + item.fields.image.fields.file.url} />
                  </TouchableOpacity>
                )
              }
              }
            />
          )
      }

      <View>
        <Text style={{ marginLeft: 10, marginBottom: 5, fontWeight: 400, color: 'black', fontSize: 18 }}>
          Explore Collections
        </Text>
        <Text style={{ color:'#000000CE',marginLeft: 10, marginBottom: 8, }}>
          Explore all the collections of workouts & meditations curated y our community of health experts
        </Text>
      </View>

      {
        categories.length == 0 ? <ActivityIndicator />
          : (
            <FlatList
              data={collections}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${index}`}
              scrollEnabled={false}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={()=>navigation.navigate('CollectionDetails',{pageName:item.fields})} style={{
                    marginLeft: 15, marginBottom: 17, flex: 1,
                    flexDirection: 'row', paddingLeft: 0
                  }}>
                    <Image style={{ height: 300, width: '95%', borderRadius: 10 }} 
                    src={"https:" + item.fields.image.fields.file.url} />
                    <Text style={{ fontSize: 20, color: 'black' }}>
                    </Text>
                  </TouchableOpacity>
                )
              }
              }
            />
          )
      }
    </ScrollView>
  )
}

export default Home