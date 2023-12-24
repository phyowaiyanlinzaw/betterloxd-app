import {Movie} from '@/types/movieType';
import {getDetailsScreenConst} from '@/utils/getDetailsScreenConst';
import {FC} from 'react';
import {Text, View} from 'react-native';
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
        {movie?.genres.slice(0, 3).map(genre => {
          return (
            <View
              style={{
                padding: 5,
                backgroundColor: '#8899AA',
                borderRadius: 7,
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
                  crew.job === 'Story' ||
                  crew.job === 'Producer' ||
                  crew.job === 'Executive Producer' ||
                  crew.job === 'Original Music Composer'
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
