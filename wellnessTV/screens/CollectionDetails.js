import { Text, FlatList, Image, ScrollView } from 'react-native'
import React from 'react'
import DisplayBlock from '../component/DisplayBlock';

const CollectionDetails = ({ navigation, route }) => {
const { pageName } = route.params;
return (
    <ScrollView style={{flex:1}}>
        <Image style={{ height: 350, width: '100%' }} src={`https:${pageName.image.fields.file.url}`}/>
        <Text style={{padding:15,color:'#000000CE'}}>{pageName.description}</Text>

            <FlatList
              data={pageName.videos}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${index}`}
              scrollEnabled={false}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                    <DisplayBlock  
                    onPressDisplay={()=> navigation.navigate('VideoScreen',
                    {title:item.fields.title,description:item.fields.description, 
                    image:item.fields.image.fields.file.url,
                    url:item.fields.url})}
                    title={item.fields.title} 
                    description={item.fields.description} 
                    image={item.fields.image.fields.file.url}/>
                )
              }
              }
            />
    </ScrollView>
)
}

export default CollectionDetails