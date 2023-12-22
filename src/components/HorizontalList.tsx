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
}> = ({data}) => {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{
            width: 110,
            height: 150,
            margin: 5,
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: '#8899AA',
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
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default HorizontalList;
