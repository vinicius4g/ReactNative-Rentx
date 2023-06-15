import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { AppStackRoutes } from './app.stack.routes';

import { MyCars } from '../screens/MyCars';
import { Profile } from '../screens/Profile';

import HomeSvg from '../assets/icon_tab_bar_home.svg';
import CarSvg from '../assets/icon_tab_bar_car.svg';
import PeopleSvg from '../assets/icon_tab_bar_people.svg';

export type RootTabParamList = {
  HomeStack: undefined;
  Profile: undefined;
  MyCars: undefined;
};

export type TabScreensNavigationProp =
  BottomTabNavigationProp<RootTabParamList>;

const { Navigator, Screen } = createBottomTabNavigator<RootTabParamList>();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 78,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          backgroundColor: theme.colors.background_primary,
        },
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
      }}
      initialRouteName="HomeStack"
    >
      <Screen
        name="HomeStack"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
