import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

import { Car as ModelCar } from '../../database/model/Car';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface IProps extends TouchableOpacityProps {
  data: ModelCar;
}

export function Car({ data, ...rest }: IProps) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  const netInfo = useNetInfo();

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${
              netInfo.isConnected === true ? String(data?.price) : '...'
            }`}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}
