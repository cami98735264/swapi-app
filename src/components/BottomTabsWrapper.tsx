import React from "react";
import { Pressable, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

interface Tabs {
  name: string;
  component: React.ComponentType<any>;
  options?: object;
}

interface BottomTabsWrapperProps {
  tabs: Tabs[];
}

const BottomTabsWrapper: React.FC<BottomTabsWrapperProps> = ({ tabs }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: ((props) => <Pressable {...props} android_ripple={{ color: 'transparent' }} />),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "Movies") iconName = "movie";
          else if (route.name === "Planets") iconName = "public";
          else if (route.name === "People") iconName = "people";

          return (
            <View
              style={{
                width: focused ? 70 : "auto",
                height: focused ? 50 : "auto",
                backgroundColor: focused ? "#0C3D8A" : "transparent",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: focused ? 8 : 0,
              }}
            >
              <MaterialIcons name={iconName as any} size={size} color="#fbfbfb" />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0B50BD",
          height: 60,
        },
        tabBarItemStyle: {
          alignItems: "center",
          flexDirection: "row",
        },
      })}
    >
      {tabs.map((tab: Tabs) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabsWrapper;
