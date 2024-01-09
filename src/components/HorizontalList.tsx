import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';

type ListItem = {
  id: number;
  imagePath?: string;
  label?: string;
  sublabel?: string;
};

const HorizontalList: FC<{
  data: ListItem[];
  onPressItem?: (id: number) => void;
  onEndReachFetchFunc?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}> = ({
  data,
  onPressItem,
  hasNextPage,
  isFetchingNextPage,
  onEndReachFetchFunc,
}) => {
  return (
    <View
      style={{
        marginBottom: 10,
      }}>
      <FlatList
        horizontal
        onEndReached={() =>
          hasNextPage && onEndReachFetchFunc && onEndReachFetchFunc()
        }
        ListFooterComponent={() =>
          isFetchingNextPage && (
            <View
              style={{
                width: 100,
                height: 150,
                margin: 5,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <ActivityIndicator
                size="large"
                color="#8899AA"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          )
        }
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
              <FastImage
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{
                  uri: item.imagePath
                    ? `https://image.tmdb.org/t/p/original${item.imagePath}`
                    : 'https://via.placeholder.com/100x150.png?text=No+Image',
                }}
                resizeMode={FastImage.resizeMode.cover}
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
        keyExtractor={item => (Math.random() * 100 * item.id).toString()}
      />
    </View>
  );
};

export default HorizontalList;
