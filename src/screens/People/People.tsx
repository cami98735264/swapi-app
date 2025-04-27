import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultStyles from '@utils/styles/DefaultStyles';
import Dropdown from '@components/Dropdown';
import { useQuery } from '@tanstack/react-query'
import StyledInput from 'components/StyledInput';
import { fetchPeople } from 'utils/api/api';
import SubsectionLabel from '@components/SubsectionLabel';
import PeopleList from './PeopleList';
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

interface PersonInfo {
  name: string;
  header: Header;
  stats: StatsItem[];
  subtitle: {
    type: 'person';
    height: string;
    mass: string;
  };
}

interface PeopleScreenProps {
  navigation: any;
}

interface Filters {
  gender?: string;
  hair_color?: string;
  height?: string;
  mass?: string;
  skin_color?: string;
}

interface DefaultFilters {
  search?: string;
  page_id?: string;
}

interface FilterOptionsData {
  heights: { label: string; value: string }[];
  masses: { label: string; value: string }[];
  genders: { label: string; value: string }[];
}

interface InitializedData {
  initialized: boolean;
  originalPeopleLength: number;
}

const PeopleScreen: React.FC<PeopleScreenProps> = ({navigation}) => {
  const [hasInitializedData, setHasInitializedData] = useState<InitializedData>({
    initialized: false,
    originalPeopleLength: 0,
  });
  let [filterOptions, setFilterOptions] = React.useState<Filters>({
    gender: "",
    hair_color: "",
    height: "",
    mass: "",
    skin_color: "",
  });
  let defaultStyles = DefaultStyles();
  let [searchPlaceholder, setSearchPlaceholder] = useState('Buscar...');

  let [filterOptionsData, setFilterOptionsData] = useState<FilterOptionsData>({
    heights: [],
    masses: [],
    genders: [],
  });
  let [originalPeople, setOriginalPeople] = useState<PersonInfo[]>([]);
  const [defaultFilters, setDefaultFilters] = useState<DefaultFilters>({
    search: "",
    page_id: undefined,
  });

  const { data: people, error, isLoading } = useQuery({
    queryKey: ['people', { page_id: defaultFilters.page_id, search: defaultFilters.search || "" }],
    queryFn: fetchPeople
});

useFocusEffect(
  React.useCallback(() => {
    // Only reset search and filters, keep the data
    setFilterOptions({
      height: "",
      mass: "",
      gender: "",
    });
    setDefaultFilters((prev) => ({ ...prev, search: "" }));
    setSearchPlaceholder('Buscar...');
    queryClient.invalidateQueries({ queryKey: ['people'] });
  }, [])
);

useEffect(() => {
  if (people && !hasInitializedData.initialized) {
    setHasInitializedData((prev) => ({ ...prev, initialized: true }));
    setHasInitializedData((prev) => ({ ...prev, originalPeopleLength: people.length }));
    
    // Transform and set original people data
    const transformedPeople = people.map(person => ({
      ...person,
      subtitle: {
        ...person.subtitle,
        type: 'person' as const
      }
    }));
    setOriginalPeople(transformedPeople);
    
    // Set random name for search placeholder
    const randomIndex = Math.floor(Math.random() * people.length);
    const randomPerson = people[randomIndex];
    setSearchPlaceholder(randomPerson.name);

    // Set filter options data
    const heights = [...new Set(transformedPeople.map(x => x.subtitle.height))].map(x => ({ label: x, value: x }));
    const masses = [...new Set(transformedPeople.map(x => x.subtitle.mass))].map(x => ({ label: x, value: x }));
    const genders = [...new Set(transformedPeople.map(x => x.header.complementaryInfo.text))].map(x => ({ label: x, value: x }));

    setFilterOptionsData({
      heights,
      masses,
      genders
    });
  }
}, [people]);

useEffect(() => {
  if (!originalPeople.length) return;
  
  if (filterOptions) {
    queryClient.setQueryData(['people', { page_id: defaultFilters.page_id, search: defaultFilters.search || "" }], (oldData: PersonInfo[]) => {
      let filteredData = [...originalPeople];
      
      if (filterOptions.height && filterOptions.height.length) {
        const selectedHeights = Array.isArray(filterOptions.height) ? filterOptions.height : [filterOptions.height];
        filteredData = filteredData.filter(person => selectedHeights.includes(person.subtitle.height));
      }
      
      if (filterOptions.mass && filterOptions.mass.length) {
        const selectedMasses = Array.isArray(filterOptions.mass) ? filterOptions.mass : [filterOptions.mass];
        filteredData = filteredData.filter(person => selectedMasses.includes(person.subtitle.mass));
      }

      if (filterOptions.gender && filterOptions.gender.length) {
        const selectedGenders = Array.isArray(filterOptions.gender) ? filterOptions.gender : [filterOptions.gender];
        filteredData = filteredData.filter(person => selectedGenders.includes(person.header.complementaryInfo.text));
      }

      return filteredData;
    });
  }
}, [filterOptions, originalPeople]);

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
          Personas
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
                  if (value !== filterOptions.height && value !== '') {
                    setFilterOptions((prev) => ({ ...prev, height: value }));
                  }
                }}
                selectedValue={filterOptions.height || ''}
                options={filterOptionsData.heights}
                placeholder="altura"
              />
            </View>
            <View style={{flexBasis: '48%', flex: 1}}>
              <Dropdown
                isMultiple={true}
                onValueChange={(value) => {
                  if (value !== filterOptions.mass && value !== '') {
                    setFilterOptions((prev) => ({ ...prev, mass: value }));
                  }
                }}
                selectedValue={filterOptions.mass || ''}
                options={filterOptionsData.masses}
                placeholder="peso"
              />
            </View>
            <View style={{flexBasis: '48%', flex: 1}}>
              <Dropdown
                isMultiple={true}
                onValueChange={(value) => {
                  if (value !== filterOptions.gender && value !== '') {
                    setFilterOptions((prev) => ({ ...prev, gender: value }));
                  }
                }}
                selectedValue={filterOptions.gender || ''}
                options={filterOptionsData.genders}
                placeholder="género"
              />
            </View>
          </View>
          </View>
        </View>
        <View />
        <PeopleList data={people || []} error={error} isLoading={isLoading} />
      </View>
    </SafeAreaView>
  );
};

export default PeopleScreen;