import {playlist, PlaylistType} from '@/screens/DetailsScreen';
import {Movie} from '@/types/movieType';
import {getDetailsScreenConst} from '@/utils/getDetailsScreenConst';
import {FC} from 'react';
import {Text, View} from 'react-native';
import tailwind from 'twrnc';
import HorizontalList from './HorizontalList';

type MovieProps = {
  movie: Movie;
};

const DetailsSection: FC<MovieProps> = ({movie}) => {
  const {formatter, AnimatedLinearGradient, posterSize, headerTop} =
    getDetailsScreenConst();
  return (
    <View
      style={{
        // backgroundColor: '#1B2126',
        padding: 10,
      }}>
      {/* {playlist.map((song: PlaylistType, index: number) => {
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
      })} */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          {movie?.release_date.split('-')[0]}
        </Text>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          {movie?.runtime} mins
        </Text>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          {movie?.credits.crew.filter(crew => crew.job === 'Director')[0].name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        {movie?.genres.map(genre => {
          return (
            <View
              style={{
                padding: 10,
                backgroundColor: '#8899AA',
                borderRadius: 10,
                margin: 5,
              }}
              key={genre.id}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                {genre.name}
              </Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          padding: 10,
        }}>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 15,
            fontWeight: 'bold',
            padding: 10,
          }}>
          Overview
        </Text>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 15,
            fontWeight: 'bold',
            padding: 10,
          }}>
          {movie?.overview}
        </Text>
      </View>
      <View
        style={{
          padding: 10,
        }}>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 15,
            fontWeight: 'bold',
            padding: 10,
          }}>
          Cast
        </Text>
        <HorizontalList
          data={movie?.credits.cast.map(cast => ({
            id: cast.id,
            imagePath: cast.profile_path,
            label: cast.name,
            sublabel: cast.character,
          }))}
          onPressItem={id => {
            console.log(id);
          }}
        />
      </View>
      <View
        style={{
          padding: 10,
        }}>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 15,
            fontWeight: 'bold',
            padding: 10,
          }}>
          Crew
        </Text>
        <HorizontalList
          data={
            movie?.credits.crew
              .filter(crew => {
                return (
                  crew.job === 'Director' ||
                  crew.job === 'Writer' ||
                  crew.job === 'Screenplay' ||
                  crew.job === 'Story'
                );
              })
              .map(crew => ({
                id: crew.id,
                imagePath: crew.profile_path,
                label: crew.name,
                sublabel: crew.job,
              })) ?? []
          }
          onPressItem={id => {
            console.log(id);
          }}
        />
      </View>
      <View
        style={{
          padding: 10,
        }}>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 15,
            fontWeight: 'bold',
            padding: 10,
          }}>
          Similar To This
        </Text>
        <HorizontalList
          data={
            movie?.similar.results
              //   .filter(movie => {
              //     movie.vote_average > 6;
              //   })
              .slice(0, 7)
              .map(similar => ({
                id: similar.id,
                imagePath: similar.poster_path,
                label: similar.title,
              })) ?? []
          }
          onPressItem={id => {
            console.log(id);
          }}
        />
      </View>
    </View>
  );
};

export default DetailsSection;
