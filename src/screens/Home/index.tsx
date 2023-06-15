/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
/* import { Ionicons } from '@expo/vector-icons'; */
import { useTheme } from 'styled-components/native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';
import { api } from '../../services/api';

/* import { PanGestureHandler } from 'react-native-gesture-handler'; */

import Logo from '../../assets/logo.svg';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { CarDTO } from '../../dtos/carDTO';
import { useAuth } from '../../hooks/auth';
/* import { Car as ModelCar } from '../../database/model/Car'; */

import { StackScreensNavigationProp } from '../../routes/app.stack.routes';

/* const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity); */

export function Home() {
  const navigation = useNavigation<StackScreensNavigationProp>();

  /* const theme = useTheme(); */
  const netInfo = useNetInfo();

  const { cars, loadingCars, fetchCars } = useAuth();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  /* const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true); */

  /*   const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  }); */

  /*  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value; 
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
        positionX.value = withSpring(0);
      positionY.value = withSpring(0); 
    },
   
  }); */

  function handleCarDetails(item: CarDTO) {
    navigation.navigate('CarDetails', { car: item });
  }

  /*  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  } */

  async function offlineSynchronize() {
    try {
      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          const response = await api.get(
            `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`,
          );

          const { changes, latestVersion } = response.data;
          return { changes, timestamp: latestVersion };
        },
        pushChanges: async ({ changes }) => {
          const user = changes.users;

          await api.post('/users/sync', user);
        },
      });
    } catch {
    } finally {
      if (cars.length < 1) fetchCars();
    }
  }

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loadingCars && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loadingCars ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      {/*   <PanGestureHandler>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 16,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            activeOpacity={0.6}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
