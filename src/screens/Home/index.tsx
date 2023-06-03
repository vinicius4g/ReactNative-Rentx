import React, { useEffect } from 'react';
/* import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize';

import { Car } from '../../components/Car';

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api'; */

import { Container } from './styles';

export function Home() {
  /* const navigation = useNavigation();

    const carData = {
        brand: 'Audi',
        name: 'RS5 Coupé',
        rent: {
            period: 'Ao dia',
            price: 120,
        },
        thumbnail: 'https://img1.gratispng.com/20171220/kiq/audi-png-car-image-5a3b1f1eb47de9.9104985015138240307393.jpg'
    }

    function handleCarDetails(){
        navigation.navigate('CarDetails')
    }


    async function fetchCars() {
        try {
            console.log('t2')
            const response = await api.get('/cars/');
            console.log(response)
        } catch (error) {
            console.log('error', error)
            console.log('error.data', error.data) 
             console.log('error.status', error.status) 
              console.log('error.response', error.response)
        }
    }

    useEffect(() => {
        fetchCars()
    }, []) */

  return (
    <Container>
      {/* <StatusBar 
                barStyle="light-content" 
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                <Logo 
                    width={RFValue(108)}
                    height={RFValue(12)}
                />
                <TotalCars>
                    Total de 12 carros
                </TotalCars>
                </HeaderContent>
            </Header>
            <CarlList 
                data={[1,2,3]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) =>  <Car data={carData} onPress={handleCarDetails} />}
            /> */}
    </Container>
  );
}
