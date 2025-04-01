import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '@utils/api/api';
import { FlatList, Text, View } from 'react-native';
import SubsectionLabel from '@components/SubsectionLabel';
import StatsCard from '@components/StatsCard';
import DefaultStyles from 'utils/styles/DefaultStyles';


interface filters {
    search: string;
    page_id?: string;
}


const MoviesList: React.FC<filters> = (filters) => {
    const defaultStyles = DefaultStyles();
    const { data, error, isLoading } = useQuery({
        queryKey: ['movies', filters],
        queryFn: fetchMovies,
    });

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
          subtitle={item.subtitle}
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