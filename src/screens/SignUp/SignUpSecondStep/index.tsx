import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

import {
  StackScreensNavigationProp,
  RootStackParamList,
} from '../../../routes/app.stack.routes';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { InputPassword } from '../../../components/InputPassword';

import { api } from '../../../services/api';

export function SignUpSecondStep() {
  const navigation = useNavigation<StackScreensNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'SignUpSecondStep'>>();
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm)
      return Alert.alert('Informe a senha e a confirmação.');

    if (password !== passwordConfirm)
      return Alert.alert('As senhas não conferem.');

    await api
      .post('/users', {
        name: route.params.user.name,
        email: route.params.user.email,
        driver_license: route.params.user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta criada',
          message: `Agora é só fazer login\ne aproveitar`,
          nextScreenRoute: 'SignIn',
        });
      })
      .catch(error => {
        console.log(error);
        console.log({ error: error.response.data });
        Alert.alert('Opa', 'Não foi possível cadastrar');
      });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>
            Faça seu cadastro{'\n'}
            de forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <InputPassword
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            onPress={handleRegister}
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
