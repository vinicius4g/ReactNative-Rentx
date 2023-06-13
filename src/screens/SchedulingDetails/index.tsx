/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';
import {
  RootStackParamList,
  StackScreensNavigationProp,
} from '../../routes/app.stack.routes';

import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';

interface IPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const navigation = useNavigation<StackScreensNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'SchedulingDetails'>>();

  const theme = useTheme();

  const [rentalPeriod, setRentalPeriod] = useState<IPeriod>({} as IPeriod);
  const [loading, setLoading] = useState(false);

  const rentTotal = Number(
    route.params.dates.length * route.params.car.rent.price,
  );

  async function handleConfirmRental() {
    setLoading(true);

    const responseScheduleByCar = await api.get(
      `/schedules_bycars/${route.params.car.id}`,
    );

    const unavailable_dates = [
      ...responseScheduleByCar.data.unavailable_dates,
      ...route.params.dates,
    ];

    await api.post(`/schedules_byuser/`, {
      user_id: 1234,
      car: route.params.car,
      startDate: format(
        getPlatformDate(new Date(route.params.dates[0])),
        'dd/MM/yyyy',
      ),
      endDate: format(
        getPlatformDate(
          new Date(route.params.dates[route.params.dates.length - 1]),
        ),
        'dd/MM/yyyy',
      ),
    });

    api
      .put(`/schedules_bycars/${route.params.car.id}`, {
        id: route.params.car.id,
        unavailable_dates,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          title: 'Carro alugado!',
          message: `Agora vocẽ só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
          nextScreenRoute: 'Home',
        });
      })
      .catch(() => {
        Alert.alert('Não foi possível confirmar o aluguel !');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(
        getPlatformDate(new Date(route.params.dates[0])),
        'dd/MM/yyyy',
      ),
      end: format(
        getPlatformDate(
          new Date(route.params.dates[route.params.dates.length - 1]),
        ),
        'dd/MM/yyyy',
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={route.params?.car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{route.params?.car.brand}</Brand>
            <Name>{route.params?.car.name}</Name>
          </Description>

          {
            <Rent>
              <Period>{route.params?.car.rent.period}</Period>
              <Price>R$ {route.params?.car.rent.price}</Price>
            </Rent>
          }
        </Details>

        <Accessories>
          {route.params?.car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${route.params.car.rent.price} x${route.params.dates.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}
