import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

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

export function CarDetails() {
  const navigation = useNavigation<StackScreensNavigationProp>();

  const route = useRoute<RouteProp<RootStackParamList>>();

  function handleConfirmRental() {
    navigation.navigate('Scheduling');
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
              icon={speedSvg}
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
