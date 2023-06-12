import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  color: string;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.6,
})<ButtonProps>`
  width: 100%;

  padding: 19px;
  margin-bottom: 8px;

  justify-content: center;
  align-items: center;

  background-color: ${({ color }) => color};
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;

  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`;
