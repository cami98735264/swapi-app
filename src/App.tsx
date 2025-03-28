import React from 'react';
import { Text, View } from 'react-native';
import NavigationWrapper from '@navigation/NavigationWrapper';
import WelcomeScreen from '@screens/Welcome/WelcomeScreen';
import MoviesScreen from 'screens/Movies/Movies';
import BottomTabs from 'components/BottomTabsWrapper';
import PeopleScreen from 'screens/People/People';
import PlanetsScreen from 'screens/Planets/Planets';

let tabsOptions = {
  headerShown: false,
}

interface Screen {
  name: string;
  component: React.ComponentType;
  options?: object;
}


const App = () => {
  return (
    <NavigationWrapper screens={[
      {
        name: 'Welcome_Screen',
        component: WelcomeScreen,
        options: {
          headerShown: false,
        }
      },
      {
        name: 'MainTabs',
        component: MainTabs,
        options: {
          headerShown: false,
        }
      }
    ]} />
  );
};


let MainTabs = () => {
  return <BottomTabs tabs={[
    {
      name: 'Movies',
      component: MoviesScreen,
      options: tabsOptions,
    },
    {
      name: 'Planets',
      component: PlanetsScreen,
      options: tabsOptions,
    },
    {
      name: 'People',
      component: PeopleScreen,
      options: tabsOptions,
    }
  ]} />
}

export default App;
