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
/* import { PanGestureHandler } from 'react-native-gesture-handler'; */

import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { CarDTO } from '../../dtos/carDTO';
import { StackScreensNavigationProp } from '../../routes/app.stack.routes';

/* const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity); */

export function Home() {
  const navigation = useNavigation<StackScreensNavigationProp>();

  /* const theme = useTheme(); */

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

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
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
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
