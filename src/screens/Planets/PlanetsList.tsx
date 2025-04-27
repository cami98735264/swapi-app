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

interface StatsItem {
  name: string;
  icon: string;
  value: number;
}

interface PlanetInfo {
  name: string;
  header: Header;
  stats: StatsItem[];
  subtitle: {
    type: 'planet';
    climate: string;
    terrain: string;
  };
}

interface PlanetsListProps {
    data: PlanetInfo[];
    error: any;
    isLoading: boolean;
}

const PlanetsList: React.FC<PlanetsListProps> = ({ 
    data,
    error,
    isLoading
}) => {
    const defaultStyles = DefaultStyles();

    if (isLoading) return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...defaultStyles.textColorDefault, ...defaultStyles.defaultFontFamily}}>Cargando planetas...</Text>
        </View>
    )
    if (error) return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...defaultStyles.textColorDefault, ...defaultStyles.defaultFontFamily}}>Error al cargar planetas</Text>
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
                statsItems={Array.isArray(item.stats) ? item.stats : [item.stats]}
                episode_id={0}
                subtitle={item.subtitle}
                description=""
              />
            )}
            contentContainerStyle={{gap: 16, paddingBottom: '90%'}}
            showsVerticalScrollIndicator={false}
          />
          ) : (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{... defaultStyles.textColorDefault, ...defaultStyles.defaultFontFamily }}>No se encontraron planetas...</Text>
            </View>
          )
    )
}

export default PlanetsList; 