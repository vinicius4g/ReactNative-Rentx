import React, { useState, useEffect } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';

import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  OptionsContainer,
  Option,
  OptionTitle,
  Section,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { Button } from '../../components/Button';

import { StackScreensNavigationProp } from '../../routes/app.stack.routes';

import { useAuth } from '../../hooks/auth';

import { LoadAnimation } from '../../components/LoadAnimation';

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation<StackScreensNavigationProp>();
  const netInfo = useNetInfo();

  const { user, signOut, updateUser, loadUserData, loadingUser } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user?.avatar);
  const [name, setName] = useState(user?.name);
  const [driverLicense, setDriverLicense] = useState(user?.driver_license);

  useEffect(() => {
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBack() {
    navigation.goBack();
  }

  async function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair irá precisar de internet para conectar novamente',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: async () => await signOut(),
        },
      ],
    );
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    if (netInfo.isConnected === false && optionSelected === 'passwordEdit')
      return Alert.alert(
        'Você está offline',
        'Para mudar a senha conecte-se a internet!',
      );

    setOption(optionSelected);
  }

  async function handleAvatarSelect() {
    if (loadingUser) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.canceled) return null;

    setAvatar(result?.assets[0]?.uri || '');
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = { name, driverLicense };

      await schema.validate(data);

      await updateUser({
        id: String(user.id),
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert('Perfil atualizado!');
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        return Alert.alert('Opa', error.message);

      Alert.alert('Não foi possível atualizar o perfil');
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton activeOpacity={0.7} onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && !loadingUser && <Photo source={{ uri: avatar }} />}
              <PhotoButton activeOpacity={0.6} onPress={handleAvatarSelect}>
                <Feather name="camera" color={theme.colors.shape} size={24} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          {loadingUser ? (
            <LoadAnimation />
          ) : (
            // eslint-disable-next-line react-hooks/rules-of-hooks
            <Content style={{ marginBottom: useBottomTabBarHeight() }}>
              <OptionsContainer>
                <Option
                  activeOpacity={0.6}
                  active={option === 'dataEdit'}
                  onPress={() => handleOptionChange('dataEdit')}
                >
                  <OptionTitle active={option === 'dataEdit'}>
                    Dados
                  </OptionTitle>
                </Option>

                <Option
                  activeOpacity={0.6}
                  active={option === 'passwordEdit'}
                  onPress={() => handleOptionChange('passwordEdit')}
                >
                  <OptionTitle active={option === 'passwordEdit'}>
                    Trocar senha
                  </OptionTitle>
                </Option>
              </OptionsContainer>
              {option === 'dataEdit' ? (
                <Section>
                  <Input
                    iconName="user"
                    placeholder="Nome"
                    autoCorrect={false}
                    defaultValue={user.name}
                    onChangeText={setName}
                  />
                  <Input
                    iconName="mail"
                    autoCorrect={false}
                    editable={false}
                    defaultValue={user.email}
                  />
                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="numeric"
                    defaultValue={user.driver_license}
                    onChangeText={setDriverLicense}
                  />
                </Section>
              ) : (
                <Section>
                  <InputPassword iconName="lock" placeholder="Senha atual" />
                  <InputPassword iconName="lock" placeholder="Nova senha" />
                  <InputPassword
                    iconName="lock"
                    placeholder="Repetir nova senha"
                  />
                </Section>
              )}

              <Button title="Salvar alterações" onPress={handleProfileUpdate} />
            </Content>
          )}
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
