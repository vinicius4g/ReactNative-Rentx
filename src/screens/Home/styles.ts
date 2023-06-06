import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { CarDTO } from '../../dtos/carDTO';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: flex-end;
  padding: 24px 16px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList<CarDTO>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showVerticalScrollIndicator: false,
})``;

export const MyCarsButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.main};
  position: absolute;
  right: 22px;
  bottom: 16px;
`;
