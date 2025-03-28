interface Screen {
  name: string;
  component: React.ComponentType<any>;
  options?: object;
}

interface NavigationWrapperProps {
  screens: Screen[];
}

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const NavigationWrapper = ({screens}: NavigationWrapperProps) => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screens.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationWrapper;
