import React from 'react';
import { TouchableOpacityProps } from 'react-native';

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

import GasolineSvg from '../../assets/gasoline.svg';

import { CarDTO } from '../../dtos/CarDTO';

interface IProps extends TouchableOpacityProps {
  data: CarDTO;
}

export function Car({ data, ...rest }: IProps) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{data.rent.price}</Price>
          </Rent>
          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}
