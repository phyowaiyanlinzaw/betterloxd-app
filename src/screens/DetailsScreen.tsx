import {Text, Pressable, ActivityIndicator, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {RootStackProps} from '@/types/navigationType';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import useGetMovieDetails from '@/hooks/useGetMovieDetails';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '@/components/ScreenHeader';
import {getDetailsScreenConst} from '@/utils/getDetailsScreenConst';
import PosterImage from '@/components/PosterImage';
import DetailsSection from '@/components/DetailsSection';

type DetailsScreenProps = RootStackProps<'DetailsScreen'>;

type Navigation = DetailsScreenProps['navigation'];

export type PlaylistType = {
  name: string;
  cover: string;
  artist: string;
  plays: number;
};

const DetailsScreen: FC<DetailsScreenProps> = ({route}) => {
  const navigation = useNavigation<Navigation>();
  const {formatter, AnimatedLinearGradient, posterSize, headerTop} =
    getDetailsScreenConst();

  const {movieDetailsData, isLoading} = useGetMovieDetails(
    route.params.movieId,
  );

  const inset = useSafeAreaInsets();
  const sv = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      'worklet';
      sv.value = event.contentOffset.y;
    },
  });

  const initialTranslateValue = posterSize;

  const animatedScrollStyle = useAnimatedStyle(() => {
    return {
      paddingTop: initialTranslateValue,
    };
  });

  const layoutY = useSharedValue(0);
  const stickyElement = useAnimatedStyle(() => {
    return {
      backgroundColor: 'black',
      transform: [
        {
          translateY: interpolate(
            sv.value,
            [
              layoutY.value - (headerTop + inset.top) - 1,
              layoutY.value - (headerTop + inset.top),
              layoutY.value - (headerTop + inset.top) + 1,
            ],
            [0, 0, 1],
          ),
        },
      ],
    };
  });
  return isLoading ? (
    <ActivityIndicator
      size={50}
      color={'#fff'}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B2126',
      }}
    />
  ) : (
    <Animated.View style={[tailwind.style('flex-1 bg-black')]}>
      <ScreenHeader
        sv={sv}
        movie={movieDetailsData!}
        onBackNav={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
      />
      <PosterImage
        sv={sv}
        posterPath={movieDetailsData?.poster_path}
        movie={movieDetailsData!}
        backdropPath={movieDetailsData?.backdrop_path}
      />

      <Animated.View style={tailwind.style('flex-1')}>
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={tailwind.style('flex-1')}
          showsVerticalScrollIndicator={false}>
          <Animated.View style={[animatedScrollStyle, tailwind.style('pb-10')]}>
            <Animated.View
              style={
                // tailwind.style('flex items-start justify-center pb-3 pt-4 bg-black')
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: 10,
                  paddingTop: 10,
                }
              }>
              <Pressable
                style={tailwind.style('px-10 items-start rounded-full')}>
                <Text
                  style={{
                    color: '#8899AA',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {movieDetailsData?.title}
                </Text>
              </Pressable>
            </Animated.View>
            {/* Songs List */}
            <DetailsSection
              movie={movieDetailsData!}
              onPressSimiliarMovie={id => {
                navigation.navigate('DetailsScreen', {
                  movieId: id,
                });
              }}
            />
          </Animated.View>
        </Animated.ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

export default DetailsScreen;
