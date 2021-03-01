/* eslint-disable react-native/no-inline-styles */
import {
  Card,
  CardItem,
  Container,
  Content,
  Body,
  Text,
  View,
} from 'native-base';
import React from 'react';
import {Image} from 'react-native';

const CapitalWeather = (props) => {
  const data = props.route.params.result;
  const i = 0;
  const icon = data.current.weather_icons[i];
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Name:</Text>
                <Text>{data.location.name}</Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Wind_Speed:</Text>
                <Text>{data.current.wind_speed}</Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Teperature:</Text>
                <Text>{data.current.temperature}</Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Precip:</Text>
                <Text>{data.current.precip}</Text>
              </View>
              <View style={{marginLeft: 280, marginTop: -40}}>
                <Image source={{uri: icon}} style={{width: 70, height: 40}} />
              </View>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};
export default CapitalWeather;
