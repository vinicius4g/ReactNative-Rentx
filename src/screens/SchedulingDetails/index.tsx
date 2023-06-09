import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

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
 Acessories,
 RentalPeriod,
 CalendarIcon,
 DateInfo,
 DateTitle,
 DateValue,
 RentalPrice,
 RentalPriceLabel,
 RentalPriceDetails,
 RentalPriceQuota,
 RentalPriceTotal,
 Footer
} from './styles';


export function SchedulingDetails(){
    const navigation = useNavigation();

    const theme = useTheme();

    function handleCarDetails(){
        navigation.navigate('SchedulingComplete')
    }


    return (
        <Container>
            <Header>
                <BackButton onPress={()=> {}} />
            </Header>

            <CarImages>
                <ImageSlider
                    imagesUrl={['https://img1.gratispng.com/20171220/kiq/audi-png-car-image-5a3b1f1eb47de9.9104985015138240307393.jpg']}
                />
            </CarImages>

            <Content>
                <Details>
                   <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description> 

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <Acessories>
                    <Accessory name="380KM/h" icon={speedSvg}  />
                    <Accessory name="3.2s" icon={accelerationSvg}  />
                    <Accessory name="800 HP" icon={forceSvg}  />
                    <Accessory name="Gasolina" icon={gasolineSvg}  />
                    <Accessory name="Auto" icon={exchangeSvg}  />
                    <Accessory name="2 pessoas" icon={peopleSvg}  />
                </Acessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather 
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateValue>DE</DateValue>
                        <DateTitle>18/06/2021</DateTitle>
                    </DateInfo>

                    <Feather 
                         name="chevron-right"
                         size={RFValue(10)}
                         color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateValue>ATÉ</DateValue>
                        <DateTitle>18/06/2021</DateTitle>
                    </DateInfo>

                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>

            </Content>

            <Footer>
                <Button 
                    title="Alugar agora" 
                    color={theme.colors.success}
                    onPress={handleCarDetails} 
                /> 
            </Footer>

        </Container>
    );
}