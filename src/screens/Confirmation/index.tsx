import React from 'react';
import { Platform, StatusBar, useWindowDimensions } from 'react-native';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';
import {
  RootStackParamList,
  StackScreensNavigationProp,
} from '../../routes/app.stack.routes';
import { useTheme } from 'styled-components';

export function Confirmation() {
  const navigation = useNavigation<StackScreensNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Confirmation'>>();
  const { width } = useWindowDimensions();
  const theme = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      navigation?.getParent()?.setOptions({
        tabBarStyle: { display: 'none' },
      });

      return () => {
        navigation?.getParent()?.setOptions({
          tabBarStyle: {
            display: 'flex',
            height: 78,
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
            backgroundColor: theme.colors.background_primary,
          },
        });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]),
  );

  function handleCarDetails() {
    navigation.navigate(route?.params?.nextScreenRoute as 'Home');
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
        <Title>{route?.params?.title}</Title>

        <Message>{route?.params?.message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleCarDetails} />
      </Footer>
    </Container>
  );
}
