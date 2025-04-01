import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DefaultStyles from '@utils/styles/DefaultStyles';
import Dropdown from '@components/Dropdown';
import { useIsFocused } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import StatsCard from '@components/StatsCard';
import StyledInput from 'components/StyledInput';
import { fetchMovies } from 'utils/api/api';
import SubsectionLabel from '@components/SubsectionLabel';
import MoviesList from './MoviesList';
import { useQueryClient } from '@tanstack/react-query';

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
  producer: string;
  director: string;
}

interface StatsItem {
  name: string;
  icon: string;
  value: number;
}






interface Movie {
  characters: string[];
  created: string;
  director: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}

interface MovieInfo {
  episode_id: number;
  header: Header;
  subtitle: Subtitle;
  description: string;
  movieStats: StatsItem[];
}

interface MoviesScreenProps {
  navigation: any;
}

const MoviesScreen: React.FC<MoviesScreenProps> = ({navigation}) => {
  const queryClient = useQueryClient();

  const movies = queryClient.getQueryData<MovieInfo[]>(['movies']);
  let [filterOptions, setFilterOptions] = React.useState<{
    producer: string | null;
    filteredMovies: MovieInfo[];
    director: string | null;
    release_date: string | null;
  }>({
    producer: null,
    filteredMovies: [],
    director: null,
    release_date: null,
  });
  let [search, setSearch] = React.useState("");
  let [country, setCountry] = React.useState('');
  let defaultStyles = DefaultStyles();
  let [searchPlaceholder, setSearchPlaceholder] = React.useState('Buscar...');

  useEffect(() => {
    // Set the search placeholder to a random movie title when the component mounts
    if (movies && movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      console.log(randomMovie.header.title.text);
      setSearchPlaceholder(randomMovie.header.title.text);
    }
    
  }, [movies, search]);
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
          placeholder={searchPlaceholder}
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
        <View />
        <MoviesList search={search} />
      </View>
    </SafeAreaView>
  );
};

export default MoviesScreen;
