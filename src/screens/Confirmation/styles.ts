import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};

  margin-top: 40px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  text-align: center;
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  margin: 80px 0;
`;
