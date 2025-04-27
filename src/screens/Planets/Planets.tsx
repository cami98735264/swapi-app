import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultStyles from '@utils/styles/DefaultStyles';
import Dropdown from '@components/Dropdown';
import { useQuery } from '@tanstack/react-query'
import StyledInput from 'components/StyledInput';
import { fetchPlanets } from 'utils/api/api';
import SubsectionLabel from '@components/SubsectionLabel';
import PlanetsList from './PlanetsList';
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
    climate: string;
    terrain: string;
  };
}

interface PlanetsScreenProps {
  navigation: any;
}

interface Filters {
  population?: string;
  climate?: string;
  terrain?: string;
  surface_water?: string;
}

interface DefaultFilters {
  search?: string;
  page_id?: string;
}

interface FilterOptionsData {
  populations: { label: string; value: string }[];
  climates: { label: string; value: string }[];
  terrains: { label: string; value: string }[];
  surface_waters: { label: string; value: string }[];
}

interface InitializedData {
  initialized: boolean;
  originalPlanetsLength: number;
}

const PlanetsScreen: React.FC<PlanetsScreenProps> = ({navigation}) => {
  const [hasInitializedData, setHasInitializedData] = useState<InitializedData>({
    initialized: false,
    originalPlanetsLength: 0,
  });
  let [filterOptions, setFilterOptions] = React.useState<Filters>({
    population: "",
    climate: "",
    terrain: "",
    surface_water: "",
  });
  let defaultStyles = DefaultStyles();
  let [searchPlaceholder, setSearchPlaceholder] = useState('Buscar...');

  let [filterOptionsData, setFilterOptionsData] = useState<FilterOptionsData>({
    populations: [],
    climates: [],
    terrains: [],
    surface_waters: [],
  });
  let [originalPlanets, setOriginalPlanets] = useState<PlanetInfo[]>([]);
  const [defaultFilters, setDefaultFilters] = useState<DefaultFilters>({
    search: "",
    page_id: undefined,
  });

  const { data: planets, error, isLoading } = useQuery({
    queryKey: ['planets', { page_id: defaultFilters.page_id, search: defaultFilters.search || "" }],
    queryFn: fetchPlanets
});

useFocusEffect(
  React.useCallback(() => {
    // Reset filter options when screen is focused
    setFilterOptions({
      population: "",
      climate: "",
      terrain: "",
      surface_water: "",
    });
    setDefaultFilters((prev) => ({ ...prev, search: "" }));
    setOriginalPlanets([]);
    setHasInitializedData({ initialized: false, originalPlanetsLength: 0 });
    setFilterOptionsData({
      populations: [],
      climates: [],
      terrains: [],
      surface_waters: [],
    });
    setSearchPlaceholder('Buscar...');
    queryClient.invalidateQueries({ queryKey: ['planets'] });
  }, [])
);

useEffect(() => {
  if (planets && !hasInitializedData.initialized && planets.length > hasInitializedData.originalPlanetsLength) {
    setHasInitializedData((prev) => ({ ...prev, initialized: true }));
    setHasInitializedData((prev) => ({ ...prev, originalPlanetsLength: planets.length }));
    setOriginalPlanets(planets);
    
    // Set random name for search placeholder
    const randomIndex = Math.floor(Math.random() * planets.length);
    const randomPlanet = planets[randomIndex];
    setSearchPlaceholder(randomPlanet.name);

    // Set filter options data
    let populations = [...new Set(planets.map((x: PlanetInfo) => x.header.complementaryInfo.text))].map((x) => ({ label: x, value: x }));
    setFilterOptionsData((prev) => ({ ...prev, populations }));

    let climates = [...new Set(planets.map((x: PlanetInfo) => x.subtitle.climate))].map((x) => ({ label: x, value: x }));
    setFilterOptionsData((prev) => ({ ...prev, climates }));

    let terrains = [...new Set(planets.map((x: PlanetInfo) => x.subtitle.terrain))].map((x) => ({ label: x, value: x }));
    setFilterOptionsData((prev) => ({ ...prev, terrains }));

    let surfaceWatersFilter = planets?.map((x: PlanetInfo) => x.stats.find(s => s.name === 'superficie de agua')?.value.toString() || '').filter(Boolean);
    let surface_waters = [...new Set(surfaceWatersFilter)].map((x) => ({ label: x, value: x }));
    setFilterOptionsData((prev) => ({ ...prev, surface_waters }));
  }
}, [planets]);

useEffect(() => {
  if (!originalPlanets.length) return; // Skip if no planets are loaded yet
  
  if (filterOptions) {
    queryClient.setQueryData(['planets', { page_id: defaultFilters.page_id, search: defaultFilters.search || "" }], (oldData: PlanetInfo[]) => {
    let filteredData = [...originalPlanets];
    
    if (filterOptions.population && filterOptions.population.length) {
      const selectedPopulations = Array.isArray(filterOptions.population) ? filterOptions.population : [filterOptions.population];
      filteredData = filteredData.filter((planet: PlanetInfo) => {
        const population = planet.header.complementaryInfo.text;
        return population && selectedPopulations.includes(population);
      });
    }
    
    if (filterOptions.climate && filterOptions.climate.length) {
      const selectedClimates = Array.isArray(filterOptions.climate) ? filterOptions.climate : [filterOptions.climate];
      filteredData = filteredData.filter((planet: PlanetInfo) => {
        const climate = planet.subtitle.climate;
        return climate && selectedClimates.includes(climate);
      });
    }

    if (filterOptions.terrain && filterOptions.terrain.length) {
      const selectedTerrains = Array.isArray(filterOptions.terrain) ? filterOptions.terrain : [filterOptions.terrain];
      filteredData = filteredData.filter((planet: PlanetInfo) => {
        const terrain = planet.subtitle.terrain;
        return terrain && selectedTerrains.includes(terrain);
      });
    }

    if (filterOptions.surface_water && filterOptions.surface_water.length) {
      const selectedSurfaceWaters = Array.isArray(filterOptions.surface_water) ? filterOptions.surface_water : [filterOptions.surface_water];
      filteredData = filteredData.filter((planet: PlanetInfo) => {
        const surfaceWater = planet.stats.find(s => s.name === 'superficie de agua')?.value.toString();
        return surfaceWater && selectedSurfaceWaters.includes(surfaceWater);
      });
    }

    return filteredData;
    });
  }
}, [filterOptions]);

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
          Planetas
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
            if (value !== filterOptions.population && value !== '') {
              setFilterOptions((prev) => ({ ...prev, population: value }));
            }
            }}
            selectedValue={filterOptions.population || ''}
            options={filterOptionsData.populations}
            placeholder="población"
            />
            </View>
          <View style={{flexBasis: '48%', flex: 1}}>
            <Dropdown
            isMultiple={true}
            onValueChange={(value) => {
              if (value !== filterOptions.climate && value !== '') {
                setFilterOptions((prev) => ({ ...prev, climate: value }));
              }
            }}
          selectedValue={filterOptions.climate || ''}
          options={filterOptionsData.climates}
          placeholder="clima"
            />
          </View>
            <View style={{flexBasis: '48%', flex: 1}}>
            <Dropdown
              isMultiple={true}
              onValueChange={(value) => {
              if (value !== filterOptions.terrain && value !== '') {
                setFilterOptions((prev) => ({ ...prev, terrain: value }));
              }
              }}
              selectedValue={filterOptions.terrain || ''}
              options={filterOptionsData.terrains}
              placeholder="terreno"
            />
            </View>
            <View style={{flexBasis: '48%', flex: 1}}>
            <Dropdown
              isMultiple={true}
              onValueChange={(value) => {
              if (value !== filterOptions.surface_water && value !== '') {
                setFilterOptions((prev) => ({ ...prev, surface_water: value }));
              }
              }}
              selectedValue={filterOptions.surface_water || ''}
              options={filterOptionsData.surface_waters}
              placeholder="superficie agua"
            />
            </View>
        </View>
          </View>
        </View>
        <View />
        <PlanetsList data={planets || []} error={error} isLoading={isLoading} />
      </View>
    </SafeAreaView>
  );
};

export default PlanetsScreen;