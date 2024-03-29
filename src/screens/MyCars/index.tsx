import React, { useState, useEffect } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { useTheme } from 'styled-components';

import { CarDTO } from '../../dtos/carDTO';
import { api } from '../../services/api';
import { BackButton } from '../../components/BackButton';

import { StackScreensNavigationProp } from '../../routes/app.stack.routes';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarList,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { Car as ModelCar } from '../../database/model/Car';
import { format, parseISO } from 'date-fns';

export interface IDataProps {
  id: string;
  car: ModelCar;
  user_id: string;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const navigation = useNavigation<StackScreensNavigationProp>();

  const theme = useTheme();
  const screenIsFocus = useIsFocused();

  const [cars, setCars] = useState<IDataProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCars() {
    try {
      const response = await api.get('/rentals');
      const dataFormatted = response.data.map((data: IDataProps) => {
        return {
          id: data.id,
          car: data.car,
          start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
          end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
        };
      });
      setCars(dataFormatted);
    } catch {
      Alert.alert('Não foi possível carregar os dados!');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, [screenIsFocus]);

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>
          Escolha uma{'\n'}
          data de ínicio e{'\n'}
          fim do aluguel
        </Title>

        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <CarList
            showsVerticalScrollIndicator={false}
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} onPress={() => ({})} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
