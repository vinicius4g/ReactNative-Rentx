import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { CarDTO } from '../../dtos/CarDTO';
import { StackScreensNavigationProp } from '../../routes/stack.routes';

export function Home() {
  const navigation = useNavigation<StackScreensNavigationProp>();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetails(item: CarDTO) {
    navigation.navigate('CarDetails', { car: item });
  }

  async function fetchCars() {
    try {
      const response = await api.get('/cars');
      setCars(response.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
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
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
