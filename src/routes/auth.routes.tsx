import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';

export type AuthRootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {
    user: { name: string; email: string; driverLicense: string };
  };
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: 'Home' | 'SignIn';
  };
};

export type AuthStackScreensNavigationProp =
  NativeStackNavigationProp<AuthRootStackParamList>;

const { Navigator, Screen } =
  createNativeStackNavigator<AuthRootStackParamList>();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
