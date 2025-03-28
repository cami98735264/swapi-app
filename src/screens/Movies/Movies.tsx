import React from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DefaultStyles from '@utils/styles/DefaultStyles';
import Dropdown from '@components/Dropdown';
import FiltersLabel from 'components/SubsectionLabel';
import {useEffect} from 'react';
import StatsCard from '@components/StatsCard';
import StyledInput from 'components/StyledInput';
import SubsectionLabel from 'components/SubsectionLabel';

interface MoviesScreenProps {
  navigation: any;
}

const MoviesScreen: React.FC<MoviesScreenProps> = ({navigation}) => {
  let [movieInfo, setMovieInfo] = React.useState([{
    movieStats: [
      {
        name: 'Personajes',
        icon: 'person',
        value: 24,
      },
      {
        name: 'Naves',
        icon: 'rocket-launch',
        value: 480,
      },
      {
        name: 'Vehículos',
        icon: 'directions-car',
        value: 54,
      },
      {
        name: 'Especies',
        icon: 'pets',
        value: 25,
      },
      {
        name: 'Planetas',
        icon: 'public',
        value: 34,
      },
    ],
    header: {
      title: {
        text: 'Cargando...',
        icon: 'videocam',
      },
      complementaryInfo: {
        text: '0000-00-00',
        icon: 'calendar-today',
      },
    },
    episode_id: 4,
    subtitle: {
      producer: 'Cargando...',
      director: 'Cargando...',
    },
    description: 'Cargando...',
  }]);

  let [filterOptions, setFilterOptions] = React.useState([]);
  let [search, setSearch] = React.useState('');
  let [country, setCountry] = React.useState('');
  let defaultStyles = DefaultStyles();
  let textColor = {...defaultStyles.textColorDefaultLight};

  return (
    <SafeAreaView style={{...defaultStyles.containerView, height: '100%'}}>
      <View>
        <Text
          style={{
            ...defaultStyles.textColorDefault,
            ...defaultStyles.textLarge,
            ...defaultStyles.defaultFontFamily,
            marginTop: 12,
          }}>
          Películas
        </Text>
      </View>
      <View style={{gap: 16}}>
        <StyledInput
          icon="search"
          setValue={setSearch}
          value={search}
          placeholder={movieInfo[Math.floor(Math.random() * movieInfo.length)].header.title.text}
        />
        <View>
          <View style={{flexDirection: 'column', gap: 8}}>
        <SubsectionLabel label="Filtros" icon="filter-alt" />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 4,
            rowGap: 8,
          }}>
          <View style={{flexBasis: '48%', flex: 1}}>
            <Dropdown
          setSelectedValue={setCountry}
          selectedValue={country}
          options={[]}
          placeholder="director"
            />
          </View>
          <View style={{flexBasis: '48%', flex: 1}}>
            <Dropdown
          setSelectedValue={setCountry}
          selectedValue={country}
          options={[]}
          placeholder="productor"
            />
          </View>
          <View style={{flexBasis: '48%', flex: 1}}>
            <Dropdown
          setSelectedValue={setCountry}
          selectedValue={country}
          options={[]}
          placeholder="lanzamiento"
            />
          </View>
        </View>
          </View>
        </View>
        <FlatList
          data={movieInfo}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
        <StatsCard
          header={item.header}
          episode_id={item.episode_id}
          subtitle={item.subtitle}
          description={item.description}
          statsItems={item.movieStats}
        />
          )}
          contentContainerStyle={{gap: 16}}
        />
      </View>
    </SafeAreaView>
  );
};

export default MoviesScreen;
