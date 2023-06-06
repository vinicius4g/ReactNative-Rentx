import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

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
  About,
  Footer,
} from './styles';

import {
  RootStackParamList,
  StackScreensNavigationProp,
} from '../../routes/stack.routes';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/carDTO';

export function CarDetails() {
  const navigation = useNavigation<StackScreensNavigationProp>();

  const route = useRoute<RouteProp<RootStackParamList>>();

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car: route.params?.car as CarDTO });
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={route.params?.car.photos as string[]} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{route.params?.car.brand}</Brand>
            <Name>{route.params?.car.name}</Name>
          </Description>

          <Rent>
            <Period>{route.params?.car.rent.period}</Period>
            <Price>{`R$ ${String(route.params?.car.rent.price)}`}</Price>
          </Rent>
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

        <About>{route.params?.car.about}</About>
      </Content>

      <Footer>
        <Button
          title="Escolher peŕiodo do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
