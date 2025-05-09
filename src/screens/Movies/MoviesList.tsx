import { FlatList, Text, View } from 'react-native';
import StatsCard from '@components/StatsCard';
import DefaultStyles from 'utils/styles/DefaultStyles';

interface Header {
  title: {
      text: string;
      icon: string;
  }
  complementaryInfo: {
      text: string;
      icon: string;
  };
}


interface Subtitle {
  type: 'movie';
  producer: string;
  director: string;
}


interface StatsItem {
  name: string;
  icon: string;
  value: number;
}

interface MovieInfo {
  episode_id: number;
  header: Header;
  subtitle: Subtitle;
  description: string;
  movieStats: StatsItem[];
}

interface MoviesListProps {
    data: MovieInfo[];
    error: any;
    isLoading: boolean;
}


const MoviesList: React.FC<MoviesListProps> = ({ 
    data,
    error,
    isLoading
}) => {
    const defaultStyles = DefaultStyles();

    if (isLoading) return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...defaultStyles.textColorDefault, ...defaultStyles.defaultFontFamily}}>Cargando películas...</Text>
        </View>
    )
    if (error) return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...defaultStyles.textColorDefault, ...defaultStyles.defaultFontFamily}}>Error al cargar películas</Text>
        </View>
    )

    return (
        data && data.length > 0 ? (
            <FlatList
            keyboardShouldPersistTaps="handled"

            data={Array.isArray(data) ? data : []}
            ListFooterComponent={
              <View>
                
              </View>
            }
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <StatsCard
          header={item.header}
          episode_id={item.episode_id}
          subtitle={{ ...item.subtitle, type: 'movie' }}
          description={item.description}
          statsItems={Array.isArray(item.movieStats) ? item.movieStats : [item.movieStats]}
              />
            )}
            contentContainerStyle={{gap: 16, paddingBottom: '90%'}}
            showsVerticalScrollIndicator={false}
          />
          ) : (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{... defaultStyles.textColorDefault, ...defaultStyles.defaultFontFamily }}>No se encontraron películas...</Text>
            </View>
          )
    )
}



export default MoviesList;