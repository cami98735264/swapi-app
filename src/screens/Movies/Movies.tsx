import React, { useEffect, useRef, useState } from 'react';
import {View, Text, Alert } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DefaultStyles from '@utils/styles/DefaultStyles';
import Dropdown from '@components/Dropdown';
import { useQuery } from '@tanstack/react-query'
import StyledInput from 'components/StyledInput';
import { fetchMovies } from 'utils/api/api';
import SubsectionLabel from '@components/SubsectionLabel';
import MoviesList from './MoviesList';
import { queryClient } from 'config/react-query';
import { useFocusEffect } from '@react-navigation/native';


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

interface Filters {
  director?: string;
  producer?: string;
  release_date?: string;
}


interface DefaultFilters {
  search?: string;
  page_id?: string;
}

interface FilterOptionsData {
  producers: { label: string; value: string }[];
  directors: { label: string; value: string }[];
  dates: { label: string; value: string }[];
}

interface InitializedData {
  initialized: boolean;
  originalMoviesLength: number;
}

const MoviesScreen: React.FC<MoviesScreenProps> = ({navigation}) => {
  const [hasInitializedData, setHasInitializedData] = useState<InitializedData>({
    initialized: false,
    originalMoviesLength: 0,
  });
  let [filterOptions, setFilterOptions] = React.useState<Filters>({
    producer: "",
    director: "",
    release_date: "",
  });
  let defaultStyles = DefaultStyles();
  let [searchPlaceholder, setSearchPlaceholder] = useState('Buscar...');

  let [filterOptionsData, setFilterOptionsData] = useState<FilterOptionsData>({
    producers: [],
    directors: [],
    dates: [],
  });
  let [originalMovies, setOriginalMovies] = useState<MovieInfo[]>([]);
  const [defaultFilters, setDefaultFilters] = useState<DefaultFilters>({
    search: "",
    page_id: undefined,
  });

  const { data: movies, error, isLoading } = useQuery({
    queryKey: ['movies', { page_id: defaultFilters.page_id, search: defaultFilters.search || "" }],
    queryFn: fetchMovies
});
useFocusEffect(
  React.useCallback(() => {
    // Reset filter options when screen is focused
    setFilterOptions({
      producer: "",
      director: "",
      release_date: "",
    });
    setDefaultFilters((prev) => ({ ...prev, search: "" }));
    setOriginalMovies([]);
    setHasInitializedData({ initialized: false, originalMoviesLength: 0 });
    setFilterOptionsData({
      producers: [],
      directors: [],
      dates: [],
    });
    setSearchPlaceholder('Buscar...');
    queryClient.invalidateQueries({ queryKey: ['movies'] });
  }, [])
);
useEffect(() => {
  if (movies && !hasInitializedData.initialized) {
    setHasInitializedData((prev) => ({ ...prev, initialized: true }));
    setHasInitializedData((prev) => ({ ...prev, originalMoviesLength: movies.length }));
    setOriginalMovies(movies.map(movie => ({
      ...movie,
      subtitle: {
        ...movie.subtitle,
        type: 'movie' as const
      }
    })));
    
    // Set random title for search placeholder
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    setSearchPlaceholder(randomMovie.header.title.text);

    // Set filter options data
    let producersFilter = movies?.flatMap((x) => x.subtitle.producer?.split(",") || []).map(x => x.trim()).filter(Boolean);
    let producers = [...new Set(producersFilter)].map((x) => ({ label: x, value: x }));
    setFilterOptionsData((prev) => ({ ...prev, producers }));

    let directorsFilter = movies?.flatMap((x) => x.subtitle.director?.split(",") || []).map(x => x.trim()).filter(Boolean);
    let directors = [...new Set(directorsFilter)].map((x) => ({ label: x, value: x }));
    setFilterOptionsData((prev) => ({ ...prev, directors }));

    let datesFilter = movies?.flatMap((x) => x.header.complementaryInfo.text).map(x => x.trim()).filter(Boolean);
    let dates = [...new Set(datesFilter)].map((x) => ({ label: x, value: x }));
    setFilterOptionsData((prev) => ({ ...prev, dates }));
  }
}, [movies]);

useEffect(() => {
  if (!originalMovies.length) return; // Skip if no movies are loaded yet
  
  if (filterOptions) {
    queryClient.setQueryData(['movies', { page_id: defaultFilters.page_id, search: defaultFilters.search || "" }], (oldData: MovieInfo[]) => {
      let filteredData = [...originalMovies];
      
      if (filterOptions.director && filterOptions.director.length) {
        const selectedDirectors = Array.isArray(filterOptions.director) ? filterOptions.director : [filterOptions.director];
        filteredData = filteredData.filter((movie: MovieInfo) => {
          const directors = movie.subtitle.director.split(",").map((x) => x.trim());
          return directors.some((director) => selectedDirectors.includes(director));
        });
      }
      
      if (filterOptions.producer && filterOptions.producer.length) {
        const selectedProducers = Array.isArray(filterOptions.producer) ? filterOptions.producer : [filterOptions.producer];
        filteredData = filteredData.filter((movie: MovieInfo) => {
          const producers = movie.subtitle.producer.split(",").map((x) => x.trim());
          return producers.some((producer) => selectedProducers.includes(producer));
        });
      }

      if (filterOptions.release_date && filterOptions.release_date.length) {
        const selectedDates = Array.isArray(filterOptions.release_date) 
          ? filterOptions.release_date 
          : [filterOptions.release_date];
          
        filteredData = filteredData.filter((movie: MovieInfo) => {
          return selectedDates.includes(movie.header.complementaryInfo.text);
        });
      }
      return filteredData;
    });
  }
}, [filterOptions, originalMovies]);

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
          setValue={(value) => {
            setDefaultFilters((prev) => ({ ...prev, search: value as string }));
          }}
          value={defaultFilters.search || ''}
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
            isMultiple={true}
            onValueChange={(value) => {
            if (value !== filterOptions.director && value !== '') {
              setFilterOptions((prev) => ({ ...prev, director: value }));
            }
            }}
            selectedValue={filterOptions.director || ''}
            options={filterOptionsData.directors}
            placeholder="director"
            />
            </View>
          <View style={{flexBasis: '48%', flex: 1}}>
            <Dropdown
            isMultiple={true}
            onValueChange={(value) => {
              if (value !== filterOptions.producer && value !== '') {
                setFilterOptions((prev) => ({ ...prev, producer: value }));
              }
            }}
          selectedValue={filterOptions.producer || ''}
          options={filterOptionsData.producers}
          placeholder="productor"
            />
          </View>
            <View style={{flexBasis: '48%', flex: 1}}>
            <Dropdown
              isMultiple={true}
              onValueChange={(value) => {
              if (value !== filterOptions.release_date && value !== '') {
                setFilterOptions((prev) => ({ ...prev, release_date: value }));
              }
              }}
              selectedValue={filterOptions.release_date || ''}
              options={filterOptionsData.dates}
              placeholder="lanzamiento"
            />
            </View>
        </View>
          </View>
        </View>
        <View />
        <MoviesList data={movies?.map(movie => ({
          ...movie,
          subtitle: {
            ...movie.subtitle,
            type: 'movie' as const
          }
        })) || []} error={error} isLoading={isLoading} />
      </View>
    </SafeAreaView>
  );
};

export default MoviesScreen;
