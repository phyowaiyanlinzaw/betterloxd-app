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

export const playlist: PlaylistType[] = [
  {
    name: 'Oasis',
    plays: 39672083,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/11/f78c39b4bb6313ddd0354bef896c591bfb490ff8-1024x1024.jpg',
    artist: 'Makzo',
  },
  {
    name: 'Beaver Creek',
    plays: 17185846,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg',
    artist: 'Aso, Middle School, Aviino',
  },
  {
    name: 'Daylight',
    plays: 89740943,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg',
    artist: 'Aiguille',
  },
  {
    name: 'Keep Going',
    plays: 97153065,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg',
    artist: 'Swørn',
  },
  {
    name: 'Going Back',
    plays: 70181177,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/10/737bb830d34592344eb4a2a1d2c006cdbfc811d9-1024x1024.jpg',
    artist: 'Swørn',
  },
  {
    name: 'Bliss',
    plays: 59009520,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/09/5bff1a6f1bd0e2168d29b4c841b811598135e457-1024x1024.jpg',
    artist: 'Misha, Jussi Halme',
  },
  {
    name: 'Growing Apart',
    plays: 89181139,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg',
    artist: 'Swørn',
  },
  {
    name: 'Sails',
    plays: 89606858,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/06/49f6e32ca521fbad46a1b281e3893cf6254bf11d-1024x1024.jpg',
    artist: 'Strehlow, Aylior',
  },
  {
    name: "Cruisin'",
    plays: 4523646,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/07/8404541e3b694d16fd79433b142ed910f36764dd-1024x1024.jpg',
    artist: 'Cloudchord, G Mills',
  },
  {
    name: 'Maple Leaf Pt.2',
    plays: 23571103,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/09/2899f7cc22ab12e17d0119819aac3ca9dbab46e6-1024x1024.jpg',
    artist: 'Philanthrope',
  },
  {
    name: 'Nightfall',
    plays: 26951507,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg',
    artist: 'Aiguille',
  },
  {
    name: 'Reflection',
    plays: 89000818,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg',
    artist: 'Swørn',
  },
  {
    name: 'Leaving For Good',
    plays: 14346252,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/07/7a84488fd87082302cb69c05262f2f3f87e93018-1024x1024.jpg',
    artist: 'Hanz',
  },
  {
    name: 'Eastway',
    plays: 36507029,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/07/c572841e8431cebc120dffed4f92119f723dd954-1024x1024.jpg',
    artist: 'Dontcry, Nokiaa',
  },
  {
    name: 'Wake up',
    plays: 4804932,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/07/2c3bd458bfb0713c89f991d1ce469523e95e3b53-1024x1024.jpg',
    artist: 'Evil Needle',
  },
  {
    name: 'Under the City Stars',
    plays: 9269308,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg',
    artist: 'Aso, Middle School, Aviino',
  },
  {
    name: 'Velocities',
    plays: 16726713,
    cover: 'https://i.scdn.co/image/ab67616d0000b2734fb6a52430e65dbc6c593faf',
    artist: 'Sleepy Fish',
  },
  {
    name: 'Deeper',
    plays: 61664067,
    cover:
      'https://chillhop.com/wp-content/uploads/2020/10/23fdd99adc3e16abcb67b004ea3e748ebf433a49-1024x1024.jpg',
    artist: 'Aviino',
  },
];

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
        movieTitle={movieDetailsData?.title}
        navigation={navigation}
      />
      <PosterImage
        sv={sv}
        posterPath={movieDetailsData?.poster_path}
        movieTitle={movieDetailsData?.title}
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
            <DetailsSection movie={movieDetailsData!} />
          </Animated.View>
        </Animated.ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

export default DetailsScreen;
