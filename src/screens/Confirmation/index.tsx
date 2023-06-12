import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';
import {
  RootStackParamList,
  StackScreensNavigationProp,
} from '../../routes/stack.routes';

export function Confirmation() {
  const navigation = useNavigation<StackScreensNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Confirmation'>>();
  const { width } = useWindowDimensions();

  function handleCarDetails() {
    navigation.navigate(route.params.nextScreenRoute);
  }

  return (
    <Container>
      <LogoSvg width={width} />
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Content>
        <DoneSvg />
        <Title>{route.params.title}</Title>

        <Message>{route.params.message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleCarDetails} />
      </Footer>
    </Container>
  );
}
