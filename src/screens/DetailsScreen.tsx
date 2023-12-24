import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  LayoutChangeEvent,
  Pressable,
  Image,
} from 'react-native';
import React, {FC, useMemo} from 'react';
import {RootStackParamsList, RootStackProps} from '@/types/navigationType';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import useGetMovieDetails from '@/hooks/useGetMovieDetails';
import {useNavigation} from '@react-navigation/native';

type DetailsScreenProps = RootStackProps<'DetailsScreen'>;

type Navigation = DetailsScreenProps['navigation'];

const formatter = Intl.NumberFormat('en-IN');

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const posterSize = Dimensions.get('screen').height / 2;
const headerTop = 44 - 16;
type AnimationProps = {
  sv: SharedValue<number>;
  posterPath?: string;
  backdropPath?: string;
  movieTitle?: string;
};

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
  return (
    <Animated.View style={[tailwind.style('flex-1 bg-black')]}>
      <ScreenHeader sv={sv} />
      <PosterImage
        sv={sv}
        posterPath={movieDetailsData?.backdrop_path}
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
            {/* Button Section */}
            {/* <Animated.View
              onLayout={(event: LayoutChangeEvent) => {
                'worklet';
                layoutY.value = event.nativeEvent.layout.y;
              }}
              style={[
                tailwind.style(
                  'flex items-center justify-center z-10 pb-4 pt-4',
                ),
                stickyElement,
              ]}>
              <Pressable
                style={tailwind.style(
                  'bg-green-500 px-10 py-2 items-center rounded-full',
                )}>
                <Text
                  style={tailwind.style(
                    'text-base font-bold text-white uppercase',
                  )}>
                  Shuffle Play
                </Text>
              </Pressable>
            </Animated.View> */}
            <Animated.View
              style={tailwind.style(
                'flex items-start justify-center pb-3 pt-4 bg-black',
              )}>
              <Pressable
                style={tailwind.style('px-10 items-start rounded-full')}>
                <Text
                  style={tailwind.style(
                    'text-[18px] tracking-[.15] font-bold text-white',
                  )}>
                  Popular
                </Text>
              </Pressable>
            </Animated.View>
            {/* Songs List */}
            <Playlist />
          </Animated.View>
        </Animated.ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

const ScreenHeader: FC<AnimationProps> = ({sv}) => {
  const inset = useSafeAreaInsets();
  const opacityAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        sv.value,
        [
          ((posterSize - (headerTop + inset.top)) / 4) * 3,
          posterSize - (headerTop + inset.top) + 1,
        ],
        [0, 1],
      ),
      transform: [
        {
          scale: interpolate(
            sv.value,
            [
              ((posterSize - (headerTop + inset.top)) / 4) * 3,
              posterSize - (headerTop + inset.top) + 1,
            ],
            [0.98, 1],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            sv.value,
            [
              ((posterSize - (headerTop + inset.top)) / 4) * 3,
              posterSize - (headerTop + inset.top) + 1,
            ],
            [-10, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
      paddingTop: inset.top === 0 ? 8 : inset.top,
    };
  });
  return (
    <Animated.View
      style={[
        tailwind.style(
          'absolute w-full px-4 pb-2 flex flex-row items-start justify-between z-10 bg-black',
        ),
        opacityAnim,
      ]}>
      <Text
        style={{
          color: '#8899AA',
          fontSize: 20,
          fontWeight: 'bold',
          padding: 10,
        }}>
        Back
      </Text>
      <Animated.Text style={tailwind.style('text-xl text-white font-medium')}>
        John Krasinski
      </Animated.Text>
      <Text
        style={{
          color: '#8899AA',
          fontSize: 20,
          fontWeight: 'bold',
          padding: 10,
        }}>
        Menu
      </Text>
    </Animated.View>
  );
};

const PosterImage: FC<AnimationProps> = ({sv, posterPath, backdropPath}) => {
  const inset = useSafeAreaInsets();
  const layoutY = useSharedValue(0);
  const opacityAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        sv.value,
        [0, posterSize - (headerTop + inset.top) / 0.9],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    };
  });
  const textAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        sv.value,
        [-posterSize / 8, 0, posterSize - (headerTop + inset.top) / 0.8],
        [0, 1, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          scale: interpolate(
            sv.value,
            [-posterSize / 8, 0, (posterSize - (headerTop + inset.top)) / 2],
            [1.1, 1, 0.95],
            'clamp',
          ),
        },
        {
          translateY: interpolate(
            sv.value,
            [layoutY.value - 1, layoutY.value, layoutY.value + 1],
            [0, 0, -1],
          ),
        },
      ],
    };
  });
  const scaleAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(sv.value, [-50, 0], [1.3, 1], {
            extrapolateLeft: 'extend',
            extrapolateRight: 'clamp',
          }),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.imageContainer, opacityAnim]}>
      <Animated.Image
        style={[styles.imageStyle, scaleAnim]}
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
      />
      <Animated.View
        onLayout={(event: LayoutChangeEvent) => {
          'worklet';
          layoutY.value = event.nativeEvent.layout.y;
        }}
        style={[
          tailwind.style(
            'absolute bottom-0 top-0 left-0 right-0 justify-end items-center px-5  z-10',
          ),
          textAnim,
        ]}>
        {/* <Animated.Text
          numberOfLines={2}
          style={tailwind.style('text-6xl font-bold text-white text-center')}>
          {movieTitle}
        </Animated.Text> */}
        <Animated.Image
          style={tailwind.style('w-30 h-40  rounded-2 ')}
          src={`https://image.tmdb.org/t/p/original${posterPath}`}></Animated.Image>
      </Animated.View>
      <AnimatedLinearGradient
        style={[tailwind.style('absolute inset-0'), scaleAnim]}
        colors={[
          `rgba(0,0,0,${0})`,
          `rgba(0,0,0,${0.1})`,
          `rgba(0,0,0,${0.3})`,
          `rgba(0,0,0,${0.5})`,
          `rgba(0,0,0,${0.8})`,
          `rgba(0,0,0,${1})`,
        ]}
      />
    </Animated.View>
  );
};

const Playlist = () => {
  return (
    <View style={tailwind.style('bg-black')}>
      {playlist.map((song: PlaylistType, index: number) => {
        return (
          <View
            style={tailwind.style(
              'flex flex-row items-center justify-between py-2 mr-5',
            )}
            key={JSON.stringify(song.name + index)}>
            <View style={tailwind.style('flex flex-row items-center')}>
              <View
                style={tailwind.style(
                  'absolute w-10 flex-row items-center justify-center',
                )}>
                <Text
                  style={tailwind.style(
                    'text-sm text-center font-bold text-white opacity-50',
                  )}>
                  {index + 1}
                </Text>
              </View>
              <View style={tailwind.style('pl-10')}>
                <Text
                  style={tailwind.style('text-base font-medium text-white')}>
                  {song.name}
                </Text>
                <Text style={tailwind.style('text-sm text-white opacity-60')}>
                  {formatter.format(song.plays)}
                </Text>
              </View>
            </View>
            <Text>Menu</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width,
    position: 'absolute',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
export default DetailsScreen;
