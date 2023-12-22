import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';

type ListItem = {
  id: number;
  imagePath?: string;
  label?: string;
  sublabel?: string;
};

const HorizontalList: FC<{
  data: ListItem[];
  onPressItem?: (id: number) => void;
}> = ({data, onPressItem}) => {
  return (
    <View style={{}}>
      <FlatList
        horizontal
        data={data}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              style={{
                width: 100,
                height: 150,
                margin: 5,
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: '#8899AA',
              }}
              onPress={() => {
                onPressItem && onPressItem(item.id);
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                }}
                src={
                  item.imagePath
                    ? `https://image.tmdb.org/t/p/original${item.imagePath}`
                    : 'https://via.placeholder.com/100x150.png?text=No+Image'
                }
              />
            </TouchableOpacity>
            {item.label && (
              <Text
                style={{
                  color: '#8899AA',
                  fontSize: 12,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: 100,
                }}>
                {item.label}
              </Text>
            )}
            {item.sublabel && (
              <Text
                style={{
                  color: '#8899AA',
                  fontSize: 10,
                  textAlign: 'center',
                  width: 100,
                }}>
                {item.sublabel}
              </Text>
            )}
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default HorizontalList;
