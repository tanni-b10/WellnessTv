import { FlatList, ActivityIndicator,ScrollView } from 'react-native'
import React, { useState, useEffect, } from 'react'
import useRequest from '../hook/useRequest';
import DisplayBlock from '../component/DisplayBlock';

const CategoryDetails = ({ navigation, route }) => {
    const { pageName } = route.params;
    const [categoryDetails, setCategoryDetails] = useState([])
    const { fetchData } = useRequest();

    const fetchDataloader1 = async () => {
      const method = 'GET';
      const body = {};
      const modifiedUrl = `https://api.thewellnesscorner.com/wellness-tv/categories/${pageName.replace(/\s+/g, '-').toLowerCase()}`;
      await fetchData(modifiedUrl, method, body, (x) => setCategoryDetails(x));
    }
    useEffect(() => {
      fetchDataloader1();
    }, [])
  return (
    <ScrollView style={{ flex: 1 }}>
      {
        categoryDetails.length == 0 ? <ActivityIndicator />
          : (
            <FlatList
              data={categoryDetails}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${index}`}
              scrollEnabled={false}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (

                  <DisplayBlock onPressDisplay={() => navigation.navigate('VideoScreen',
                    {
                      title: item.fields.title, description: item.fields.description,
                      image: item.fields.image.fields.file.url,
                      url:item.fields.url
                    })}
                    title={item.fields.title}
                    description={item.fields.description}
                    image={item.fields.image.fields.file.url} />
                )
              }
              }
            />
          )
      }
    </ScrollView>
  )
}

export default CategoryDetails