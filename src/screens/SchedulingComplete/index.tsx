import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
/* import { useNavigation } from '@react-navigation/native'; */

import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';

export function SchedulingComplete() {
  /*  const navigation = useNavigation(); */
  const { width } = useWindowDimensions();

  function handleCarDetails() {
    /*  navigation.navigate('Home') */
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
        <Title>Carro alugado!</Title>

        <Message>
          Agora vocẽ só precisa ir{'\n'}
          até a concessionária da RENTX{'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleCarDetails} />
      </Footer>
    </Container>
  );
}
